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

    try {
        GAMEMODEL.find()
            .populate('localTeam')
            .populate('visitorTeam')
            .populate('workingDay')
            .populate('league')
            .exec(function (err, result) {

                if (err) res.send(500, err.message);
                var output = result.filter(function (x) {
                    return x != null && x.workingDay.active == true
                });
                res.status(200).jsonp(output);

            });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'gameController', 'findAll');
    }
};

exports.findById = function (req, res) {

    try {
        GAMEMODEL.findById(req.params.id)
            .populate('localTeam')
            .populate('visitorTeam')
            .populate('workingDay')
            .populate('league')
            .exec(function (err, result) {

                if (err) res.send(500, err.message);
                var output = result.filter(function (x) {
                    return x != null && x.workingDay.active == true
                });
                res.status(200).jsonp(output);

            });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'gameController', 'findById');
    }
};

exports.findByLeague = function (req, res) {

    try {
        GAMEMODEL.find({league: req.params.league})
            .populate('localTeam')
            .populate('visitorTeam')
            .populate('workingDay')
            .populate('league')
            .exec(function (err, result) {

                if (err) res.send(500, err.message);
                var output = result.filter(function (x) {
                    return x != null && x.workingDay.active == true
                });
                res.status(200).jsonp(output);

            });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'gameController', 'findById');
    }
};

exports.findByTeam = function (req, res) {

    try {
        GAMEMODEL.find({$and: [{'state': 'UPDATED'}], $or: [{'localTeam': req.params.idTeam}, {'visitorTeam': req.params.idTeam}]})
            .populate('localTeam')
            .populate('visitorTeam')
            .populate('workingDay')
            .populate('league')
            .sort({'workingDay': -1})
            .limit(5)
            .exec(function (err, result) {

                if (err) {
                    res.send(500, err.message);
                }

                res.status(200).jsonp(result);
            });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'gameController', 'findByTeam');
    }

};

exports.findByIdMany = function (req, res) {

    try {
        GAMEMODEL.find({_id: {"$in": req.body.idList}})
            .populate('localTeam')
            .populate('visitorTeam')
            .populate('workingDay')
            .populate('league')
            .exec(function (err, result) {
                if (err) res.send(500, err.message);
                var response = result.filter(function (x) {
                    return x != null && x.workingDay.active == true
                });
                res.status(200).jsonp(response);
            });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'gameController', 'findByIdMany');
    }
};

exports.findByWorkingDay = function (req, res) {

    try {

        /*GAMEMODEL.find({
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

         });*/

        GAMEMODEL.find({workingDay: req.params.workingDay})
            .populate('localTeam')
            .populate('visitorTeam')
            .populate('workingDay')
            .populate('league')
            .exec(function (err, result) {
                if (err) res.send(500, err.message);
                res.status(200).jsonp(result);
            });

    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'gameController', 'findByWorkingDay');
    }
};

exports.findByState = function (req, res) {

    try {
        /*GAMEMODEL.find({
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
         });*/

        GAMEMODEL.find({state: req.params.state})
            .populate('localTeam')
            .populate('visitorTeam')
            .populate('workingDay')
            .populate('league')
            .exec(function (err, result) {
                if (err) res.send(500, err.message);
                res.status(200).jsonp(result);
            });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'gameController', 'findByState');
    }
};

