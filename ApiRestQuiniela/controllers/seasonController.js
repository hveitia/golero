var mongoose = require('mongoose');
var forEachAsync = require('forEachAsync').forEachAsync;
var SEASONMODEL = mongoose.model('SEASONMODEL');
var WORKINGDAYMODEL = mongoose.model('WORKINGDAYMODEL');
var LEAGUEMODEL = mongoose.model('LEAGUEMODEL');

exports.findAll = function (req, res) {

    SEASONMODEL.find()
        .populate('league')
        .exec(function (err, result) {

            if (err) res.send(500, err.message);

            res.status(200).jsonp(result);

        });
};

exports.findAllActives = function (req, res) {

    SEASONMODEL.find({active: true})
        .populate('league')
        .exec(function (err, result) {

            if (err) res.send(500, err.message);

            res.status(200).jsonp(result);

        });
};

exports.findByLeague = function (req, res) {

    SEASONMODEL.find({league: req.params.league})
        .populate('league')
        .exec(function (err, seasons) {
            if (err) res.send(500, err.message);

            res.status(200).jsonp(seasons);
        });
};

exports.add = function (req, res) {

    var obj = new SEASONMODEL({
        name: req.body.name,
        league: req.body.league,
        active: false
    });

    obj.save(function (err, result) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(result);
    });
};

exports.updateLeague = function(req, res){

    try {

        SEASONMODEL.findOne({_id: req.params.id}, function (err, season) {

            if (err) res.send(500, err.message);

            if (season) {

                season.league = req.body.league;

                season.save(function (err, result) {
                    if (err) return res.send(500, err.message);

                    res.status(200).send('ok');
                });

            } else {
                res.send(500, 'Season not found');
            }
        });

    } catch (e) {

    }
};

exports.activateUnactivateSeason = function (req, res) {

    SEASONMODEL.findById(req.params.id, function (err, obj) {

        if (err) res.send(500, err.message);

        obj.active = req.body.active;

        obj.save(function (err, result) {
            if (err) res.send(500, err.message);

            WORKINGDAYMODEL.find({season: obj._doc._id}, function (err, result) {

                if (err) res.send(500, err.message);

                forEachAsync(result, function (next, element, index, array) {

                    element.active = req.body.active;
                    element.save(function (err, result) {
                        if (err)return res.send(500, err.message);
                        next();
                    });
                }).then(function () {
                    console.log('All requests have finished');
                    res.status(200).send('ok');
                });
            });
        });
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

    SEASONMODEL.findById(req.params.id, function (err, season) {

        season.remove(function (err) {

            if (err) return res.status(500).send(err.message);

            res.status(200).jsonp('OK');
        })
    });

};
