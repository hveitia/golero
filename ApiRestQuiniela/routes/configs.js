var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var middleware = require('../middleware');

var configsController = require('../controllers/configsController');


router.route('/saveObjConfigs')
    .get(configsController.saveObjConfigs);


router.route('/loadConfigs')
    .get(middleware.ensureAuthenticated, configsController.loadConfigs);

router.route('/configsUpdateSaveLog/:id')
    .options(middleware.ensureAuthenticated, configsController.options)
    .put(middleware.ensureAuthenticated, configsController.updateSaveLogs);



module.exports = router;
