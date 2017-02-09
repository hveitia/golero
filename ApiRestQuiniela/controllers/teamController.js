var mongoose = require('mongoose');
var TEAMMODEL = mongoose.model('TEAMMODEL');

exports.findAll = function(req, res) {

  TEAMMODEL.find(function(err, result) {

    if (err) res.send(500, err.message);

    res.status(200).jsonp(result);
  });
};

exports.add = function(req, res) {

  var obj = new TEAMMODEL({
    name: req.body.name,
    logo: req.body.logo
  });

  obj.save(function(err, result) {
    if (err) return res.send(500, err.message);
    res.status(200).jsonp(result);
  });
};
