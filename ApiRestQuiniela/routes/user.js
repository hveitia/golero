var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var userModel = require('../models/userModel')(app, mongoose);

var userController = require('../controllers/userController');
var authController = require('../controllers/authenticationController');

router.route('/user')
  .get(middleware.ensureAuthenticated, userController.findAll)
  .post(userController.add);

router.route('/editFavoriteTeam')
    .put(middleware.ensureAuthenticated, userController.editFavoriteTeam);

router.route('/editAvatar')
    .put(middleware.ensureAuthenticated, userController.editAvatar);

router.route('/userRanking')
    .get(middleware.ensureAuthenticated, userController.userRanking);

router.route('/userRankingPosition')
    .get(middleware.ensureAuthenticated, userController.userRankingPosition);

router.route('/getUser')
    .get(middleware.ensureAuthenticated, userController.getUser);

router.route('/authenticate')
  .post(authController.authenticate);

router.route('/userActivation/:hash')
    .get(userController.confirmRegistration);




module.exports = router;
