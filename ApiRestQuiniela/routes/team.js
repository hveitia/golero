var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var teamModel = require('../models/teamModel')(app, mongoose);

var teamController = require('../controllers/teamController');


router.route('/team')
  .get(middleware.ensureAuthenticated, teamController.findAll)
  .post(middleware.ensureAuthenticated, teamController.add);

router.route('/teamSA')
    .get(middleware.ensureAuthenticated, teamController.findAllSerieA);

router.route('/teamLeague/:league')
    .get(middleware.ensureAuthenticated, teamController.findByLeague);

router.route('/editTeamLeague/:id')
    .put(middleware.ensureAuthenticated, teamController.editTeamLeague);

router.route('/editTeamName/:id')
   .put(middleware.ensureAuthenticated, teamController.editTeamName);


module.exports = router;
