var USERMODEL = mongoose.model('USERMODEL');
var VOTEMODEL = mongoose.model('VOTEMODEL');

var userNumbers = 10000;

exports.addUsers = function(req, res) {


    for (var i = 0; i < userNumbers; i++) {
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

    res.status(200).jsonp('Created ' + userNumbers);

};

exports.addVotes = function(req, res) {

var posibilities = ['1','2','0','1','2','0','1','2','0','1','2'];

    USERMODEL.find().limit(userNumbers).exec(function(err, result) {

        if (err) {
            res.send(500, err.message);
        }

        var ind=0;
        for(var i = 0; i < result.length; i++){


            var obj = new VOTEMODEL({
                valueVote: posibilities[ind++],
                user: result[i]._doc._id,
                game: '58956466181b4f4512000005'

            });

            obj.save(function(err, result) {

                if (err) return res.send(500, err.message);

                if(ind == 10)ind=0;
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


/*

{
 "_id" : ObjectId("589b7c7e311accb096000001"),
 "user" : "admin",
 "pass" : "21232f297a57a5a743894a0e4a801fc3",
 "email" : "admin@gmail.com",
 "points" : 3,
 "state" : "ACTIVE",
 "favoriteTeam" : "independiente.png",
 "avatar" : "2.png",
 "__v" : 0
 }

* */



