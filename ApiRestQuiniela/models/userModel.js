exports = module.exports = function(app, mongoose) {

  var userSchema = new mongoose.Schema({
    user: {
      type: String
    },
    pass: {
      type: String
    },
    email: {
      type: String
    },
    points: {
      type: Number
    },
    state: {
      type: String
    }

  });

  mongoose.model('USERMODEL', userSchema);

};
