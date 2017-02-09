var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var workingDayModel = require('../models/workingDayModel')(app, mongoose);
var gameModel = require('../models/gameModel')(app, mongoose);

var gameController = require('../controllers/gameController');


router.route('/game')
  .get(gameController.findAll)
  .post(gameController.add);

router.route('/game/:workingDay')
  .get(gameController.findByWorkingDay);

router.route('/gameState/:state')
  .get(gameController.findByState);

router.route('/gameUpdate/:id')
  .put(gameController.update);


module.exports = router;
