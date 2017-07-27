var mongoose = require('mongoose');
var USERMODEL = mongoose.model('USERMODEL');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require("path");
var utils = require('../utils/utils.js');
var forEachAsync = require('forEachAsync').forEachAsync;


exports.findAll = function (req, res) {

    //var token = req.headers.authorization.split(" ")[1];
    //res.json({ message: "Estás autenticado correctamente y tu _id es: " + req.user });

    USERMODEL.find(function (err, result) {

        if (err) {
            res.send(500, err.message);
        }

        res.status(200).jsonp(result);
    });
};

exports.userRanking = function (req, res) {

    USERMODEL.find({state: 'ACTIVE'})
        .sort({'points': -1})
        .limit(200)
        .exec(function (err, result) {

            if (err) {
                res.send(500, err.message);
            }

            res.status(200).jsonp(result);
        });
};

exports.userRankingPosition = function (req, res) {

    USERMODEL.find({state: 'ACTIVE'}, null, {sort: {'points': -1}}, function (err, result) {

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
};

exports.verificateUser = function (req, res) {

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
};

exports.verificateEmail = function (req, res) {

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
};

exports.add = function (req, res) {

    USERMODEL.findOne({
        user: req.body.user
    }, function (err, user) {
        if (err) {
            res.send(500, err.message);
        }

        if (!user) {

            USERMODEL.findOne({
                email: req.body.email
            }, function (err, userEmail) {
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
                        historicalPunctuation: []
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

};

exports.register = function (req, res) {

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
        historicalPunctuation: []
    });
    obj.save(function (err, result) {
        if (err) return res.send(500, err.message);

        res.status(200).jsonp(result);
    });
};

exports.editName = function (req, res) {

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
                            res.send(500, 'User not found');
                        }
                    });
                }
            });
        }
    });
};

exports.editFavoriteTeam = function (req, res) {

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

};

exports.resetUserPointsAll = function (req, res) {

    USERMODEL.update({}, {points: 0}, {multi: true}, function (err) {

        if (err)res.status(500).send(err.message);

        res.status(200).send('OK');
    });
};

exports.insertHistoricPoints = function (req, res) {

    USERMODEL.update({}, {historicalPunctuation: [1,2,3,4,5,6,7,8,9]}, {multi: true}, function (err) {

        if (err)res.status(500).send(err.message);

        res.status(200).send('OK');
    });
};

exports.revertPunctuation = function (req, res) {

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

        res.status(200).jsonp(result);
    });
};

exports.editAvatar = function (req, res) {

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
};

exports.editEmail = function (req, res) {

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
};

exports.getUser = function (req, res) {

    USERMODEL.findOne({_id: req.user}, function (err, result) {

        if (err) {
            res.send(500, err.message);
        }

        res.status(200).jsonp(result);
    });
};

exports.getUserByName = function (req, res) {

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
};

exports.getAvatar = function (req, res) {

    if (req.params.avatar) {

        res.sendFile(path.join(__dirname + '/images/avatars/' + req.params.avatar));

    } else {

        res.sendFile(path.join(__dirname + '/images/avatars/user.png'));
    }

};

exports.getTeamLogo = function (req, res) {

    if (req.params.logo) {

        res.sendFile(path.join(__dirname + '/images/teamLogos/' + req.params.logo));

    } else {

        res.sendFile(path.join(__dirname + '/images/teamLogos/noteam.png'));
    }

};

exports.getTeamLogoEmpty = function (req, res) {

    res.sendFile(path.join(__dirname + '/images/teamLogos/noteam.png'));
};

exports.clearUsers = function(req, res){

        USERMODEL.remove({user: ''}, function (err) {

            if (err) return res.status(500).send(err.message);

            res.status(200).jsonp('OK');
        });
};

exports.confirmRegistration = function (req, res) {

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
};

exports.activateAccount = function (req, res) {

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
};

sendRegistrationConfirmation = function (obj) {

    var template = 'utils/confirmationUserTemplate.html';
    fs.readFile(template, 'utf8', function (err, file) {
        if (err) {
            console.log('ERROR!->' + err.message);
            res.json({yo: 'error'});
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


};

//OPTIONS Allow CORS to DELETE
exports.options = function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    next();
};

exports.delete = function (req, res) {

    USERMODEL.findById(req.params.id, function (err, user) {

        user.remove(function (err) {

            if (err) return res.status(500).send(err.message);

            res.status(200).jsonp('OK');
        })
    });

};
