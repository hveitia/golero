var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var textsModel = require('../models/textsModel')(app, mongoose);

var textsController = require('../controllers/textsController');

router.route('/updateTexts')
    .options(middleware.ensureAuthenticated, textsController.options)
    .put(middleware.ensureAuthenticated, textsController.updateText);

router.route('/addTexts')
    .post(middleware.ensureAuthenticated, textsController.saveText);

router.route('/getTextsByKey/:key')
    .get(middleware.ensureAuthenticated, textsController.findByKey);

router.route('/getTexts')
    .get(middleware.ensureAuthenticated, textsController.find);

module.exports = router;