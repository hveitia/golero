exports = module.exports = function(app, mongoose) {

  var seasonSchema = new mongoose.Schema({
    name: {
      type: String
    }
  });

  mongoose.model('SEASONMODEL', seasonSchema);

};
