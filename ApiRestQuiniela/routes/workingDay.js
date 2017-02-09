var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var workingDayController = require('../controllers/workingDayController');

router.route('/workingDay')
  .get(workingDayController.findAll)
  .post(workingDayController.add);

router.route('/workingDay/:season')
  .get(workingDayController.findBySeason);

router.route('/workingDayName/:name')
  .get(workingDayController.findByName);

module.exports = router;
