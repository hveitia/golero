var mongoose = require('mongoose');
var USERMODEL = mongoose.model('USERMODEL');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require("path");
var utils = require('../utils/utils.js');
var cron = require('cron');
var forEachAsync = require('forEachAsync').forEachAsync;

var logController = require('./logController');


exports.findAll = function (req, res) {

    //var token = req.headers.authorization.split(" ")[1];
    //res.json({ message: "Estás autenticado correctamente y tu _id es: " + req.user });

    try {
        USERMODEL.find(function (err, result) {

            if (err) {
                res.send(500, err.message);
            }

            res.status(200).jsonp(result);
        });
    }
    catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'findAll');
    }
};

exports.userRanking = function (req, res) {
    try {
        USERMODEL.find({$and: [{user: {$ne: 'admin'}}, {'state': 'ACTIVE'}]})
            .sort({'points': -1})
            .limit(200)
            .exec(function (err, result) {

                if (err) {
                    res.send(500, err.message);
                }

                res.status(200).jsonp(result);
            });

    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'userRanking');
    }
};

exports.userRankingLeague = function (req, res) {
    try {
        USERMODEL.find({$and: [{user: {$ne: 'admin'}}, {'state': 'ACTIVE'}]})
            .exec(function (err, result) {

                if (err) {
                    res.send(500, err.message);
                }

                result = orderRanking(result, req.params.league);

                res.status(200).jsonp(result);
            });

    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'userRanking');
    }
};

orderRanking = function (list, league) {

    for (var i = 0; i < list.length; i++) {

        for (var j = i + 1; j < list.length; j++) {

            var temp;

            var posI = findLeague(list[i].leaguePoints, league);
            var posJ = findLeague(list[j].leaguePoints, league);

            if (((posI > -1 && posJ > -1) && (list[i].leaguePoints[posI].points < list[j].leaguePoints[posJ].points))||(posI < 0 &&  posJ >= 0)) {

                temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }


        }
    }

    return list;

};

findLeague = function (leaguePoints, league) {

    for (var i = 0; i < leaguePoints.length; i++) {
        if (leaguePoints[i].league == league) {
            return i;
        }
    }

    return -1;
};

exports.userRankingUpdate = function (req, res) {
    try {
        USERMODEL.find({$and: [{user: {$ne: 'admin'}}, {'state': 'ACTIVE'}]})
            .sort({'points': -1})
            .limit(200)
            .exec(function (err, result) {

                if (err) {
                    res.send(500, err.message);
                }

                forEachAsync(result, function (next, element, index, array) {

                    element.lastPosition = index + 1;

                    element.save(function (err, result) {
                        if (err) {

                            return res.send(500, err.message);
                        }
                        next();
                    });

                }).then(function () {
                    console.log('All requests have finished');
                });

                res.status(200).jsonp('OK');
            });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'userRankingUpdate');
    }
};

exports.userRankingPosition = function (req, res) {

    try {
        USERMODEL.find({$and: [{user: {$ne: 'admin'}}, {'state': 'ACTIVE'}]})
            .sort({'points': -1})
            .limit(200)
            .exec(function (err, result) {
                if (err) {
                    res.send(500, err.message);
                }

                var flag = false;
                for (var i = 0; i < result.length; i++) {
                    if (result[i]._doc._id == req.user) {
                        flag = true;
                        res.status(200).jsonp({'pos': i + 1, 'points': result[i].points});

                    }
                }
                if (!flag)
                    res.status(200).jsonp({'pos': -1, 'points': 0});

            });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'userRankingPosition');
    }
};

exports.verificateUser = function (req, res) {

    try {
        USERMODEL.findOne({user: req.params.userName}, function (err, user) {
            if (err) {
                res.status(500).send(err.message);
            }
            if (user) {
                res.status(200).send(true);

            } else {
                res.status(200).send(false);
            }
        });
    }
    catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'verificateUser');
    }
};

