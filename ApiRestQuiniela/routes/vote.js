var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');
var voteController = require('../controllers/voteController');


router.route('/vote')
  .get(middleware.ensureAuthenticated, voteController.findAll)
  .post(middleware.ensureAuthenticated, voteController.add);

router.route('/vote/:id')
    .put(middleware.ensureAuthenticated, voteController.update)
    .options(middleware.ensureAuthenticated, voteController.options)
    .delete(middleware.ensureAuthenticated, voteController.delete);

router.route('/voteByUser')
    .get(middleware.ensureAuthenticated, voteController.getVotesByOwnUser);

router.route('/votesActiveByUser')
    .get(middleware.ensureAuthenticated, voteController.getVotesActiveByOwnUser);

router.route('/votesTodayByUser')
    .get(middleware.ensureAuthenticated, voteController.getVotesTodayByOwnUser);

router.route('/voteByUserAny/:user')
    .get(middleware.ensureAuthenticated, voteController.getVotesByUser);


module.exports = router;
