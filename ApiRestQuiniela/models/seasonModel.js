exports = module.exports = function(app, mongoose) {

  var seasonSchema = new mongoose.Schema({
    name: {
      type: String
    },
    active:{
      type: Boolean
    }
  });

  mongoose.model('SEASONMODEL', seasonSchema);

};
