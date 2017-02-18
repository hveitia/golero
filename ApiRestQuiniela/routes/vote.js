var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var voteModel = require('../models/voteModel')(app, mongoose);

var voteController = require('../controllers/voteController');


router.route('/vote')
  .get(middleware.ensureAuthenticated, voteController.findAll)
  .post(middleware.ensureAuthenticated, voteController.add);

router.route('/voteByUser')
    .get(middleware.ensureAuthenticated, voteController.getVotesByOwnUser);


router.route('/voteByUserAny/:user')
    .get(middleware.ensureAuthenticated, voteController.getVotesByUser);


module.exports = router;
