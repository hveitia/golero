var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var teamModel = require('../models/teamModel')(app, mongoose);

var teamController = require('../controllers/teamController');


router.route('/team')
  .get(teamController.findAll)
  .post(teamController.add);


module.exports = router;
