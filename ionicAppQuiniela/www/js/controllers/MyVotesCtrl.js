angular.module('QuinielaIonicApp')
  .controller('MyVotesCtrl', function ($scope, $http, $ionicScrollDelegate, $state, $ionicPlatform, Game, Vote, DatabaseService, StorageService) {

    $scope.loadVotesByUser = function () {

      $scope.loading = true;

      Vote.getVoteByUser().success(function (data) {
        $scope.voteList = data;

        $scope.getGameVoted();

      })
        .error(function (err) {

          console.log(err);
        });
    };

    $scope.updateVote = function (game, voteValue) {

      for (var i = 0; i < $scope.voteList.length; i++) {
        if ($scope.voteList[i].game == game._id) {
          $http({
            method: 'PUT',
            url: urlApi + 'vote/' + $scope.voteList[i]._id,
            headers: {
              'Authorization': 'Bearer ' + StorageService.getItem('token'),
              'Content-Type': 'application/json'
            },
            data: {
              "valueVote": voteValue
            }
          }).success(function (response) {
            $scope.voteList = [];
            $scope.gameVotedList = [];
            $scope.deleting = false;
            $scope.loadVotesByUser();
          })
            .error(function (err) {
              console.log(err);
            });
        }
      }


    };

    $scope.getGameVoted = function () {
      $scope.gameVotedList = [];

      Game.getAllGames().success(function (data) {

        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < $scope.voteList.length; j++) {
            if ($scope.voteList[j].game == data[i]._id && data[i].state == 'SCHEDULED' && canShowVote(data[i])) {

              if (data[i].especialDate) {
                data[i].date = data[i].especialDate;
              } else {
                data[i].date = data[i].workingDay.date;
              }
              if ($scope.voteList[j].valueVote == '1') {
                data[i].localTeamClass = 'animated zoomIn pronosticarList';
                data[i].visitoTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                data[i].tiedClass = 'fa fa-handshake-o fa-2x animated zoomIn imagenGrayScale';
              } else {
                if ($scope.voteList[j].valueVote == '2') {
                  data[i].localTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                  data[i].visitoTeamClass = 'animated zoomIn pronosticarList';
                  data[i].tiedClass = 'fa fa-handshake-o fa-2x animated zoomIn imagenGrayScale';
                } else {
                  data[i].localTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                  data[i].visitoTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                  data[i].tiedClass = 'fa fa-handshake-o fa-2x animated zoomIn';
                }
              }
              $scope.gameVotedList.push(data[i]);
              $scope.voteList.splice(i, 1);
            }
          }
        }

        for (var i = 0; i < $scope.gameVotedList.length; i++) {
          if (i + 1 < $scope.gameVotedList.length) {
            if ($scope.gameVotedList[i].workingDay.name != $scope.gameVotedList[i + 1].workingDay.name) {
              $scope.gameVotedList[i + 1].showDivid = true;
            }
          }
        }

        if ($scope.gameVotedList.length > 0) {
          $scope.gameVotedList[0].showDivid = true;
        }
        $scope.loading = false;
      })
        .error(function (err) {
          $scope.gameVotedList = [];
          console.log(err);
        });

    };

    $scope.deleteVote = function (game) {

      $scope.loading = true;
      var idVote = '';

      for (var i = 0; i < $scope.voteList.length; i++) {
        if ($scope.voteList[i].game == game._id) {
          idVote = $scope.voteList[i]._id;
          break;
        }
      }

      Vote.deleteVote(idVote).success(function (data) {
        $scope.loading = false;
        $scope.showTipsHowToEdit = StorageService.getItem('showTipsHowToEdit') == null;
        $scope.voteList = [];
        $scope.gameVotedList = [];
        $scope.deleting = false;
        $ionicScrollDelegate.scrollTop();
        $scope.loadVotesByUser();
      })
        .error(function (err) {
          console.log(err);
        });

    };

    $scope.buttonIKnowClick = function () {
      StorageService.setItem('showTipsHowToEdit', true);
      $scope.showTipsHowToEdit = false;
    };

    $scope.shorDeleteIcon = function () {
      $scope.deleting = !$scope.deleting;
    };


    $scope.$on('$ionicView.enter', function () {
      $scope.loading = false;
      $scope.showTipsHowToEdit = StorageService.getItem('showTipsHowToEdit') == null;
      $scope.voteList = [];
      $scope.gameVotedList = [];
      $scope.deleting = false;
      $ionicScrollDelegate.scrollTop();
      $scope.loadVotesByUser();
    });


  });
