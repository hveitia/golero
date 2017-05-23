exports.canVoteGame = function(game) {
  var now = new Date();
  var gameDate;
  if (game.especialDate) {
    gameDate = new Date(game.especialDate);
  } else {
    gameDate = new Date(game.workingDay.date);
  }
  now.setHours(0, 0, 0, 0);
  gameDate.setHours(0, 0, 0, 0);
  if (gameDate > now) {
    return true;
  }
  return false;

};

exports.isActiveVote = function(date) {
  var now = new Date();
  var gameDate = new Date(date);

  now.setHours(0, 0, 0, 0);
  gameDate.setHours(0, 0, 0, 0);
  if (!date) {
    return false;
  }
  if (gameDate > now) {
    return true;
  }
  return false;

};

exports.modoSend = function() {
  return true;
};

exports.url = function() {
  return 'http://localhost:80/api/';
};
