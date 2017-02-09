var mongoose = require('mongoose');
var SEASONMODEL = mongoose.model('SEASONMODEL');

exports.findAll = function(req, res) {

  SEASONMODEL.find(function(err, result) {

    if (err) res.send(500, err.message);

    res.status(200).jsonp(result);
  });
};

exports.add = function(req, res) {

  var obj = new SEASONMODEL({
    name: req.body.name
  });

  obj.save(function(err, result) {
    if (err) return res.send(500, err.message);
    res.status(200).jsonp(result);
  });
};
