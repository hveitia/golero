exports = module.exports = function (app, mongoose) {

    var SEASONMODEL = mongoose.model('SEASONMODEL');

    var workingDaySchema = new mongoose.Schema({

        name: {type: String},
        date: {type: Date},
        season: {type: mongoose.Schema.ObjectId, ref: "SEASONMODEL"},
        active: {type: Boolean}

    });

    mongoose.model('WORKINGDAYMODEL', workingDaySchema);
};
