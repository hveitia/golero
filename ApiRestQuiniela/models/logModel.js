exports = module.exports = function (app, mongoose) {

    var logSchema = new mongoose.Schema({

        user: {type: String},
        method: {type: String},
        logText: {type: String},
        controller: {type: String},
        action: {type: String},
        date: {type: Date}

    });

    mongoose.model('LOGMODEL', logSchema);
};
