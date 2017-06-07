var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var logController = require('../controllers/logController');


router.route('/log')
    //.get(middleware.ensureAuthenticated, logController.findAll);
.get(logController.findAll);


module.exports = router;
