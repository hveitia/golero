var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var configsController = require('../controllers/configsController');


//router.route('/saveObjConfigs')
    //.get(configsController.saveObjConfigs);


router.route('/loadConfigs')
    .get(middleware.ensureAuthenticated, configsController.loadConfigs);

router.route('/getIosVersion')
    .get(middleware.ensureAuthenticated, configsController.getIosVersion);

router.route('/getAndroidVersion')
    .get(middleware.ensureAuthenticated, configsController.getAndroidVersion);

router.route('/configsUpdateSaveLog/:id')
    .options(middleware.ensureAuthenticated, configsController.options)
    .put(middleware.ensureAuthenticated, configsController.updateSaveLogs);

router.route('/updateAndriodVersion/:id')
    .put(middleware.ensureAuthenticated, configsController.updateAndriodVersion);

router.route('/updateIosVersion/:id')
    .put(middleware.ensureAuthenticated, configsController.updateIosVersion);

module.exports = router;
