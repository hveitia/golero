var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var workingDayModel = require('../models/workingDayModel')(app, mongoose);
var gameModel = require('../models/gameModel')(app, mongoose);
var voteModel = require('../models/voteModel')(app, mongoose);

var gameController = require('../controllers/gameController');


router.route('/game')
  .get(middleware.ensureAuthenticated,gameController.findAll)
  .post(middleware.ensureAuthenticatedAdmin,gameController.add);
//.post(gameController.add);

router.route('/game/:workingDay')
  .get(middleware.ensureAuthenticated,gameController.findByWorkingDay);

router.route('/gameState/:state')
  .get(middleware.ensureAuthenticated,gameController.findByState);

router.route('/gameUpdate/:id')
  .put(middleware.ensureAuthenticated,gameController.update);

router.route('/gameUpdateSpecialDate/:id')
    .put(middleware.ensureAuthenticated,gameController.addSpecialDate);

router.route('/gameToVoteByDate')
  .get(middleware.ensureAuthenticated,gameController.gameToVoteByDate);

module.exports = router;
