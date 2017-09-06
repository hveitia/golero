exports = module.exports = function (app, mongoose) {

    var LEAGUEMODEL = mongoose.model('LEAGUEMODEL');

    var teamSchema = new mongoose.Schema({
        name: {type: String},
        logo: {type: String},
        league: {type: mongoose.Schema.ObjectId, ref: "LEAGUEMODEL"}
    });

    mongoose.model('TEAMMODEL', teamSchema);

};
