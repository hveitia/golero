var mongoose = require('mongoose');
var WORKINGDAYMODEL = mongoose.model('WORKINGDAYMODEL');
var SEASONMODEL = mongoose.model('SEASONMODEL');

exports.findAll = function(req, res) {

  WORKINGDAYMODEL.find(function(err, result) {
    SEASONMODEL.populate(result, {
      path: "season"
    }, function(err, workingDays) {
      if (err) res.send(500, err.message);

      res.status(200).jsonp(workingDays);
    });
  });
};

exports.findBySeason = function(req, res) {

  WORKINGDAYMODEL.find({
    season: req.params.season
  }, function(err, result) {

    if (err) res.send(500, err.message);

    res.status(200).jsonp(result);
  });
};

exports.findByName = function(req, res) {

  WORKINGDAYMODEL.find({
    name: req.params.name
  }, function(err, result) {

    if (err) res.send(500, err.message);

    res.status(200).jsonp(result);
  });
};

exports.add = function(req, res) {

  console.log(req.body);
  var obj = new WORKINGDAYMODEL({
    date: req.body.date,
    season: req.body.season,
    name: req.body.name

  });

  obj.save(function(err, result) {
    if (err) return res.send(500, err.message);
    res.status(200).jsonp(result);
  });
};
