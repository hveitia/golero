var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var userModel = require('../models/userModel')(app, mongoose);
var logModel = require('../models/logModel')(app, mongoose);
var configsModel = require('../models/configsModel')(app, mongoose);

var userController = require('../controllers/userController');
var authController = require('../controllers/authenticationController');

router.route('/user')
  .get(middleware.ensureAuthenticated, userController.findAll)
  .post(userController.add);

router.route('/getUserByName/:name')
    .get(middleware.ensureAuthenticated, userController.getUserByName);

router.route('/user/:id')
    .options(middleware.ensureAuthenticated, userController.options)
    .delete(middleware.ensureAuthenticated, userController.delete);

router.route('/editFavoriteTeam')
    .put(middleware.ensureAuthenticated, userController.editFavoriteTeam);

router.route('/editAvatar')
    .put(middleware.ensureAuthenticated, userController.editAvatar);

router.route('/editEmail')
    .put(middleware.ensureAuthenticated, userController.editEmail);

router.route('/activateAccount')
    .put(middleware.ensureAuthenticated, userController.activateAccount);

router.route('/resetUserPointsAll')
    .get(middleware.ensureAuthenticated, userController.resetUserPointsAll);

router.route('/userRanking')
    .get(middleware.ensureAuthenticated, userController.userRanking);

router.route('/userRankingPosition')
    .get(middleware.ensureAuthenticated, userController.userRankingPosition);

router.route('/getUser')
    .get(middleware.ensureAuthenticated, userController.getUser);

router.route('/clearUsers')
    .get(middleware.ensureAuthenticated, userController.clearUsers);

router.route('/userRankingUpdate')
    .get(middleware.ensureAuthenticated, userController.userRankingUpdate);

router.route('/revertPunctuation')
    .get(middleware.ensureAuthenticated, userController.revertPunctuation);

router.route('/getTeamLogo/:logo')
    .get(userController.getTeamLogo);

router.route('/getTeamLogo')
    .get(userController.getTeamLogoEmpty);

router.route('/editName')
    .put(userController.editName);

router.route('/register')
    .post(userController.register);

router.route('/authenticate')
    .post(authController.authenticate);

router.route('/userActivation/:hash')
    .get(userController.confirmRegistration);

router.route('/verificateUser/:userName')
    .get(userController.verificateUser);

router.route('/getAvatar/:avatar')
    .get(userController.getAvatar);


module.exports = router;

//router.route('/insertHistoricPoints')
//    .get(userController.insertHistoricPoints);

