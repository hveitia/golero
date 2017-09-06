exports = module.exports = function (app, mongoose) {

    var userSchema = new mongoose.Schema({
        user: {type: String},
        pass: {type: String},
        email: {type: String},
        points: {type: Number},
        state: {type: String},
        registerHash: {type: String},
        avatar: {type: String},
        favoriteTeam: {type: String},
        registerDate: {type: Date},
        lastLogon: {type: Date},
        role: {type: String},
        historicalPunctuation: {type: []},
        lastPosition: {type: Number},
        tickets: {type: Number},
        reputation: {type: Number},
        resendMailDate: {type: Date},
        ticketsState: {type: String}

    });

    mongoose.model('USERMODEL', userSchema);

};
