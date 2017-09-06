var mongoose = require('mongoose');
var path = require("path");
var LEAGUEMODEL = mongoose.model('LEAGUEMODEL');

exports.findAll = function (req, res) {

    LEAGUEMODEL.find({}, function (err, result) {

        if (err)res.send(500, err.message);

        res.status(200).jsonp(result);

    });
};

exports.add = function (req, res) {

    var obj = new LEAGUEMODEL({
        name: req.body.name,
        logo: req.body.logo
    });

    obj.save(function (err, result) {

        if (err) return res.send(500, err.message);

        res.status(200).jsonp(result);
    });
};

exports.update = function (req, res) {

    LEAGUEMODEL.findOne({_id: req.params.id}, function (err, obj) {

        if (err)res.send(500, err.message);

        if (obj) {

            obj.name = req.body.name;
            obj.logo = req.body.logo;

            obj.save(function (err, result) {

                if (err) return res.send(500, err.message);

                res.status(200).send('ok');
            });
        }
        else {
            res.send(500, 'User not found');
        }

        res.status(200).jsonp(result);

    });
};

exports.getLeagueLogo = function (req, res) {


        if (req.params.logo) {

            res.sendFile(path.join(__dirname + '/images/leaguesLogos/' + req.params.logo));
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

    LEAGUEMODEL.findById(req.params.id, function (err, obj) {

        obj.remove(function (err) {

            if (err) return res.status(500).send(err.message);

            res.status(200).jsonp('OK');
        })
    });

};
