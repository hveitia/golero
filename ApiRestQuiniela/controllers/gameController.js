var mongoose = require('mongoose');
var forEachAsync = require('forEachAsync').forEachAsync;
var GAMEMODEL = mongoose.model('GAMEMODEL');
var TEAMMODEL = mongoose.model('TEAMMODEL');
var WORKINGDAYMODEL = mongoose.model('WORKINGDAYMODEL');
var USERMODEL = mongoose.model('USERMODEL');
var VOTEMODEL = mongoose.model('VOTEMODEL');
var utils = require('../utils/utils.js');

var logController = require('./logController');


exports.findAll = function (req, res) {

    GAMEMODEL.find(function (err, result) {
        TEAMMODEL.populate(result, {
            path: "localTeam"
        }, function (err, localTeam) {
            if (err) res.send(500, err.message);
        });
        TEAMMODEL.populate(result, {
            path: "visitorTeam"
        }, function (err, visitorTeam) {
            if (err) res.send(500, err.message);
        });
        WORKINGDAYMODEL.populate(result, {
            path: "workingDay"
        }, function (err, workingDay) {
            if (err) res.send(500, err.message);
            res.status(200).jsonp(workingDay);
        });
    });
};

exports.findById = function (req, res) {

    GAMEMODEL.findById(req.params.id, function (err, result) {
        TEAMMODEL.populate(result, {
            path: "localTeam"
        }, function (err, localTeam) {
            if (err) res.send(500, err.message);
        });
        TEAMMODEL.populate(result, {
            path: "visitorTeam"
        }, function (err, visitorTeam) {
            if (err) res.send(500, err.message);
        });
        WORKINGDAYMODEL.populate(result, {
            path: "workingDay"
        }, function (err, workingDay) {
            if (err) res.send(500, err.message);
            res.status(200).jsonp(workingDay);
        });
    });
};

exports.findByIdMany = function (req, res) {

    var idList = req.body.idList;

    var response =[];

    forEachAsync(idList, function (next, element, index, array) {

        GAMEMODEL.findById(element, function (err, result) {
            TEAMMODEL.populate(result, {
                path: "localTeam"
            }, function (err, localTeam) {
                if (err) res.send(500, err.message);
            });
            TEAMMODEL.populate(result, {
                path: "visitorTeam"
            }, function (err, visitorTeam) {
                if (err) res.send(500, err.message);
            });
            WORKINGDAYMODEL.populate(result, {
                path: "workingDay"
            }, function (err, workingDay) {
                if (err) res.send(500, err.message);
                response.push(workingDay);
                next();
            });
        });

    }).then(function () {
        res.status(200).jsonp(response);
    });

};


exports.findByWorkingDay = function (req, res) {
    GAMEMODEL.find({
        workingDay: req.params.workingDay
    }, function (err, result) {
        TEAMMODEL.populate(result, {
            path: "localTeam"
        }, function (err, localTeam) {
            if (err) res.send(500, err.message);
        });
        TEAMMODEL.populate(result, {
            path: "visitorTeam"
        }, function (err, visitorTeam) {
            if (err) res.send(500, err.message);
        });
        WORKINGDAYMODEL.populate(result, {
            path: "workingDay"
        }, function (err, workingDay) {
            if (err) res.send(500, err.message);
            res.status(200).jsonp(workingDay);
        });
    });
};

exports.findByState = function (req, res) {
    GAMEMODEL.find({
        state: req.params.state
    }, function (err, result) {
        TEAMMODEL.populate(result, {
            path: "localTeam"
        }, function (err, localTeam) {
            if (err) res.send(500, err.message);
        });
        TEAMMODEL.populate(result, {
            path: "visitorTeam"
        }, function (err, visitorTeam) {
            if (err) res.send(500, err.message);
        });
        WORKINGDAYMODEL.populate(result, {
            path: "workingDay"
        }, function (err, workingDay) {
            if (err) res.send(500, err.message);
            res.status(200).jsonp(workingDay);
        });
    });
};

