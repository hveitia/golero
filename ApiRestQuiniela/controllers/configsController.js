var CONFIGSMODEL = mongoose.model('CONFIGSMODEL');
var logController = require('./logController');

//OPTIONS Allow CORS to DELETE
exports.options = function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    next();
};

exports.saveObjConfigs = function (req, res) {

    var obj = new CONFIGSMODEL({});

    obj.save(function (err, result) {
        if (err) res.send(500, err.message);

        res.status(200).send('OK');
    });
};

exports.loadConfigs = function (req, res) {

    CONFIGSMODEL.find(function (err, result) {

        if (err) res.send(500, err.message);
        res.status(200).jsonp(result);
    });
};

exports.getIosVersion = function (req, res) {

    try {
        CONFIGSMODEL.find(function (err, obj) {

            if (err)
                res.status(500).send(err.message);

            if (obj.length == 1) {
                res.status(200).send(obj[0].iosVersion);
            } else {
                res.status(200).send(0);
            }
        });
    }catch(e){
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'configController', 'getIosVersion');
    }
};

exports.getAndroidVersion = function (req, res) {

    try {
        CONFIGSMODEL.find(function (err, obj) {

            if (err) res.status(500).send(err.message);

            if (obj.length == 1) {
                res.status(200).send(obj[0].androidVersion);
            }
            else {
                res.status(200).send(0);
            }
        });
    }
    catch(e){
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'configController', 'getAndroidVersion');
    }
};

exports.updateSaveLogs = function (req, res) {

    CONFIGSMODEL.findById(req.params.id, function (err, obj) {

        if (err) res.send(500, err.message);

        obj.saveLogs = req.body.saveLogs;

        obj.save(function (err, result) {
            if (err) res.send(500, err.message);

            res.status(200).jsonp(result);
        });

    });
};

exports.updateIosVersion = function (req, res) {

    CONFIGSMODEL.findById(req.params.id, function (err, obj) {

        if (err) res.send(500, err.message);

        obj.iosVersion = req.body.iosVersion;

        obj.save(function (err, result) {
            if (err) res.send(500, err.message);

            res.status(200).jsonp(result);
        });

    });
};

exports.updateAndriodVersion = function (req, res) {

    CONFIGSMODEL.findById(req.params.id, function (err, obj) {

        if (err) res.send(500, err.message);

        obj.androidVersion = req.body.androidVersion;

        obj.save(function (err, result) {
            if (err) res.send(500, err.message);

            res.status(200).jsonp(result);
        });

    });
};


