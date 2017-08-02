exports = module.exports = function (app, mongoose) {

    var configsSchema = new mongoose.Schema({

        saveLogs: {type: Boolean},
        iosVersion: {type: Number},
        androidVersion: {type: Number}

    });

    mongoose.model('CONFIGSMODEL', configsSchema);
};
