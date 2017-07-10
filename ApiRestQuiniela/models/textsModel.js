exports = module.exports = function(app, mongoose) {

    var textsSchema = new mongoose.Schema({

        key: {
            type: String
        },
        text: {
            type: String
        },
        title:{
            type: String
        }

    });

    mongoose.model('TEXTSMODEL', textsSchema);
};
