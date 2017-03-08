var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');


var testController = require('../controllers/testController');

router.route('/insertUsers')
    .get(testController.addUsers);

router.route('/insertVotes')
    .get(testController.addVotes);

module.exports = router;
