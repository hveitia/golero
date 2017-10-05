var mongoose = require('mongoose');
var WORKINGDAYMODEL = mongoose.model('WORKINGDAYMODEL');
var SEASONMODEL = mongoose.model('SEASONMODEL');

exports.findAll = function (req, res) {

    WORKINGDAYMODEL.find()
        .populate('league')
        .populate('season')
        .exec(function (err, result) {

            if (err) res.send(500, err.message);

            res.status(200).jsonp(result);

        });
};

exports.findAllActives = function (req, res) {

    WORKINGDAYMODEL.find({active: true})
        .populate('league')
        .populate('season')
        .exec(function (err, workingDays) {
            if (err) res.send(500, err.message);

            res.status(200).jsonp(workingDays);
        });
};

exports.findBySeason = function (req, res) {

    WORKINGDAYMODEL.find({season: req.params.season})
        .populate('league')
        .exec(function (err, workingDays) {
            if (err) res.send(500, err.message);

            res.status(200).jsonp(workingDays);
        });
};

exports.findByName = function (req, res) {

    WORKINGDAYMODEL.find({name: req.params.name})
        .populate('league')
        .exec(function (err, workingDays) {
            if (err) res.send(500, err.message);

            res.status(200).jsonp(workingDays);
        });
};

exports.findByLeague = function (req, res) {

    WORKINGDAYMODEL.find({league: req.params.league})
        .populate('league')
        .populate('season')
        .exec(function (err, workingDays) {
            if (err) res.send(500, err.message);

            res.status(200).jsonp(workingDays);
        });
};

exports.add = function (req, res) {

    var obj = new WORKINGDAYMODEL({
        date: req.body.date,
        season: req.body.season,
        name: req.body.name,
        active: true,
        league: req.body.league

    });

    obj.save(function (err, result) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(result);
    });
};

exports.addAllWorkingDayToLeague = function (req, res) {

    try {
        WORKINGDAYMODEL.update({}, {league: req.body.league}, {multi: true}, function (err) {

            if (err)res.status(500).send(err.message);

            res.status(200).send('OK');
        });
    } catch (e) {
        logController.saveLog('Crash', 'POST', new Date().toString('dd/MM/yyyy HH:mm:ss'), e.message, 'workingDayController', 'addAllGamesToLeague');
    }
};

exports.editWorkingDayLeague = function (req, res) {
    try {

        WORKINGDAYMODEL.findOne({_id: req.params.id}, function (err, workingDay) {

            if (err) res.send(500, err.message);

            if (workingDay) {

                workingDay.league = req.body.league;

                workingDay.save(function (err, result) {
                    if (err) return res.send(500, err.message);

                    res.status(200).send('ok');
                });

            } else {
                res.send(500, 'WorkingDay not found');
            }
        });

    } catch (e) {

    }
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
