exports = module.exports = function (app, mongoose) {

    var USERMODEL = mongoose.model('USERMODEL');
    var GAMEMODEL = mongoose.model('GAMEMODEL');

    var challengeSchema = new mongoose.Schema({

        userToChallenge: {type: mongoose.Schema.ObjectId, ref: "USERMODEL"},
        userChallenged: {type: mongoose.Schema.ObjectId, ref: "USERMODEL"},
        game: {type: mongoose.Schema.ObjectId, ref: "GAMEMODEL"},
        state:{type: String}

    });

    mongoose.model('CHALLENGEMODEL', challengeSchema);

};

/*
  States:CREATED, ACCEPTED, REJECTED, INACTIVE
 */
