angular.module('QuinielaApp')

  .controller('VoteCtrl', ['$scope', '$http', '$q', 'HandleDataService',
    function($scope, $http, $q, HandleDataService) {

      $scope.pageload = function() {

        $scope.loadVotes();

      };

      $scope.loadVotes = function() {

        HandleDataService.getVotes().success(function(data) {
          $scope.voteList = data;

          for (var i = 0; i < $scope.voteList.length; i++) {
            $scope.getGameById($scope.voteList[i].game, $scope.voteList[i]);
          }

        }).error(function(err) {
          $scope.voteList = [];
          console.log(err);
        });
      };

      $scope.getGameById = function(id, vote) {

        HandleDataService.getGamesById(id).success(function(data) {
          vote.game = data;
        }).error(function(err) {
          console.log(err);
        });
      };

      $scope.pageload();

    }
  ]);
