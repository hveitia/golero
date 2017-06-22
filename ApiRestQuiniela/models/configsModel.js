
exports = module.exports = function(app, mongoose) {

    var configsSchema = new mongoose.Schema({

        saveLogs: {
            type: Boolean
        }

    });

    mongoose.model('CONFIGSMODEL', configsSchema);
};
