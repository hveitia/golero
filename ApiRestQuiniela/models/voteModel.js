exports = module.exports = function(app, mongoose) {
  var USERMODEL = mongoose.model('USERMODEL');
  var GAMEMODEL = mongoose.model('GAMEMODEL');

  var voteSchema = new mongoose.Schema({
    valueVote: {
      type: String
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'USERMODEL'
    },
    game: {
      type: mongoose.Schema.ObjectId,
      ref: 'GAMEMODEL'
    }


  });

  mongoose.model('VOTEMODEL', voteSchema);
};
