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
    user: req.user,
    game: req.body.game

  });

  obj.save(function(err, result) {
    if (err) return res.send(500, err.message);
    res.status(200).jsonp(result);
  });

};

exports.update = function(req, res) {

  VOTEMODEL.findById(req.params.id, function (err, vote) {

    vote.valueVote = req.body.valueVote;

    vote.save(function (err, result) {
      if (err) return res.send(500, err.message);
      res.status(200).jsonp(result);
    });

  });

};

exports.getVotesByOwnUser = function(req,res) {

  VOTEMODEL.find({user: req.user}, function (err, result) {

    if (err) res.send(500, err.message);

    res.status(200).jsonp(result);
  });
};

exports.getVotesByUser = function(req,res) {

  VOTEMODEL.find({user: req.params.user}, function (err, result) {

    if (err) res.send(500, err.message);

    res.status(200).jsonp(result);
  });
};

exports.getVotesByGame = function(game) {

  VOTEMODEL.find({game: game}, function (err, result) {

    if (err) res.send(500, err.message);

   return  result;
  });
};

//OPTIONS Allow CORS to DELETE
exports.options = function(req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

  next();
};

exports.delete = function(req, res){

  VOTEMODEL.findById(req.params.id, function(err, vote) {

      vote.remove(function(err) {

        if(err) return res.status(500).send(err.message);

        res.status(200).jsonp('OK');
      })
    });

};


