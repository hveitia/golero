

var enviroment = 'PROD';//PROD - DEV

var urlApiAWS = 'http://ec2-52-35-13-146.us-west-2.compute.amazonaws.com/api/';
var urlApiLocal = 'http://localhost:3000/api/';
var urlApi = enviroment == 'PROD' ? urlApiAWS : urlApiLocal;


var modeAddEdit = {
  add: 'ADD',
  edit: 'EDIT'
};

function isGameToUpdate(game) {
  var now = new Date();
  var gameDate;
  if (game.especialDate) {
    gameDate = new Date(game.especialDate);
  } else {
    gameDate = new Date(game.workingDay.date);
  }
  now.setHours(0, 0, 0, 0);
  gameDate.setHours(0, 0, 0, 0);
  if (gameDate <= now) {
    return true;
  }
  return false;

}
//Metodos para guardar en localStorage del browser
function SetLocalStorage(key, value) {
  try {
    amplify.store(key, null);
    amplify.store(key, value);
  } catch (error) {
    console.log(error);
  }
}

function GetLocalStorage(value) {
  return amplify.store(value);
}

function LogOut() {
  SetLocalStorage('isLogued', false);
  SetLocalStorage('userToken', undefined);
  window.location.href = 'login.html';
}

function EsNuloVacio(value) {
  if (value === null || value === undefined || value === '')
    return true;
  else
    return false;
}

function compare (a,b) {
  if (a.points > b.points)
    return -1;
  if (a.points < b.points)
    return 1;
  return 0;
}
