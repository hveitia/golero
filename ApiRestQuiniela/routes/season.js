var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var seasonModel = require('../models/seasonModel')(app, mongoose);
var workingDayModel = require('../models/workingDayModel')(app, mongoose);
var seasonController = require('../controllers/seasonController');

router.route('/season')
    .get(middleware.ensureAuthenticated, seasonController.findAll)
    .post(middleware.ensureAuthenticated, seasonController.add);

router.route('/seasonActives')
    .get(middleware.ensureAuthenticated, seasonController.findAllActives);

router.route('/editLeague/:id')
    .put(middleware.ensureAuthenticated, seasonController.updateLeague);

router.route('/seasonLeague/:league')
    .get(middleware.ensureAuthenticated, seasonController.findByLeague);

router.route('/activateUnactivateSeason/:id')
    .put(middleware.ensureAuthenticated, seasonController.activateUnactivateSeason);


module.exports = router;
