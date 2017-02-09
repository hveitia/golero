angular.module('QuinielaApp')

  .controller('GameCtrl', ['$scope', '$http', 'HandleDataService', function($scope, $http, HandleDataService) {

    $scope.gameList = [];
    $scope.teamsList = [];
    $scope.seasonList = [];
    $scope.workinDayList = [];

    $scope.pageload = function() {

      $scope.loadTeams();
      $scope.loadSeasons();
      $scope.loadWorkingDays();
      $scope.loadGames();

    };

    $scope.loadTeams = function() {
      HandleDataService.getAllTeams().success(function(data) {
          $scope.teamsList = data;
          $scope.teamLocal = data[0];
          $scope.teamVisitor = data[1];
        })
        .error(function(err) {
          $scope.teamsList = [];
          console.log(err);
        });
    };

    $scope.loadSeasons = function() {
      HandleDataService.getAllSeansons().success(function(data) {
          $scope.seasonList = data;
          $scope.seasonSelected = data[0];

        })
        .error(function(err) {
          $scope.seasonList = [];
          console.log(err);
        });
    };

    $scope.loadWorkingDays = function() {
      HandleDataService.getAllWorkingDays().success(function(data) {
          $scope.workinDayList = data;
          $scope.workinDaySelected = data[0];

        })
        .error(function(err) {
          $scope.seasonList = [];
          console.log(err);
        });
    };

    $scope.loadGames = function() {
      HandleDataService.getAllGames().success(function(data) {
          $scope.gameList = data;
          for (var i = 0; i < $scope.gameList.length; i++) {
            if (isGameToUpdate($scope.gameList[i])) {
              $scope.gameList[i].toUpdate = true;
            } else {
              $scope.gameList[i].toUpdate = false;
            }
          }
        })
        .error(function(err) {
          $scope.gameList = [];
          console.log(err);
        });
    };

    $scope.addGame = function() {
      $http.post(urlApi + 'game', {
          "workingDay": $scope.workinDaySelected._id,
          "localTeam": $scope.teamLocal._id,
          "visitorTeam": $scope.teamVisitor._id
        })
        .success(function(response) {
          $scope.loadGames();
        })
        .error(function(err) {
          console.log(err);
        });
    };

    $scope.pageload();

  }]);
