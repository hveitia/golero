var CONFIGSMODEL = mongoose.model('CONFIGSMODEL');

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

exports.updateSaveLogs = function (req,res) {

    CONFIGSMODEL.findById(req.params.id,function (err, obj) {

        if (err) res.send(500, err.message);

        obj.saveLogs = req.body.saveLogs;

        obj.save(function (err, result) {
            if (err) res.send(500, err.message);

            res.status(200).jsonp(result);
        });

    });
};


