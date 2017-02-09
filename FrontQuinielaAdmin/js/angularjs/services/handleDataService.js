(function() {
  angular.module('QuinielaAppServices', [])
    .factory('HandleDataService', ['$http', '$q', function($http, $q) {

      return {
        getRegisteredUsers: function() {
          return $http({
            method: 'GET',
            url: urlApi + 'user'
          });
        },
        getAllTeams: function() {
          return $http({
            method: 'GET',
            url: urlApi + 'team'
          });
        },
        getAllWorkingDays: function() {
          return $http({
            method: 'GET',
            url: urlApi + 'workingDay'
          });
        },
        getAllGames: function() {
          return $http({
            method: 'GET',
            url: urlApi + 'game'
          });
        },
        getGamesByWorkingDay: function(workingDay) {
          return $http({
            method: 'GET',
            url: urlApi + 'game/' + workingDay
          });
        },
        getGameByState: function(state) {
          return $http({
            method: 'GET',
            url: urlApi + 'gameState/' + state
          });
        },
        getAllSeansons: function() {
          return $http({
            method: 'GET',
            url: urlApi + 'season'
          });
        },

        updateGame: function(game) {
          return $http({
            method: 'PUT',
            url: urlApi + 'gameUpdate/' + game.id,
            data: {
              "goalsLocalTeam": game.goalsLocalTeam,
              "goalsVisitorTeam": game.goalsVisitorTeam
            }
          });

        }
        //////////////////////////////////////////////
      }
    }]);

})();
