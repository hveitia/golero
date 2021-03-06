var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');


var gameModel = require('../models/gameModel')(app, mongoose);
var voteModel = require('../models/voteModel')(app, mongoose);

var gameController = require('../controllers/gameController');


router.route('/game')
    .get(middleware.ensureAuthenticated, gameController.findAll)
    .post(middleware.ensureAuthenticated, gameController.add);

router.route('/findByIdMany')
    .post(middleware.ensureAuthenticated, gameController.findByIdMany);

router.route('/addAllGamesToLeague')
    .post(middleware.ensureAuthenticated, gameController.addAllGamesToLeague);

router.route('/gameLeague/:league')
    .get(middleware.ensureAuthenticated, gameController.findByLeague);

router.route('/gameById/:id')
    .get(middleware.ensureAuthenticated, gameController.findById);

router.route('/game/:workingDay')
    .get(middleware.ensureAuthenticated, gameController.findByWorkingDay);

router.route('/gameState/:state')
    .get(middleware.ensureAuthenticated, gameController.findByState);

router.route('/gameUpdate/:id')
    .put(middleware.ensureAuthenticated, gameController.update)
    .options(middleware.ensureAuthenticated, gameController.options)
    .delete(middleware.ensureAuthenticated, gameController.delete);

router.route('/setUpdateState/:id')
    .options(middleware.ensureAuthenticated, gameController.options)
    .put(middleware.ensureAuthenticated, gameController.setUpdateState);

router.route('/editGameLeague/:id')
    .put(middleware.ensureAuthenticated, gameController.editGameLeague);

router.route('/simpleUpdate/:id')
    .put(middleware.ensureAuthenticated, gameController.simpleUpdate);

router.route('/deleteGame/:id')
    .options(middleware.ensureAuthenticated, gameController.options)
    .delete(middleware.ensureAuthenticated, gameController.delete);

router.route('/gameUpdateSpecialDate/:id')
    .put(middleware.ensureAuthenticated, gameController.addSpecialDate);

router.route('/gameToVoteByDate')
    .get(middleware.ensureAuthenticated, gameController.gameToVoteByDate);

router.route('/findByTeam/:idTeam')
    .get(middleware.ensureAuthenticated,gameController.findByTeam);

module.exports = router;
