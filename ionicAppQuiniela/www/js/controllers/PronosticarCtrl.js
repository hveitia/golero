angular.module('QuinielaIonicApp')
  .controller('PronosticarCtrl', function($scope, $http, $ionicScrollDelegate,
    Game, Vote, $ionicPopup, DatabaseService, StorageService) {

    $scope.loadGame = function() {
      $scope.gameToVoteList = [];
      $scope.gameToVoteListByDate = [];

      Game.getGameToVote().success(function(data) {

          $scope.gameToVoteList = data;
          $scope.fechaName = '';
          for (var i = 0; i < $scope.gameToVoteList.length; i++) {
            if ($scope.canShowGame($scope.gameToVoteList[i]._id)) {
              if ($scope.gameToVoteList[i].especialDate) {
                $scope.gameToVoteList[i].date = $scope.gameToVoteList[i].especialDate;
              } else {
                $scope.gameToVoteList[i].date = $scope.gameToVoteList[i].workingDay.date;
              }

            } else {
              $scope.gameToVoteList.splice(i, 1);
              i--;
            }
          }

          for (var i = 0; i < $scope.gameToVoteList.length; i++) {
            if (i + 1 < $scope.gameToVoteList.length) {
              if ($scope.gameToVoteList[i].workingDay.name != $scope.gameToVoteList[i + 1].workingDay.name) {
                $scope.gameToVoteList[i + 1].showDivid = true;
              }
            }
          }
          if ($scope.gameToVoteList.length > 0)
            $scope.gameToVoteList[0].showDivid = true;
          $scope.loading = false;
        })
        .error(function(err) {
          $scope.gameToVoteList = [];
          console.log(err);
        });

    };

    $scope.addVote = function(game, voteValue) {
      $scope.loading = true;

      $http({
          method: 'POST',
          url: urlApi + 'vote',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          },
          data: {
            "valueVote": voteValue,
            "game": game._id
          }
        }).success(function(response) {
          /*for (var i = 0; i < $scope.gameToVoteList.length; i++) {
            if ($scope.gameToVoteList[i]._id == game._id) {
              $scope.gameToVoteList.splice(i, 1);
              break;
            }
          }
          $scope.loading = false;*/
          $scope.init();
        })
        .error(function(err) {
          console.log(err);
        });

    };

    $scope.loadVotesByUser = function() {
      $scope.loading = true;

      Vote.getVoteByUser().success(function(data) {
          $scope.voteList = data;

          $scope.loadGame();

        })
        .error(function(err) {

          console.log(err);
        });

    };

    $scope.canShowGame = function(idGame) {
      for (var i = 0; i < $scope.voteList.length; i++) {
        if (idGame == $scope.voteList[i].game) {
          return false;
        }
      }
      return true;
    };

    $scope.buttonIKnowClick = function() {
      StorageService.setItem('showTipsHowToVote', true);
      $scope.showTipsHowToVote = false;
    };

    $scope.init = function() {
      $scope.loading = false;
      $scope.gameToVoteList = [];
      $scope.gameToVoteListByDate = [];
      $scope.voteList = [];
      $ionicScrollDelegate.scrollTop();
      $scope.showTipsHowToVote = StorageService.getItem('showTipsHowToVote') == null;;
      $scope.loadVotesByUser();
    };

    $scope.$on('$ionicView.enter', function() {

      $scope.init();
    });

  })
