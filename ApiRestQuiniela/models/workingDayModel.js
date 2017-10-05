exports = module.exports = function (app, mongoose) {

    var SEASONMODEL = mongoose.model('SEASONMODEL');
    var LEAGUEMODEL = mongoose.model('LEAGUEMODEL');

    var workingDaySchema = new mongoose.Schema({

        name: {type: String},
        date: {type: Date},
        season: {type: mongoose.Schema.ObjectId, ref: "SEASONMODEL"},
        active: {type: Boolean},
        league: {type: mongoose.Schema.ObjectId, ref: "LEAGUEMODEL"}

    });

    mongoose.model('WORKINGDAYMODEL', workingDaySchema);
};
