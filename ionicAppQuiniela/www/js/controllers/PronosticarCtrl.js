angular.module('QuinielaIonicApp')
  .controller('PronosticarCtrl', function($scope, $http, $q, Game, Vote, $stateParams, $ionicPopup, $state, DatabaseService) {

    $scope.loadGame = function() {
      $scope.gameToVoteList = [];
      $scope.gameToVoteListByDate = [];
      DatabaseService.initDB();
      DatabaseService.getData("userData").then(function(res) {
        Game.getGameToVote(res.data.token).success(function(data) {

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
            $scope.gameToVoteList[0].showDivid = true;
          })
          .error(function(err) {
            $scope.gameToVoteList = [];
            console.log(err);
          });
      });
    };

    $scope.addVote = function(game, voteValue) {
      DatabaseService.initDB();
      DatabaseService.getData("userData").then(function(res) {
        $http({
            method: 'POST',
            url: urlApi + 'vote',
            headers: {
              'Authorization': 'Bearer ' + res.data.token,
              'Content-Type': 'application/json'
            },
            data: {
              "valueVote": voteValue,
              "game": game._id
            }
          }).success(function(response) {
            for (var i = 0; i < $scope.gameToVoteList.length; i++) {
              if ($scope.gameToVoteList[i]._id == game._id) {
                $scope.gameToVoteList.splice(i, 1);
                break;
              }
            }
          })
          .error(function(err) {
            console.log(err);
          });
      });
    };

    $scope.loadVotesByUser = function() {
      DatabaseService.initDB();
      DatabaseService.getData("userData").then(function(res) {
        Vote.getVoteByUser(res.data.token).success(function(data) {
            $scope.voteList = data;

            $scope.loadGame();

          })
          .error(function(err) {

            console.log(err);
          });
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

    $scope.loadAllWorkingDay = function() {
      DatabaseService.initDB();
      DatabaseService.getData("userData").then(function(res) {
        Game.getAllWorkingDay(res.data.token).success(function(data) {
            $scope.workingDayList = data;
          })
          .error(function(err) {
            $scope.workingDayList = [];
            console.log(err);
          });
      });
    };

    $scope.buttonIKnowClick = function() {
      $scope.showTipsHowToVote = false;
    };
    $scope.$on('$ionicView.enter', function() {

      $scope.gameToVoteList = [];
      $scope.gameToVoteListByDate = [];
      $scope.voteList = [];
      $scope.gameVotedList = [];
      $scope.workingDayList = [];

      $scope.showTipsHowToVote = true;

      $scope.loadVotesByUser();
      $scope.loadAllWorkingDay();
    });

  })
