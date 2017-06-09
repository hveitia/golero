(function() {
  angular.module('QuinielaAppServices', [])
    .factory('HandleDataService', ['$http', '$q', function($http, $q) {

      return {
        getRegisteredUsers: function() {
          return $http({
            method: 'GET',
            url: urlApi + 'user',
            headers: {
              'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
              'Content-Type': 'application/json'
            }
          });
        },
        getLogs: function() {
          return $http({
            method: 'GET',
            url: urlApi + 'log',
            headers: {
              'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
              'Content-Type': 'application/json'
            }
          });
        },
        getVotes: function() {
          return $http({
            method: 'GET',
            url: urlApi + 'vote',
            headers: {
              'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
              'Content-Type': 'application/json'
            }
          });
        },
        getAllTeams: function() {
          return $http({
            method: 'GET',
            url: urlApi + 'team',
            headers: {
              'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
              'Content-Type': 'application/json'
            }
          });
        },
        getAllWorkingDays: function() {
          return $http({
            method: 'GET',
            url: urlApi + 'workingDay',
            headers: {
              'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
              'Content-Type': 'application/json'
            }
          });
        },
        getAllGames: function() {
          return $http({
            method: 'GET',
            url: urlApi + 'game',
            headers: {
              'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
              'Content-Type': 'application/json'
            }
          });
        },
        getGamesByWorkingDay: function(workingDay) {
          return $http({
            method: 'GET',
            url: urlApi + 'game/' + workingDay,
            headers: {
              'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
              'Content-Type': 'application/json'
            }
          });
        },
        getGamesById: function(id) {
          return $http({
            method: 'GET',
            url: urlApi + 'game/' + id,
            headers: {
              'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
              'Content-Type': 'application/json'
            }
          });
        },
        getGameByState: function(state) {
          return $http({
            method: 'GET',
            url: urlApi + 'gameState/' + state,
            headers: {
              'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
              'Content-Type': 'application/json'
            }
          });
        },
        getAllSeansons: function() {
          return $http({
            method: 'GET',
            url: urlApi + 'season',
            headers: {
              'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
              'Content-Type': 'application/json'
            }
          });
        },

        updateGame: function(game) {
          return $http({
            method: 'PUT',
            url: urlApi + 'gameUpdate/' + game.id,
            data: {
              "goalsLocalTeam": game.goalsLocalTeam,
              "goalsVisitorTeam": game.goalsVisitorTeam
            },
            headers: {
              'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
              'Content-Type': 'application/json'
            }
          });
        },

        addGame: function(obj) {
          return $http({
            method: 'POST',
            url: urlApi + 'game',
            data: {
              "workingDay": obj.workinDaySelected,
              "localTeam": obj.teamLocal,
              "visitorTeam": obj.teamVisitor
            },
            headers: {
              'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
              'Content-Type': 'application/json'
            }
          });
        },

        addWorkingDay: function(obj) {
          return $http({
            method: 'POST',
            url: urlApi + 'workingDay',
            data: {
              "date": obj.workinDayDate,
              "season": obj.seasonSelected._id,
              "name": obj.workinDayName
            },
            headers: {
              'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
              'Content-Type': 'application/json'
            }
          });
        },

        updateGameSpecialDate: function(game) {
          return $http({
            method: 'PUT',
            url: urlApi + 'gameUpdateSpecialDate/' + game.id,
            data: {
              "especialDate": game.especialDate
            },
            headers: {
              'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
              'Content-Type': 'application/json'
            }
          });
        },

        deleteUser: function(user) {
          return $http({
            method: 'DELETE',
            url: urlApi + 'user/' + user,
            headers: {
              'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
              'Content-Type': 'application/json'
            }
          });
        }
        //////////////////////////////////////////////
      }
    }]);

})();
