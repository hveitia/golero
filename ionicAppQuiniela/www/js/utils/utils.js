var urlApi = 'http://localhost:3000/api/';

var returnApiCodes = {
  "0001": "El usuario ingresado ya está en uso.",
  "0002": "El email ingresado ya está en uso.",
};


canVoteGame = function(game) {
  var now = new Date();
  var gameDate = new Date(game.workingDay.date);
  now.setHours(0, 0, 0, 0);
  gameDate.setHours(0, 0, 0, 0);
  if (gameDate <= now) {
    return true;
  }
  return false;

};
