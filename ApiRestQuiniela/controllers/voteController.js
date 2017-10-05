var mongoose = require('mongoose');
var VOTEMODEL = mongoose.model('VOTEMODEL');
var GAMEMODEL = mongoose.model('GAMEMODEL');
var WORKINGDAYMODEL = mongoose.model('WORKINGDAYMODEL');
var USERMODEL = mongoose.model('USERMODEL');
var TEAMMODEL = mongoose.model('TEAMMODEL');

var utils = require('../utils/utils.js');

var logController = require('./logController');

exports.findAll = function (req, res) {
    try {
        VOTEMODEL.find(function (err, result) {
            USERMODEL.populate(result, {path: "user"}, function (err, user) {
                if (err) res.send(500, err.message);
                res.status(200).jsonp(result);
            });
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'voteController', 'findAll');
    }
};

exports.add = function (req, res) {

    try {
        VOTEMODEL.find({user: req.user, game: req.body.game}, function (err, result) {

            if (err) res.send(500, err.message);

            if (result.length == 0) {

                GAMEMODEL.findById(req.body.game, function (err, result) {
                    WORKINGDAYMODEL.populate(result, {
                        path: "workingDay"
                    }, function (err, workingDay) {
                        if (err) res.send(500, err.message);

                        var obj = new VOTEMODEL({
                            valueVote: req.body.valueVote,
                            user: req.user,
                            game: req.body.game,
                            date: (workingDay.especialDate) ? workingDay.especialDate : workingDay.workingDay.date,
                            insertedDate: new Date().toString('dd/MM/yyyy HH:mm:ss')

                        });

                        if (utils.isActiveVote(obj.date)) {

                            obj.save(function (err, result) {
                                if (err) {
                                    return res.send(500, err.message);
                                    logController.saveLog(req.user, 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'Log Save Failed', 'voteController', 'add');
                                }

                                logController.saveLog(req.user, 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'Vote Saved OK', 'voteController', 'add');
                                res.status(200).jsonp(result);
                            });

                        } else {

                            logController.saveLog(req.user, 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'Vote Inactive Try Save', 'voteController', 'add');
                            res.status(200).jsonp('Try Save Inactive Vote');
                        }
                    });
                });
            }
            else {
                logController.saveLog(req.user, 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'DUPLEX', 'voteController', 'add');
                res.status(200).jsonp('DUPLEX');
            }

        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'voteController', 'add');
    }


};

exports.update = function (req, res) {

    try {
        VOTEMODEL.findById(req.params.id, function (err, vote) {

            vote.valueVote = req.body.valueVote;

            vote.save(function (err, result) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(result);
            });

        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'voteController', 'update');
    }

};

exports.getVotesActiveByOwnUser = function (req, res) {

    try {
        VOTEMODEL.find({user: req.user}, function (err, result) {
            if (err) res.send(500, err.message);

            var cant = 0;

            for (var i = 0; i < result.length; i++) {
                if (utils.isActiveVote(result[i].date))
                    cant++;
            }

            res.status(200).jsonp(cant);
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'voteController', 'getVotesActiveByOwnUser');
    }
};

exports.getVotesTodayByOwnUser = function (req, res) {

    try {
        VOTEMODEL.find({user: req.user})
            .populate({
                path: 'game',
                populate: {path: 'localTeam'}
            })
            .exec(function (err, result) {

                if (err)res.send(500, err.message);

                var resul = [];

                for (var i = 0; i < result.length; i++) {
                    if (utils.isVoteToday(result[i].date))
                        resul.push(result[i]);
                }

                res.status(200).jsonp(resul);
            });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'voteController', 'getVotesTodayByOwnUser');
    }

};

exports.getVotesByOwnUser = function (req, res) {

    try {
        VOTEMODEL.find({user: req.user}, function (err, result) {

            if (err) res.send(500, err.message);

            res.status(200).jsonp(result);
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'voteController', 'getVotesbyOwnUser');
    }
};

exports.getVotesByUser = function (req, res) {

    try {
        VOTEMODEL.find({user: req.params.user}, function (err, result) {

            if (err) res.send(500, err.message);

            res.status(200).jsonp(result);
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'voteController', 'getVotesByUser');
    }
};

exports.getVotesByGame = function (game) {

    try {
        VOTEMODEL.find({game: game}, function (err, result) {

            if (err) res.send(500, err.message);

            return result;
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'voteController', 'getVotesByGame');
    }
};

exports.clearVotes = function (req, res) {

    try {

        VOTEMODEL.remove({_id: {"$in": req.body.idList}}, function (err) {

            if (err) return res.status(500).send(err.message);

            res.status(200).jsonp('OK');
        });

    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'voteController', 'delete');
    }

};

//OPTIONS Allow CORS to DELETE
exports.options = function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    next();
};

exports.delete = function (req, res) {

    try {
        VOTEMODEL.findById(req.params.id, function (err, vote) {

            vote.remove(function (err) {

                if (err) return res.status(500).send(err.message);

                res.status(200).jsonp('OK');
            })
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'voteController', 'delete');
    }

};


