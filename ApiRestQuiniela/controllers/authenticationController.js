var mongoose = require('mongoose');
var service = require('../service');
var USERMODEL = mongoose.model('USERMODEL');

exports.authenticate = function (req, res) {

    var text = 'User: ' + req.body.user + ' Pass: ' + req.body.pass;

    USERMODEL.findOne({
        user: req.body.user
    }, function (err, user) {

        if (err) res.send(500, err.message);

        if (!user) {

            logController.saveLog(req.body.user, 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), text + ' no user', 'authenticationController', 'authenticate');
            res.json({
                success: false,
                message: '0003'
            });
        } else {
            if (user.state != 'ACTIVE') {
                +
                    logController.saveLog(req.body.user, 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), text + ' 0004', 'authenticationController', 'authenticate');
                res.json({
                    success: false,
                    message: '0004'
                });
            }
            else {

                if (user) {
                    if (user.pass != req.body.pass) {

                        logController.saveLog(req.body.user, 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), text + ' 0003', 'authenticationController', 'authenticate');
                        res.json({
                            success: false,
                            message: '0003'
                        });
                    } else {

                        // return the information including token as JSON
                        res.json({
                            success: true,
                            message: 'Login Success!',
                            token: service.createToken(user)
                        });
                    }
                }
            }
        }
    });
};
