var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var seasonModel = require('../models/seasonModel')(app, mongoose);

var seasonController = require('../controllers/seasonController');


router.route('/season')
  .get(seasonController.findAll)
  .post(seasonController.add);


module.exports = router;
