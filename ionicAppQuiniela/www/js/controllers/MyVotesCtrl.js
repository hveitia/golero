angular.module('QuinielaIonicApp')
  .controller('MyVotesCtrl', function($scope, $http, $q, Game, Vote, $stateParams, $ionicPopup, $state, DatabaseService) {

    $scope.loadVotesByUser = function() {

      DatabaseService.initDB();
      DatabaseService.getData("userData").then(function(res) {
        Vote.getVoteByUser(res.data.token).success(function(data) {
            $scope.voteList = data;

            $scope.getGameVoted();

          })
          .error(function(err) {

            console.log(err);
          });
      });
    };

    $scope.getGameVoted = function() {
      $scope.gameVotedList = [];
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

                  if ($scope.voteList[j].valueVote == '1') {
                    data[i].localTeamClass = "itemLocalTem animated zoomIn";
                    data[i].visitoTeamClass = 'animated zoomIn visitorTeamImg imagenGrayScale';
                    data[i].tiedClass = 'fa fa-times-circle fa-3x animated zoomIn imagenGrayScale';
                  } else {
                    if ($scope.voteList[j].valueVote == '2') {
                      data[i].localTeamClass = "itemLocalTem animated zoomIn imagenGrayScale";
                      data[i].visitoTeamClass = 'animated zoomIn visitorTeamImg';
                      data[i].tiedClass = 'fa fa-times-circle fa-3x animated zoomIn imagenGrayScale';
                    } else {
                      data[i].localTeamClass = "itemLocalTem animated zoomIn imagenGrayScale";
                      data[i].visitoTeamClass = 'animated zoomIn visitorTeamImg imagenGrayScale';
                      data[i].tiedClass = 'fa fa-times-circle fa-3x animated zoomIn';
                    }
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

    $scope.$on('$ionicView.enter', function() {

      $scope.voteList = [];
      $scope.gameVotedList = [];
      $scope.loadVotesByUser();
    });


  })
