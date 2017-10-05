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

router.route('/editWorkingDayLeague/:id')
    .put(middleware.ensureAuthenticated, workingDayController.editWorkingDayLeague);

router.route('/workingDayName/:name')
  .get(middleware.ensureAuthenticated, workingDayController.findByName);

router.route('/workingDayLeague/:league')
    .get(middleware.ensureAuthenticated, workingDayController.findByLeague);

router.route('/addAllWorkingDayToLeague')
    .post(middleware.ensureAuthenticated, workingDayController.addAllWorkingDayToLeague);

router.route('/workingDayName/:id')
    .options(middleware.ensureAuthenticated, workingDayController.options)
    .delete(middleware.ensureAuthenticated, workingDayController.delete);

module.exports = router;
