var mongoose = require('mongoose');
var GAMEMODEL = mongoose.model('GAMEMODEL');
var TEAMMODEL = mongoose.model('TEAMMODEL');
var WORKINGDAYMODEL = mongoose.model('WORKINGDAYMODEL');

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

  GAMEMODEL.findById(req.params.id, function(err, result) {

    result.goalsLocalTeam = req.body.goalsLocalTeam;
    result.goalsVisitorTeam = req.body.goalsVisitorTeam;
    result.state = 'UPDATED';

    result.save(function(err) {

      if (err) return res.send(500, err.message);

      res.status(200).jsonp(result);
    });
  });
};
