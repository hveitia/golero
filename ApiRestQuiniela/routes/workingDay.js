var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var workingDayController = require('../controllers/workingDayController');

router.route('/workingDay')
  .get(middleware.ensureAuthenticated, workingDayController.findAll)
  .post(middleware.ensureAuthenticated, workingDayController.add);

router.route('/workingDayActive')
    .get(middleware.ensureAuthenticated, workingDayController.findAllActives);

router.route('/workingDay/:season')
  .get(middleware.ensureAuthenticated, workingDayController.findBySeason);

router.route('/workingDayName/:name')
  .get(middleware.ensureAuthenticated, workingDayController.findByName);

module.exports = router;
