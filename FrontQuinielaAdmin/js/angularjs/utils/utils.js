var urlApi = 'http://localhost:3000/api/';

var modeAddEdit = {
  add: 'ADD',
  edit: 'EDIT'
};
isGameToUpdate = function(game) {
  var now = new Date();
  var gameDate = new Date(game.workingDay.date);
  now.setHours(0, 0, 0, 0);
  gameDate.setHours(0, 0, 0, 0);
  if (gameDate <= now) {
    return true;
  }
  return false;

};
