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
    },
    registerHash: {
      type: String
    },
    avatar:{
      type: String
    },
    favoriteTeam:{
      type: String
    },
    registerDate:{
      type: Date
    },
    lastLogon:{
      type: Date
    },
    role:{
      type: String
    },
    historicalPunctuation:{
      type: []
    }

  });

  mongoose.model('USERMODEL', userSchema);

};
