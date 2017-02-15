exports = module.exports = function(app, mongoose) {
  var TEAMMODEL = mongoose.model('TEAMMODEL');
  var WORKINGDAYMODEL = mongoose.model('WORKINGDAYMODEL');

  var gameSchema = new mongoose.Schema({
    workingDay: {
      type: mongoose.Schema.ObjectId,
      ref: "WORKINGDAYMODEL"
    },
    localTeam: {
      type: mongoose.Schema.ObjectId,
      ref: "TEAMMODEL"
    },
    visitorTeam: {
      type: mongoose.Schema.ObjectId,
      ref: "TEAMMODEL"
    },
    goalsLocalTeam: {
      type: Number
    },
    goalsVisitorTeam: {
      type: Number
    },
    state: {
      type: String
    },
    especialDate: {
      type: Date
    }
  });

  mongoose.model('GAMEMODEL', gameSchema);

};