exports.add = function (req, res) {

    var obj = new GAMEMODEL({
        workingDay: req.body.workingDay,
        localTeam: req.body.localTeam,
        visitorTeam: req.body.visitorTeam,
        goalsLocalTeam: 0,
        goalsVisitorTeam: 0,
        state: 'SCHEDULED'

    });

    obj.save(function (err, result) {
        if (err) {
            logController.saveLog(req.user, 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'Game Saved FAILED ' + err.message, 'gameController', 'add');
            return res.send(500, err.message);
        }

        logController.saveLog(req.user, 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'Game Saved OK', 'gameController', 'add');
        res.status(200).jsonp(result);
    });
};

exports.setUpdateState = function (req, res) {

    GAMEMODEL.findById(req.params.id, function (err, result) {

        result.state = 'UPDATED';

        result.save(function (err) {

            if (err)res.send(500, err.message);

            res.status(200).send('ok');

        });
    });

};

exports.simpleUpdate = function (req, res) {

    GAMEMODEL.findById(req.params.id, function (err, result) {

        result.goalsLocalTeam = req.body.goalsLocalTeam;
        result.goalsVisitorTeam = req.body.goalsVisitorTeam;
        result.state = 'UPDATED';

        result.save(function (err) {

            if (err)res.send(500, err.message);

            res.status(200).send('ok');
        });
    });
};

exports.update = function (req, res) {

    GAMEMODEL.findById(req.params.id, function (err, result) {

        result.goalsLocalTeam = req.body.goalsLocalTeam;
        result.goalsVisitorTeam = req.body.goalsVisitorTeam;
        result.state = 'UPDATED';

        logController.saveLog(req.user, 'PUT', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'Init Update Game', 'gameController', 'update');
        result.save(function (err) {

            VOTEMODEL.find({game: req.params.id}, function (err, voteList) {

                USERMODEL.populate(voteList, {path: "user"}, function (err, user) {

                    if (err) {
                        logController.saveLog(req.user, 'PUT', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'Populating UserModel ' + err.messag, 'gameController', 'update');
                        res.send(500, err.message);
                    }

                });
                GAMEMODEL.populate(voteList, {path: "game"}, function (err, list) {

                    if (err) {
                        logController.saveLog(req.user, 'PUT', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'Populating GameModel ' + err.messag, 'gameController', 'update');
                        res.send(500, err.message);
                    }

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
                            if (err) {
                                logController.saveLog(req.user, 'PUT', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'Saving new user points ' + err.messag, 'gameController', 'update');
                                return res.send(500, err.message);
                            }

                            logController.saveLog(req.user, 'PUT', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'New Points Saved', 'gameController', 'update');
                            next();

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

exports.addSpecialDate = function (req, res) {

    GAMEMODEL.findById(req.params.id, function (err, result) {

        result.especialDate = req.body.especialDate;

        result.save(function (err, obj) {

            if (err) return res.send(500, err.message);

            VOTEMODEL.find({game: req.params.id}, function (err, voteList) {

                if (err) return res.send(500, err.message);

                forEachAsync(voteList, function (next, element, index, array) {

                    element.date = req.body.especialDate;
                    element.save(function (err, result) {
                        if (err)return res.send(500, err.message);
                        next();
                    });
                }).then(function () {
                    console.log('All requests have finished');
                });
                res.status(200).send('ok');
            });
        });
    });
};

exports.gameToVoteByDate = function (req, res) {

    var listGames = [];
    GAMEMODEL.find(function (err, result) {
        TEAMMODEL.populate(result, {
            path: "localTeam"
        }, function (err, localTeam) {
            if (err) res.send(500, err.message);
        });
        TEAMMODEL.populate(result, {
            path: "visitorTeam"
        }, function (err, visitorTeam) {
            if (err) res.send(500, err.message);
        });
        WORKINGDAYMODEL.populate(result, {
            path: "workingDay"
        }, function (err, workingDay) {
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

//OPTIONS Allow CORS to DELETE
exports.options = function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    next();
};

exports.delete = function (req, res) {

    GAMEMODEL.findById(req.params.id, function (err, game) {

        game.remove(function (err) {

            if (err) return res.status(500).send(err.message);

            res.status(200).jsonp('OK');
        })
    });

};
