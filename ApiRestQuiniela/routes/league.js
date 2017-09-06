var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var leagueModel = require('../models/leagueModel')(app, mongoose);

var leagueController = require('../controllers/leagueController');

router.route('/league')
    .get(middleware.ensureAuthenticated, leagueController.findAll)
    .post(middleware.ensureAuthenticated, leagueController.add);


router.route('/league/:id')
    .put(middleware.ensureAuthenticated, leagueController.update);

router.route('/league/:id')
    .options(middleware.ensureAuthenticated, leagueController.options)
    .delete(middleware.ensureAuthenticated, leagueController.delete);

router.route('/getLeagueLogo/:logo')
    .get(leagueController.getLeagueLogo);


module.exports = router;
