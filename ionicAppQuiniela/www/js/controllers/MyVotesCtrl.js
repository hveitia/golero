angular.module('QuinielaIonicApp')
  .controller('MyVotesCtrl', function ($scope, $http, $ionicScrollDelegate, $state, $ionicPlatform, $ionicPopup, Game, Vote, DatabaseService, StorageService) {

    $scope.urlApi = urlApi;

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

      var idList = [];
      for (var i = 0; i < $scope.voteList.length; i++) {
        idList.push($scope.voteList[i].game);
      }

      Game.findGameByIdMany(idList).success(function (data) {

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

        $scope.gameVotedListAll = $scope.gameVotedList;
        $scope.loadLeagues();

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

    $scope.loadLeagues = function () {

      Game.getAllLeagues().success(function (data) {

        $scope.serieALeague = data.filter(function (x) {
          return x.name.indexOf('Copa Pilsener') > -1;
        })[0];

        $scope.championLeague = data.filter(function (x) {
          return x.name.indexOf('UEFA') > -1;
        })[0];

        $scope.gameVotedList = $scope.gameVotedListAll.filter(function (x) {
          return x.league._id == $scope.serieALeague._id;
        });

        $scope.loading = false;
        $scope.resumeAction();
      }).error(function (err) {

      });

    };

    $scope.championClick = function () {

      $scope.serieAClass = 'imagenGrayScale';
      $scope.championClass = '';
      $scope.activeLeague = 'CH';
      $scope.gameVotedList = $scope.gameVotedListAll.filter(function (x) {
        return x.league._id == $scope.championLeague._id;
      });

    };

    $scope.serieAClick = function () {

      $scope.serieAClass = '';
      $scope.championClass = 'imagenGrayScale';
      $scope.activeLeague = 'SA';
      $scope.gameVotedList = $scope.gameVotedListAll.filter(function (x) {
        return x.league._id == $scope.serieALeague._id;
      });

    };

    $scope.resumeAction = function(){

      switch ($scope.activeLeague){
        case  'SA':{
          $scope.serieAClick();
        }break;
        case 'CH':{
          $scope.championClick();
        }break;
        default :
          $scope.serieAClick();
      }

    };

    $scope.$on('$ionicView.enter', function () {
      $scope.loading = false;
      $scope.showTipsHowToEdit = StorageService.getItem('showTipsHowToEdit') == null;
      $scope.voteList = [];
      $scope.gameVotedList = [];
      $scope.deleting = false;
      $scope.serieAClass = '';
      $scope.championClass = 'imagenGrayScale';
      $ionicScrollDelegate.scrollTop();
      $scope.loadVotesByUser();

      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {
          $ionicPopup.confirm({
            title: textConectionLost.title,
            template: textConectionLost.text,
            buttons: [
              {
                text: 'Reintentar', type: 'button-positive', onTap: function (e) {
                $state.go('tab.dash');
              }
              }]
          });
        }
      }

    });


  });
