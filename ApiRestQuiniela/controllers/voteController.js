var mongoose = require('mongoose');
var VOTEMODEL = mongoose.model('VOTEMODEL');

exports.findAll = function(req, res) {

  VOTEMODEL.find(function(err, result) {

    if (err) res.send(500, err.message);

    res.status(200).jsonp(result);
  });
};

exports.add = function(req, res) {

  var obj = new VOTEMODEL({
    valueVote: req.body.valueVote,
    user: req.body.user,
    game: req.body.game

  });

  obj.save(function(err, result) {
    if (err) return res.send(500, err.message);
    res.status(200).jsonp(result);
  });
};
