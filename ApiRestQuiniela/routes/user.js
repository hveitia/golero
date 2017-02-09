var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var userModel = require('../models/userModel')(app, mongoose);

var userController = require('../controllers/userController');
var authController = require('../controllers/authenticationController')

router.route('/user')
  .get(userController.findAll)
  .post(userController.add);

router.route('/authenticate')
  .post(authController.authenticate);


module.exports = router;
