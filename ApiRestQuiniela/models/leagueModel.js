exports = module.exports = function (app, mongoose) {

    var leagueSchema = new mongoose.Schema({

        name: {type: String},
        logo: {type: String}

    });

    mongoose.model('LEAGUEMODEL', leagueSchema);
};
