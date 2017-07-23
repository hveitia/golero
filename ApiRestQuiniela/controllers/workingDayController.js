var mongoose = require('mongoose');
var WORKINGDAYMODEL = mongoose.model('WORKINGDAYMODEL');
var SEASONMODEL = mongoose.model('SEASONMODEL');

exports.findAll = function (req, res) {

    WORKINGDAYMODEL.find(function (err, result) {
        SEASONMODEL.populate(result, {
            path: "season"
        }, function (err, workingDays) {
            if (err) res.send(500, err.message);

            res.status(200).jsonp(workingDays);
        });
    });
};

exports.findAllActives = function (req, res) {

    WORKINGDAYMODEL.find({active: true}, function (err, result) {
        SEASONMODEL.populate(result, {
            path: "season"
        }, function (err, workingDays) {
            if (err) res.send(500, err.message);

            res.status(200).jsonp(workingDays);
        });
    });
};

exports.findBySeason = function (req, res) {

    WORKINGDAYMODEL.find({
        season: req.params.season
    }, function (err, result) {

        if (err) res.send(500, err.message);

        res.status(200).jsonp(result);
    });
};

exports.findByName = function (req, res) {

    WORKINGDAYMODEL.find({
        name: req.params.name
    }, function (err, result) {

        if (err) res.send(500, err.message);

        res.status(200).jsonp(result);
    });
};

exports.add = function (req, res) {

    console.log(req.body);
    var obj = new WORKINGDAYMODEL({
        date: req.body.date,
        season: req.body.season,
        name: req.body.name,
        active: true

    });

    obj.save(function (err, result) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(result);
    });
};

//OPTIONS Allow CORS to DELETE
exports.options = function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    next();
};

exports.delete = function (req, res) {

    WORKINGDAYMODEL.findById(req.params.id, function (err, obj) {

        if (err) return res.status(500).send(err.message);

        if (obj) {

            obj.remove(function (err) {

                if (err) return res.status(500).send(err.message);

                res.status(200).jsonp('OK');
            })
        }

    });


};