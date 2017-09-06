exports = module.exports = function (app, mongoose) {

    var LEAGUEMODEL = mongoose.model('LEAGUEMODEL');

    var seasonSchema = new mongoose.Schema({
        name: {type: String},
        active: {type: Boolean},
        league: {type: mongoose.Schema.ObjectId, ref: "LEAGUEMODEL"}
    });

    mongoose.model('SEASONMODEL', seasonSchema);

};
