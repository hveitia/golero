exports = module.exports = function(app, mongoose) {

  var teamSchema = new mongoose.Schema({
    name: {
      type: String
    },
    logo: {
      type: String
    }
  });

  mongoose.model('TEAMMODEL', teamSchema);

};
