angular.module('QuinielaIonicApp')
  .controller('PronosticarCtrl', function($scope, $http, $q, Game, Vote, $stateParams, $ionicPopup, $state, DatabaseService) {

    $scope.gameToVoteList = [];
    $scope.voteList = [];
    $scope.gameVotedList = [];


    $scope.loadGame = function() {
      DatabaseService.initDB();
      DatabaseService.getData("userData").then(function(res) {
        Game.getGameToVote(res.data.token).success(function(data) {

            $scope.gameToVoteList = data;

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

            $scope.getGameVoted();
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

    $scope.getGameVoted = function() {
      DatabaseService.initDB();
      DatabaseService.getData("userData").then(function(res) {
        Game.getAllGames(res.data.token).success(function(data) {

            for (var i = 0; i < data.length; i++) {
              for (var j = 0; j < $scope.voteList.length; j++) {
                if ($scope.voteList[j].game == data[i]._id) {

                  if (data[i].especialDate) {
                    data[i].date = data[i].especialDate;
                  } else {
                    data[i].date = data[i].workingDay.date;
                  }
                  $scope.gameVotedList.push(data[i]);
                  $scope.voteList.splice(i, 1);

                }
              }
            }
          })
          .error(function(err) {
            $scope.gameVotedList = [];
            console.log(err);
          });
      });
    };

    $scope.pageLoad = function() {

      $scope.loadVotesByUser();

    };

    $scope.pageLoad();
  })
