var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var workingDayModel = require('../models/workingDayModel')(app, mongoose);
var gameModel = require('../models/gameModel')(app, mongoose);
var voteModel = require('../models/voteModel')(app, mongoose);
var logModel = require('../models/logModel')(app, mongoose);

var gameController = require('../controllers/gameController');


router.route('/game')
    .get(middleware.ensureAuthenticated, gameController.findAll)
    .post(middleware.ensureAuthenticated, gameController.add);
//.post(gameController.add);

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

router.route('/deleteGame/:id')
    .options(middleware.ensureAuthenticated, gameController.options)
    .delete(middleware.ensureAuthenticated, gameController.delete);

router.route('/gameUpdateSpecialDate/:id')
    .put(middleware.ensureAuthenticated, gameController.addSpecialDate);

router.route('/gameToVoteByDate')
    .get(middleware.ensureAuthenticated, gameController.gameToVoteByDate);

module.exports = router;
