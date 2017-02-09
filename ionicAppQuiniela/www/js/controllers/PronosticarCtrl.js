angular.module('QuinielaIonicApp')


  .controller('PronosticarCtrl', function($scope, Game, $stateParams, $ionicPopup) {
    $scope.items = [];
    $scope.loadGame = function() {
      Game.getAllGames().success(function(data) {

          for (var i = 0; i < data.length; i++) {
            if (canVoteGame(data[i])) {
              $scope.items.push(data[i]);
            }
          }

        })
        .error(function(err) {
          $scope.items = [];
          console.log(err);
        });
    };

    $scope.addVote = function(game, voteValue) {
      var alertPopup = $ionicPopup.alert({
        title: 'Voto',
        template: 'vote-> ' + voteValue + " game->" + game._id
      });
    };

    $scope.pageLoad = function() {
      $scope.loadGame();
    };

    $scope.pageLoad();
  })
