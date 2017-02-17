var mongoose = require('mongoose');
var USERMODEL = mongoose.model('USERMODEL');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var fs = require('fs');
var path    = require("path");
var utils = require('../utils/utils.js');



exports.findAll = function(req, res) {

  //var token = req.headers.authorization.split(" ")[1];
  //res.json({ message: "Estás autenticado correctamente y tu _id es: " + req.user });

  USERMODEL.find(function(err, result) {

    if (err) {
      res.send(500, err.message);
    }

    res.status(200).jsonp(result);
  });
};

exports.add = function(req, res) {

  USERMODEL.findOne({
    user: req.body.user
  }, function(err, user) {
    if (err) {
      res.send(500, err.message);
    }

    if (!user) {

      USERMODEL.findOne({
        email: req.body.email
      }, function(err, userEmail) {
        if (err) {
          res.send(500, err.message);
        }
        if (!userEmail) {

          var md5sum = crypto.createHash('md5');
          md5sum.update(req.body.user);
          var registerHash= md5sum.digest('hex');

          var obj = new USERMODEL({
            user: req.body.user,
            pass: req.body.pass,
            email: req.body.email,
            points: 0,
            state: 'CREATED',
            registerHash:registerHash
          });
          obj.save(function(err, result) {
            if (err) return res.send(500, err.message);

            sendRegistrationConfirmation(result._doc);

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

exports.confirmRegistration = function(req, res) {

  USERMODEL.findOne({registerHash: req.params.hash}, function (err, user) {

    if (err) {
      res.send(500, err.message);
    }
    if (user && user.state == 'CREATED' ) {

        user.state = 'ACTIVE';
        user.registerHash = '';

        user.save(function (err, result) {
          if (err) return res.send(500, err.message);

          res.sendFile(path.join(__dirname+'/staticPAges/activationUserSuccefull.html'));//res.status(200).jsonp("Usuario Activado..");
        });

    }
    else {
      res.sendFile(path.join(__dirname+'/staticPAges/notFound.html'));//res.status(200).jsonp("No encontrado");
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

      file = file.replace('[[USER]]', obj.user).replace('[[URL]]', 'http://localhost:3000/api/userActivation/' + obj.registerHash);

      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'deportesquiniela@gmail.com', // Your email id
          pass: 'vicoc123*' // Your password
        }
      });

      var mailOptions = {
        from: 'deportesquiniela@gmail.com', // sender address
        to: obj.email, // list of receivers
        subject: 'Email From REST API..', // Subject line
        html: file//'localhost:3000/api/userActivation/' + obj.registerHash
      };

      if(utils.modoSend()) {
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
