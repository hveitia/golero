var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var voteModel = require('../models/voteModel')(app, mongoose);

var voteController = require('../controllers/voteController');


router.route('/vote')
  .get(voteController.findAll)
  .post(voteController.add);


module.exports = router;
