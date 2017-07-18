var mongoose = require('mongoose');
var TEAMMODEL = mongoose.model('TEAMMODEL');

exports.findAll = function (req, res) {

    TEAMMODEL.find(function (err, result) {

        if (err) res.send(500, err.message);

        res.status(200).jsonp(result);
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

exports.add = function (req, res) {

    var obj = new TEAMMODEL({
        name: req.body.name,
        logo: req.body.logo
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
