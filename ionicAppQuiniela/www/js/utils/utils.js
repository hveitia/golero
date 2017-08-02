
//todo: poner logs en los emails
//todo: hacer e flujo de comentarios
//todo: actualizar dashboard voto y comentarios
//todo: refactor al handledataService -- prioridad baja --
//todo: gestionr la caida de la conexion


var urlApi = 'http://ec2-52-35-13-146.us-west-2.compute.amazonaws.com/api/';
//var urlApi = 'http://localhost:3000/api/';


var returnApiCodes = {
  "0001": "El usuario ingresado ya está en uso.",
  "0002": "El email ingresado ya está en uso.",
  "0003": "Usuario y/o Contraseña Incorrectos.",
  "0004": "El usuario no está activo, por favor proceda con la activación de su usuario desde su email."
};

var textConectionLost = {
  title:'¡Conexión Perdida!',
  text:'Lo sentimos, se ha perdido la conexión. Intente reconectar.'
};

var iosVersion = 0;
var androidVersion = 48;

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

canShowVote = function(game) {
  var now = new Date();
  var date = (EsNuloVacio(game.especialDate)) ? game.workingDay.date : game.especialDate;
  var gameDate = new Date(date);
  now.setHours(0, 0, 0, 0);
  gameDate.setHours(0, 0, 0, 0);
  if (gameDate > now) {
    return true;
  }
  return false;

};

EsNuloVacio = function(value) {
  if (value === null || value === undefined || value === '')
    return true;
  else
    return false;
};
