var mongoose = require('mongoose');
var TEAMMODEL = mongoose.model('TEAMMODEL');

exports.findAllSerieA = function (req, res) {

    TEAMMODEL.find()
        .populate('league')
        .exec(function (err, result) {

            if (err) res.send(500, err.message);

            var resultToSend = result.filter(function (x) {
                return x._doc.league._doc.name == "Copa Pilsener";
            });

            res.status(200).jsonp(resultToSend);

        });
};

exports.findAll = function (req, res) {

    TEAMMODEL.find()
        .populate('league')
        .exec(function (err, result) {

            if (err) res.send(500, err.message);

            res.status(200).jsonp(result);

        });
};

exports.findByLeague = function (req, res) {

    TEAMMODEL.find({league: req.params.league})
        .populate('league')
        .exec(function (err, teams) {
            if (err) res.send(500, err.message);

            res.status(200).jsonp(teams);
        });
};

exports.editTeamName = function (req, res) {

    TEAMMODEL.findById(req.params.id, function (err, obj) {

        if (err) res.status(500).send(err.message);

        if (obj) {

            obj.name = req.body.name;

            obj.save(function (err, result) {

                if (err) res.status(500).send(err.message);

                res.status(200).jsonp(result);
            });

        } else {
            res.status(404).send('404');
        }

    });
};

exports.editTeamLeague = function (req, res) {
    try {

        TEAMMODEL.findOne({_id: req.params.id}, function (err, team) {

            if (err) res.send(500, err.message);

            if (team) {

                team.league = req.body.league;

                team.save(function (err, result) {
                    if (err) return res.send(500, err.message);

                    res.status(200).send('ok');
                });

            } else {
                res.send(500, 'Team not found');
            }
        });

    } catch (e) {

    }
};

exports.add = function (req, res) {

    var obj = new TEAMMODEL({
        name: req.body.name,
        logo: req.body.logo,
        league: req.body.league
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
