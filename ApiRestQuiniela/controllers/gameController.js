var mongoose = require('mongoose');
var forEachAsync = require('forEachAsync').forEachAsync;
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

        USERMODEL.populate(voteList, {path: "user"}, function (err, user) {

          if (err) res.send(500, err.message);

        });
        GAMEMODEL.populate(voteList, {path: "game"}, function (err, list) {

          if (err) res.send(500, err.message);

          /*for(var i=0;i<voteList.length;i++) {

           var value = -1;
           switch (voteList[i].valueVote) {
           case "1":
           {
           value = (voteList[i].game.goalsLocalTeam > voteList[i].game.goalsVisitorTeam) ? 3 : -1;
           }
           break;
           case "2":
           {
           value=(voteList[i].game.goalsLocalTeam < voteList[i].game.goalsVisitorTeam) ? 3 : -1;
           }
           break;
           default:
           {
           value =(voteList[i].game.goalsLocalTeam == voteList[i].game.goalsVisitorTeam) ? 3 : -1;
           }
           }

           voteList[i].user.points += 0;//value;
           if(voteList[i].user.points < 0) voteList[i].user.points = 0;
           voteList[i].user.save(function (err, result) {
           if (err) return res.send(500, err.message);
           });
           }*/

          forEachAsync(voteList, function (next, element, index, array) {

            var value = -1;
            switch (element.valueVote) {
              case "1":
              {
                value = (element.game.goalsLocalTeam > element.game.goalsVisitorTeam) ? 3 : -1;
              }
                break;
              case "2":
              {
                value = (element.game.goalsLocalTeam < element.game.goalsVisitorTeam) ? 3 : -1;
              }
                break;
              default:
              {
                value = (element.game.goalsLocalTeam == element.game.goalsVisitorTeam) ? 3 : -1;
              }
            }

            element.user.points += value;
            if (element.user.points < 0) element.user.points = 0;

            element.user.save(function (err, result) {
              if (err) return res.send(500, err.message);
            });

          }).then(function () {
            console.log('All requests have finished');
          });
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