exports.verificateEmail = function (req, res) {

    try {
        USERMODEL.findOne({email: req.body.email}, function (err, user) {
            if (err) {
                res.status(500).send(err.message);
            }
            if (user) {
                res.status(200).send(true);

            } else {
                res.status(200).send(false);
            }
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'verificateEmail');
    }
};

exports.add = function (req, res) {

    try {
        USERMODEL.findOne({user: req.body.user}, function (err, user) {

            if (err) {
                res.send(500, err.message);
            }

            if (!user) {

                USERMODEL.findOne({email: req.body.email}, function (err, userEmail) {

                    if (err) {
                        res.send(500, err.message);
                    }

                    if (!userEmail) {

                        var md5sum = crypto.createHash('md5');
                        md5sum.update(req.body.user);
                        var registerHash = md5sum.digest('hex');

                        var obj = new USERMODEL({
                            user: req.body.user,
                            pass: req.body.pass,
                            email: req.body.email,
                            points: 0,
                            state: 'CREATED',
                            registerHash: registerHash,
                            avatar: 'user.png',
                            favoriteTeam: 'noteam.png',
                            registerDate: new Date(),
                            role: req.body.role,
                            historicalPunctuation: [],
                            lastPosition: 201,
                            tickets: 0,
                            reputation: 0,
                            leaguePoints: []
                        });
                        obj.save(function (err, result) {
                            if (err) return res.send(500, err.message);

                            res.status(200).jsonp(result);
                        });
                    } else {
                        res.json({
                            success: false,
                            message: '0002'
                        });
                    }
                });
            } else {
                res.json({
                    success: false,
                    message: '0001'
                });

            }
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'add');
    }

};

exports.register = function (req, res) {

    try {

        USERMODEL.findOne({pass: req.body.pass}, function (err, user) {

            if (err) {
                res.send(500, err.message);
            }

            if (!user) {

                var obj = new USERMODEL({
                    user: '',
                    pass: req.body.pass,
                    email: '',
                    points: 0,
                    state: 'CREATED',
                    registerHash: req.body.pass,
                    avatar: 'user.png',
                    favoriteTeam: 'noteam.png',
                    registerDate: new Date(),
                    role: 'USER',
                    historicalPunctuation: [],
                    lastPosition: 201,
                    tickets: 0,
                    reputation: 0,
                    leaguePoints: []
                });
                obj.save(function (err, result) {
                    if (err) return res.send(500, err.message);

                    res.status(200).jsonp('OK');
                });
            }
            else {

                logController.saveLog('Register', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'DUPLEX', 'userController', 'register');

                res.status(200).jsonp(user);
            }

        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'register');
    }
};

exports.recoverAccount = function (req, res) {

    try {

        USERMODEL.findOne({registerHash: req.body.recoverCode}, function (err, user) {

            if (err) {
                res.send(500, err.message);
            }

            if(user && user.user != 'admin'){

                user.pass = req.body.pass;

                user.save(function (err, userNew) {

                    if (err) return res.send(500, err.message);

                    res.status(200).jsonp(userNew);
                });
            }
            else{
                res.status(200).jsonp('404');
            }
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), 'User Finded', 'userController', 'recoverAccount');
    }
};

exports.editName = function (req, res) {

    try {
        USERMODEL.findOne({user: req.body.user}, function (err, user) {

            if (err) {
                res.send(500, err.message);
            }
            if (user) {
                res.json({
                    success: false,
                    message: '0001'
                });
            } else {

                USERMODEL.findOne({email: req.body.email}, function (err, user) {

                    if (user) {
                        res.json({
                            success: false,
                            message: '0002'
                        });
                    } else {

                        USERMODEL.findOne({pass: req.body.uuid}, function (err, user) {
                            if (err) {
                                res.send(500, err.message);
                            }

                            if (user) {

                                user.user = req.body.user;
                                user.email = req.body.email;
                                user.registerHash = user.registerHash.substring(user.registerHash.length - 6);

                                user.save(function (err, result) {
                                    if (err) return res.send(500, err.message);

                                    sendRegistrationConfirmation(user);

                                    res.status(200).send('ok');
                                });

                            } else {
                                res.status(500).send('User not found');
                            }
                        });
                    }
                });
            }
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'editName');
    }
};

exports.editFavoriteTeam = function (req, res) {

    try {
        USERMODEL.findOne({
            _id: req.user
        }, function (err, user) {
            if (err) {
                res.send(500, err.message);
            }

            if (user) {

                user.favoriteTeam = req.body.team;

                user.save(function (err, result) {
                    if (err) return res.send(500, err.message);

                    res.status(200).send('ok');
                });

            } else {
                res.send(500, 'User not found');
            }
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'editFavoriteTeam');
    }

};

exports.editPoints = function (req, res) {

    try {
        USERMODEL.findOne({_id: req.params.id}, function (err, user) {

            if (err) res.send(500, err.message);

            if (user) {

                user.points = req.body.point;

                user.save(function (err, result) {
                    if (err) return res.send(500, err.message);

                    res.status(200).send('ok');
                });

            } else {
                res.send(500, 'User not found');
            }
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'editFavoriteTeam');
    }

};

exports.resetUserPointsAll = function (req, res) {

    try {
        USERMODEL.update({}, {points: 0, leaguePoints: [], tickets: 0, reputation: 0, historicalPunctuation: [], ticketsState: 'WAITING'}, {multi: true}, function (err) {

            if (err)res.status(500).send(err.message);

            res.status(200).send('OK');
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'restUserPointAll');
    }
};

exports.insertHistoricPoints = function (req, res) {

    try {
        USERMODEL.update({}, {historicalPunctuation: [1, 2, 3, 4, 5, 6, 7, 8, 9]}, {multi: true}, function (err) {

            if (err)res.status(500).send(err.message);

            res.status(200).send('OK');
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'insertHistoricPoints');
    }
};

exports.revertPunctuation = function (req, res) {

    try {
        USERMODEL.find({state: 'ACTIVE'}, function (err, result) {

            if (err) {
                res.send(500, err.message);
            }

            forEachAsync(result, function (next, element, index, array) {

                element.points = element.historicalPunctuation.pop();

                element.save(function (err, result) {
                    if (err) {

                        return res.send(500, err.message);
                    }
                    next();
                });

            }).then(function () {
                console.log('All requests have finished');
            });

            res.status(200).jsonp('OK');
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'revertPunctuation');
    }
};

exports.editAvatar = function (req, res) {

    try {
        USERMODEL.findOne({_id: req.user}, function (err, user) {
            if (err) {
                res.send(500, err.message);
            }

            if (user) {

                user.avatar = req.body.avatar;

                user.save(function (err, result) {
                    if (err) return res.send(500, err.message);

                    res.status(200).send('ok');
                });

            } else {
                res.send(500, 'User not found');
            }
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'editAvatar');
    }
};

exports.claimTickets = function (req, res) {

    try {
        USERMODEL.findOne({_id: req.user}, function (err, user) {
            if (err) {
                res.send(500, err.message);
            }

            if (user && user.ticketsState == 'FULL') {

                if (!user.tickets) {
                    user.tickets = 1;
                } else {
                    user.tickets += 1;
                }

                user.ticketsState = 'WAITING';

                user.save(function (err, result) {
                    if (err) return res.send(500, err.message);

                    res.status(200).send('ok');
                });

            } else {
                res.send(500, 'User not found');
            }
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'claimTickets');
    }
};

exports.editEmail = function (req, res) {

    try {
        USERMODEL.findOne({_id: req.user}, function (err, user) {
            if (err) {
                res.send(500, err.message);
            }
            USERMODEL.findOne({email: req.body.email}, function (err, newUser) {

                if (newUser) {
                    res.json({
                        success: false,
                        message: '0002'
                    });
                } else {

                    user.email = req.body.email;

                    user.save(function (err, result) {
                        if (err) return res.send(500, err.message);

                        sendRegistrationConfirmation(user);

                        res.status(200).send('ok');
                    });
                }
            });
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'editEmail');
    }
};

exports.getUser = function (req, res) {

    try {
        USERMODEL.findOne({_id: req.user}, function (err, result) {

            if (err) {
                res.send(500, err.message);
            }

            res.status(200).jsonp(result);
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'getUser');
    }
};

exports.getUserByName = function (req, res) {

    try {
        USERMODEL.findOne({user: req.params.name}, function (err, result) {

            if (err) {
                res.send(500, err.message);
            }

            if (result) {

                result._doc.email = '';
                result._doc.pass = '';
                result._doc.registerHash = '';

                res.status(200).jsonp(result);
            }
            else {
                res.status(200).jsonp('EMPTY');
            }

        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'getUserByName');
    }
};

exports.getAvatar = function (req, res) {

    try {
        if (req.params.avatar) {

            res.sendFile(path.join(__dirname + '/images/avatars/' + req.params.avatar));

        } else {

            res.sendFile(path.join(__dirname + '/images/avatars/user.png'));
        }
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'getAvatar');
    }

};

exports.getTeamLogo = function (req, res) {

    try {
        if (req.params.logo) {

            res.sendFile(path.join(__dirname + '/images/teamLogos/' + req.params.logo));

        } else {

            res.sendFile(path.join(__dirname + '/images/teamLogos/noteam.png'));
        }
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'getTeamLogo');
    }

};

exports.getTeamLogoEmpty = function (req, res) {


    res.sendFile(path.join(__dirname + '/images/teamLogos/noteam.png'));
};

exports.clearUsers = function (req, res) {

    try {
        USERMODEL.remove({user: ''}, function (err) {

            if (err) return res.status(500).send(err.message);

            res.status(200).jsonp('OK');
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'clearUsers');
    }
};

exports.confirmRegistration = function (req, res) {

    try {
        USERMODEL.findOne({registerHash: req.params.hash}, function (err, user) {

            if (err) {
                res.send(500, err.message);
            }
            if (user && user.state == 'CREATED') {

                user.state = 'ACTIVE';
                user.registerHash = '';

                user.save(function (err, result) {
                    if (err) return res.send(500, err.message);

                    res.sendFile(path.join(__dirname + '/staticPAges/activationUserSuccefull.html'));//res.status(200).jsonp("Usuario Activado..");
                });

            }
            else {
                res.sendFile(path.join(__dirname + '/staticPAges/notFound.html'));//res.status(200).jsonp("No encontrado");
            }


        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'confirmRegistration');
    }
};

exports.activateAccount = function (req, res) {

    try {
        USERMODEL.findOne({_id: req.user}, function (err, user) {
            if (err) {
                res.send(500, err.message);
            }

            if (user && user.registerHash == req.body.registerHash) {

                user.state = 'ACTIVE';

                user.save(function (err, result) {
                    if (err) return res.send(500, err.message);

                    res.status(200).send('ok');
                });

            } else {
                res.status(404).send('404');
            }
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'activateAccount');

    }
};

exports.resendConfirmationMail = function (req, res) {

    try {
        USERMODEL.findById(req.params.id, function (err, user) {

            if (err) return res.status(500).send(err.message);

            if (user) {

                user.resendMailDate = new Date();

                user.save(function (err, result) {
                    if (err) return res.send(500, err.message);

                    sendRegistrationConfirmation(user);

                    res.status(200).send('ok');
                });

            }
            else {
                res.status(404).jsonp('No encontrado');
            }
        });
    } catch (e) {
        logController.saveLog('Crash', 'GET', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'resendConfirmationMail');
    }
};

sendRegistrationConfirmation = function (obj) {

    try {
        var template = 'utils/confirmationUserTemplate.html';
        fs.readFile(template, 'utf8', function (err, file) {
            if (err) {
                console.log('ERROR!->' + err.message);
                //res.json({yo: 'error'});
            }
            else {

                //file = file.replace('[[USER]]', obj.user).replace('[[URL]]', utils.url() + 'userActivation/' + obj.registerHash);
                file = file.replace('[[URL]]', obj.registerHash.toString()).replace('[[USER]]', obj.user);

                var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'goleroapp@gmail.com', // Your email id
                        pass: 'vicoc123*' // Your password
                    }
                });

                var mailOptions = {
                    from: 'goleroapp@gmail.com', // sender address
                    to: obj.email, // list of receivers
                    subject: 'Golero.. Activación de Cuenta..', // Subject line
                    html: file//'localhost:3000/api/userActivation/' + obj.registerHash
                };

                if (utils.modoSend()) {
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            res.json({yo: 'error'});
                        } else {
                            console.log('Message sent: ' + info.response);
                            res.json({yo: info.response});
                        }

                    });
                }
            }
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'sendRegistrationConfirmation');
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
        USERMODEL.findById(req.params.id, function (err, user) {

            user.remove(function (err) {

                if (err) return res.status(500).send(err.message);

                res.status(200).jsonp('OK');
            })
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'delete');
    }

};

//Automatic Process
exports.updateTicketFree = new cron.CronJob({
    cronTime: '00 12 * * *',
    onTick: function () {

        console.log('job 1 ticked -> ' + new Date().toString('dd/MM/yyyy HH:mm:ss'));

        try {
            USERMODEL.find(function (err, result) {

                if (err) {
                    console.log('Error->' + err);
                    return;
                }

                forEachAsync(result, function (next, element, index, array) {

                    if (!element.ticketsState || element.ticketsState == 'WAITING') {

                        element.ticketsState = 'FULL';

                        element.save(function (err, result) {

                            if (err) {
                                console.log('Error->' + err);
                                return;
                            }
                            next();
                        });
                    }

                }).then(function () {
                    console.log('Tickets Updated');
                });
            });
        }
        catch (e) {
            logController.saveLog('Crash', 'PROGRAMED', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'userController', 'addDayliTicketsToUser');
        }
    },
    start: false
});
