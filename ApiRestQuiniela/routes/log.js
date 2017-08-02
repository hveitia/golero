var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var logController = require('../controllers/logController');


router.route('/log')
    .get(middleware.ensureAuthenticated, logController.findAll);

router.route('/clearLogs')
    .options(middleware.ensureAuthenticated, logController.options)
    .delete(middleware.ensureAuthenticated, logController.clearLogs);


module.exports = router;
