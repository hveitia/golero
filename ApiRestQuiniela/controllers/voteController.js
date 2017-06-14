var mongoose = require('mongoose');
var VOTEMODEL = mongoose.model('VOTEMODEL');
var GAMEMODEL = mongoose.model('GAMEMODEL');
var WORKINGDAYMODEL = mongoose.model('WORKINGDAYMODEL');
var USERMODEL = mongoose.model('USERMODEL');
var TEAMMODEL = mongoose.model('TEAMMODEL');

var utils = require('../utils/utils.js');

exports.findAll = function (req, res) {

    VOTEMODEL.find(function (err, result) {
        USERMODEL.populate(result, {path: "user"}, function (err, user) {
            if (err) res.send(500, err.message);
            res.status(200).jsonp(result);
        });
    });
};

exports.add = function (req, res) {

    GAMEMODEL.findById(req.body.game, function (err, result) {
        WORKINGDAYMODEL.populate(result, {
            path: "workingDay"
        }, function (err, workingDay) {
            if (err) res.send(500, err.message);

            var obj = new VOTEMODEL({
                valueVote: req.body.valueVote,
                user: req.user,
                game: req.body.game,
                date: (workingDay.especialDate) ? workingDay.especialDate : workingDay.workingDay.date

            });
            obj.save(function (err, result) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(result);
            });
        });
    });
};

exports.update = function (req, res) {

    VOTEMODEL.findById(req.params.id, function (err, vote) {

        vote.valueVote = req.body.valueVote;

        vote.save(function (err, result) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(result);
        });

    });

};

exports.getVotesActiveByOwnUser = function (req, res) {

    VOTEMODEL.find({user: req.user}, function (err, result) {
        if (err) res.send(500, err.message);

        var cant = 0;

        for (var i = 0; i < result.length; i++) {
            if (utils.isActiveVote(result[i].date))
                cant++;
        }

        res.status(200).jsonp(cant);
    });
};

exports.getVotesTodayByOwnUser = function (req, res) {

   /* VOTEMODEL.find({user: req.user}, function (err, result) {
        if (err) res.send(500, err.message);
        GAMEMODEL.populate(result, {path: "game"}, function (err, user) {

            if (err)res.send(500, err.message);

            var resul = [];

            for (var i = 0; i < result.length; i++) {
                if (utils.isVoteToday(result[i].date))
                    resul.push(result[i]);
            }

            res.status(200).jsonp(resul);

        });
    });*/

    VOTEMODEL.find({user: req.user})
        .populate({
            path: 'game',
            populate: { path: 'localTeam' }
        })
        .exec(function(err, result){

            if (err)res.send(500, err.message);

            var resul = [];

            for (var i = 0; i < result.length; i++) {
                if (utils.isVoteToday(result[i].date))
                    resul.push(result[i]);
            }

            res.status(200).jsonp(resul);
        });

};

exports.getVotesByOwnUser = function (req, res) {

    VOTEMODEL.find({user: req.user}, function (err, result) {

        if (err) res.send(500, err.message);

        res.status(200).jsonp(result);
    });
};

exports.getVotesByUser = function (req, res) {

    VOTEMODEL.find({user: req.params.user}, function (err, result) {

        if (err) res.send(500, err.message);

        res.status(200).jsonp(result);
    });
};

exports.getVotesByGame = function (game) {

    VOTEMODEL.find({game: game}, function (err, result) {

        if (err) res.send(500, err.message);

        return result;
    });
};

//OPTIONS Allow CORS to DELETE
exports.options = function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    next();
};

exports.delete = function (req, res) {

    VOTEMODEL.findById(req.params.id, function (err, vote) {

        vote.remove(function (err) {

            if (err) return res.status(500).send(err.message);

            res.status(200).jsonp('OK');
        })
    });

};