exports.add = function (req, res) {

    try {
        var obj = new GAMEMODEL({
            workingDay: req.body.workingDay,
            localTeam: req.body.localTeam,
            visitorTeam: req.body.visitorTeam,
            goalsLocalTeam: 0,
            goalsVisitorTeam: 0,
            state: 'SCHEDULED',
            league: req.body.league

        });

        obj.save(function (err, result) {
            if (err) {
                logController.saveLog(req.user, 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'Game Saved FAILED ' + err.message, 'gameController', 'add');
                return res.send(500, err.message);
            }

            logController.saveLog(req.user, 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'Game Saved OK', 'gameController', 'add');
            res.status(200).jsonp(result);
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'gameController', 'add');
    }
};

exports.setUpdateState = function (req, res) {

    try {
        GAMEMODEL.findById(req.params.id, function (err, result) {

            result.state = 'UPDATED';

            result.save(function (err) {

                if (err)res.send(500, err.message);

                res.status(200).send('ok');

            });
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'gameController', 'setUpdateState');
    }

};

exports.simpleUpdate = function (req, res) {

    try {
        GAMEMODEL.findById(req.params.id, function (err, result) {

            result.goalsLocalTeam = req.body.goalsLocalTeam;
            result.goalsVisitorTeam = req.body.goalsVisitorTeam;
            result.state = 'UPDATED';

            result.save(function (err) {

                if (err)res.send(500, err.message);

                res.status(200).send('ok');
            });
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'gameController', 'simpleUpdate');
    }
};

exports.editGameLeague = function (req, res) {
    try {

        GAMEMODEL.findOne({_id: req.params.id}, function (err, game) {

            if (err) res.send(500, err.message);

            if (game) {

                game.league = req.body.league;

                game.save(function (err, result) {
                    if (err) return res.send(500, err.message);

                    res.status(200).send('ok');
                });

            } else {
                res.send(500, 'Game not found');
            }
        });

    } catch (e) {

    }
};

exports.update = function (req, res) {

    try {
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

                            if (element && element.user) {

                                element.user.points += value;

                                if (element.user.tickets == undefined)
                                    element.user.tickets = value == 3 ? 5 : 0;
                                else
                                    element.user.tickets += value == 3 ? 5 : 0;

                                if (element.user.points <= 0) {
                                    element.user.historicalPunctuation.unshift(0);
                                }
                                else {
                                    element.user.historicalPunctuation.unshift(element.user.points);
                                }

                                if (element.user.points < 0 || element.user.state != 'ACTIVE') element.user.points = 0;


                                //Leagues Logic
                                var keyLeague = element.game.league;
                                var val = (value < 0) ? 0 : value;
                                var obj = {league: keyLeague, points: val};

                                if (element.user.leaguePoints == undefined) {

                                    element.user.leaguePoints = [];
                                    element.user.leaguePoints.push(obj);

                                } else {

                                    var updated = false;
                                    for (var i = 0; i < element.user.leaguePoints.length; i++) {

                                        if (element.user.leaguePoints[i].league.id == keyLeague.id) {

                                            updated = true;
                                            var old = element.user.leaguePoints[i].points;
                                            old += value;

                                            element.user.leaguePoints.set(i, {league: keyLeague, points: old});

                                            if (element.user.leaguePoints[i].points < 0) {
                                                element.user.leaguePoints[i].points = 0;
                                            }

                                            element.user.markModified('leaguePoints');
                                            break;
                                        }
                                    }

                                    if (!updated) {
                                        element.user.leaguePoints.push(obj);
                                    }

                                }
                                //Leagues Logic

                                element.user.save(function (err, result) {

                                    if (err) {
                                        logController.saveLog(req.user, 'PUT', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'Saving new user points ' + err.message, 'gameController', 'update');
                                        return res.status(500).send(err.message);
                                    }

                                    next();

                                });
                            }
                            else {
                                next();
                            }

                        }).then(function () {
                            console.log('All requests have finished');
                        });
                        res.status(200).send('ok');
                    });
                });
            });
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'gameController', 'update');
    }
};

exports.addSpecialDate = function (req, res) {

    try {
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
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'gameController', 'addSpecialDate');
    }
};

exports.gameToVoteByDate = function (req, res) {

    try {
        GAMEMODEL.find()
            .populate('localTeam')
            .populate('visitorTeam')
            .populate('workingDay')
            .populate('league')
            .exec(function (err, result) {

                if (err) res.send(500, err.message);
                var output = result.filter(function (x) {
                    return x != null && utils.canVoteGame(x)
                });
                res.status(200).jsonp(output);

            });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'gameController', 'gameToVoteByDate');
    }
};

exports.addAllGamesToLeague = function (req, res) {

    try {
        GAMEMODEL.update({}, {league: req.body.league}, {multi: true}, function (err) {

            if (err)res.status(500).send(err.message);

            res.status(200).send('OK');
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'gameController', 'addAllGamesToLeague');
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
        GAMEMODEL.findById(req.params.id, function (err, game) {

            game.remove(function (err) {

                if (err) return res.status(500).send(err.message);

                res.status(200).jsonp('OK');
            })
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'gameController', 'delete');
    }

};
