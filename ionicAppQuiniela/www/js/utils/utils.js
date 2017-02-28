var urlApi = 'http://192.168.1.2:3000/api/';

var returnApiCodes = {
  "0001": "El usuario ingresado ya está en uso.",
  "0002": "El email ingresado ya está en uso.",
  "0003": "Usuario y/o Contraseña Incorrectos.",
  "0004": "El usuario no está activo, por favor proceda con la activación de su usuario desde su email."
};

var tokenUser = '';

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
