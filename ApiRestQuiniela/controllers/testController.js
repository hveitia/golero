var USERMODEL = mongoose.model('USERMODEL');
var VOTEMODEL = mongoose.model('VOTEMODEL');

exports.addUsers = function(req, res) {

    for (var i = 0; i < 10; i++) {
        var obj = new USERMODEL({
            user: 'admin' + i,
            pass: '21232f297a57a5a743894a0e4a801fc3',
            email: '',
            points: 0,
            state: 'ACTIVE',
            registerHash: '',
            avatar: 'user.png',
            favoriteTeam: 'noteam.png',
            registerDate: new Date(),
            role: 'TEST_USER'
        });
        obj.save(function (err, result) {
            if (err) return res.send(500, err.message);

        });
    }

    res.status(200).jsonp('Created 10000');

};

exports.addVotes = function(req, res) {

var posibilities = ['1','2','0','1','2','0','1','2','0','1','2'];

    USERMODEL.find().limit(10).exec(function(err, result) {

        if (err) {
            res.send(500, err.message);
        }

        for(var i = 0; i < result.length; i++){


            var obj = new VOTEMODEL({
                valueVote: posibilities[Math.floor((Math.random() * 10))],
                user: result[i]._doc._id,
                game: '589e5ddb0aa5c4d0ca00000c'

            });

            obj.save(function(err, result) {

                if (err) return res.send(500, err.message);

            });

        }
        res.status(200).send('OK');
    });
};

exports.resetPoints = function(req, res) {

    USERMODEL.find().exec(function(err, result) {

        if (err) {
            res.send(500, err.message);
        }

        for(var i = 0; i < result.length; i++){

            result[i].points = 0;

            result[i].save(function(err, result) {

                if (err) return res.send(500, err.message);

            });

        }

        res.status(200).send('OK');
    });

};



