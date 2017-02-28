var mongoose = require('mongoose');
var GAMEMODEL = mongoose.model('GAMEMODEL');
var TEAMMODEL = mongoose.model('TEAMMODEL');
var WORKINGDAYMODEL = mongoose.model('WORKINGDAYMODEL');
var USERMODEL = mongoose.model('USERMODEL');
var VOTEMODEL = mongoose.model('VOTEMODEL');
var utils = require('../utils/utils.js');



exports.findAll = function(req, res) {

  GAMEMODEL.find(function(err, result) {
    TEAMMODEL.populate(result, {
      path: "localTeam"
    }, function(err, localTeam) {
      if (err) res.send(500, err.message);
    });
    TEAMMODEL.populate(result, {
      path: "visitorTeam"
    }, function(err, visitorTeam) {
      if (err) res.send(500, err.message);
    });
    WORKINGDAYMODEL.populate(result, {
      path: "workingDay"
    }, function(err, workingDay) {
      if (err) res.send(500, err.message);
      res.status(200).jsonp(workingDay);
    });
  });
};

exports.findByWorkingDay = function(req, res) {
  GAMEMODEL.find({
    workingDay: req.params.workingDay
  }, function(err, result) {
    TEAMMODEL.populate(result, {
      path: "localTeam"
    }, function(err, localTeam) {
      if (err) res.send(500, err.message);
    });
    TEAMMODEL.populate(result, {
      path: "visitorTeam"
    }, function(err, visitorTeam) {
      if (err) res.send(500, err.message);
    });
    WORKINGDAYMODEL.populate(result, {
      path: "workingDay"
    }, function(err, workingDay) {
      if (err) res.send(500, err.message);
      res.status(200).jsonp(workingDay);
    });
  });
};

exports.findByState = function(req, res) {
  GAMEMODEL.find({
    state: req.params.state
  }, function(err, result) {
    TEAMMODEL.populate(result, {
      path: "localTeam"
    }, function(err, localTeam) {
      if (err) res.send(500, err.message);
    });
    TEAMMODEL.populate(result, {
      path: "visitorTeam"
    }, function(err, visitorTeam) {
      if (err) res.send(500, err.message);
    });
    WORKINGDAYMODEL.populate(result, {
      path: "workingDay"
    }, function(err, workingDay) {
      if (err) res.send(500, err.message);
      res.status(200).jsonp(workingDay);
    });
  });
};

exports.add = function(req, res) {

  var obj = new GAMEMODEL({
    workingDay: req.body.workingDay,
    localTeam: req.body.localTeam,
    visitorTeam: req.body.visitorTeam,
    goalsLocalTeam: 0,
    goalsVisitorTeam: 0,
    state: 'SCHEDULED'

  });

  obj.save(function(err, result) {
    if (err) return res.send(500, err.message);
    res.status(200).jsonp(result);
  });
};

exports.update = function(req, res) {

  GAMEMODEL.findById(req.params.id, function (err, result) {

    result.goalsLocalTeam = req.body.goalsLocalTeam;
    result.goalsVisitorTeam = req.body.goalsVisitorTeam;
    result.state = 'UPDATED';


    result.save(function (err) {

      VOTEMODEL.find({game: req.params.id}, function (err, voteList) {

        USERMODEL.populate(voteList, {path: "user"}, function (err, list) {

          if (err) res.send(500, err.message);

        });
        GAMEMODEL.populate(voteList,{path: "game"},function(err, list){

          if (err) res.send(500, err.message);

          for(var i=0;i<list.length;i++) {

            var value = -1;
            switch (list[i].valueVote) {
              case "1":
              {
                value = (list[i].game.goalsLocalTeam > list[i].game.goalsVisitorTeam) ? 3 : -1;
              }
                break;
              case "2":
              {
                value=(list[i].game.goalsLocalTeam < list[i].game.goalsVisitorTeam) ? 3 : -1;
              }
                break;
              default:
              {
                value =(list[i].game.goalsLocalTeam == list[i].game.goalsVisitorTeam) ? 3 : -1;
              }
            }

            list[i].user.points += value;
            if(list[i].user.points < 0) list[i].user.points = 0;
            list[i].user.save(function (err, result) {
              if (err) return res.send(500, err.message);
            });
          }
          res.status(200).send('ok');
        });
      });
    });
  });
};

exports.addSpecialDate = function(req, res) {

  GAMEMODEL.findById(req.params.id, function(err, result) {

    result.especialDate = req.body.especialDate;

    result.save(function(err) {

      if (err) return res.send(500, err.message);

      res.status(200).jsonp(result);
    });
  });
};

exports.gameToVoteByDate = function(req, res) {

  var listGames = [];
  GAMEMODEL.find(function(err, result) {
    TEAMMODEL.populate(result, {
      path: "localTeam"
    }, function(err, localTeam) {
      if (err) res.send(500, err.message);
    });
    TEAMMODEL.populate(result, {
      path: "visitorTeam"
    }, function(err, visitorTeam) {
      if (err) res.send(500, err.message);
    });
    WORKINGDAYMODEL.populate(result, {
      path: "workingDay"
    }, function(err, workingDay) {
      if (err) res.send(500, err.message);

      for (var i = 0; i < result.length; i++) {

        if (utils.canVoteGame(result[i])) {

          listGames.push(result[i]);
        }
      }

      res.status(200).jsonp(listGames);

    });
  });
};
