angular.module('QuinielaIonicApp')
  .controller('RankingCtrl', function ($scope, $timeout, $ionicModal, $ionicPopup, $ionicScrollDelegate, $state, $ionicPlatform,
                                       RankinService, DatabaseService, Vote, Game, UserService, StorageService) {

    $scope.urlApi = urlApi;
    $ionicModal.fromTemplateUrl('view-votes-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function (user) {
      $scope.userName = user.user;
      $scope.loading = true;
      $scope.gameVotedList = [];
      $scope.data = {};
      $scope.data.userFinded = '';
      $scope.data.avatar = user.avatar;
      $scope.data.favoriteTeam = user.favoriteTeam;
      $scope.data.points = user.points;
      $scope.modal.show();
      $scope.loadVotesByUser(user._id);
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    $scope.loadVotesByUser = function (user) {

      Vote.getVoteByUserAny(user).success(function (data) {

        $scope.voteList = data;

        $scope.getGameVoted();

      })
        .error(function (err) {

          console.log(err);
        });

    };

    $scope.getGameVoted = function () {
      $scope.gameVotedList = [];

      Game.getAllGames().success(function (data) {

        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < $scope.voteList.length; j++) {
            if ($scope.voteList[j].game == data[i]._id && data[i].state == 'UPDATED') {

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

              data[i].backGroundClass = $scope.getBackgroundVotesList($scope.voteList[j], data[i]);
              $scope.gameVotedList.push(data[i]);
              //$scope.voteList.splice(i, 1);
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

        if ($scope.gameVotedList.length > 0) $scope.gameVotedList[0].showDivid = true;
        $scope.loading = false;

      })
        .error(function (err) {
          $scope.gameVotedList = [];
          console.log(err);
        });

    };

    $scope.getBackgroundVotesList = function (vote, game) {

      //var acierto = '#190855';//azul
      //var noAcierto = '#ea905d';//naranja

      //var acierto = 'white';
      //var noAcierto = 'white';

      var acierto = 'green';
      var noAcierto = 'red';

      switch (vote.valueVote) {
        case '1':
        {
          if (game.goalsLocalTeam > game.goalsVisitorTeam)
            return acierto;
          return noAcierto;
        }
        case '2':
        {
          if (game.goalsLocalTeam < game.goalsVisitorTeam)
            return acierto;
          return noAcierto;
        }
        case '0':
        {
          if (game.goalsLocalTeam == game.goalsVisitorTeam)
            return acierto;
          return noAcierto;
        }
      }
    };

    $scope.loadRanking = function () {
      $scope.rankinList = [];
      $scope.loading = true;
      RankinService.getRanking().success(function (data) {
        $scope.rankinList = data;

        for (var i = 0; i < $scope.rankinList.length; i++) {
          switch (i) {
            case 0:
              $scope.rankinList[i].class = '#ffd700';
              break;
            case 1:
              $scope.rankinList[i].class = '#c0c0c0';
              break;
            case 2:
              $scope.rankinList[i].class = '#8c7853 ';
              break;
            default:
              $scope.rankinList[i].class = '#190855';
          }

          if (i > 2) {
            if ($scope.rankinList[i].lastPosition > i + 1) {
              $scope.rankinList[i].class = 'g';
            } else {
              if ($scope.rankinList[i].lastPosition < i + 1) {
                $scope.rankinList[i].class = 'r';
              }
              else {
                $scope.rankinList[i].class = 'y';
              }
            }
          }

          if ($scope.rankinList[i].user == StorageService.getItem('user')) {
            $scope.rankinList[i].backGroundClass = '#ddd';
          } else {
            $scope.rankinList[i].backGroundClass = '#fff';
          }
        }
        $scope.loading = false;
      })
        .error(function (err) {
          console.log(err);
        });

    };

    $scope.getUserByName = function () {

      if (!EsNuloVacio($scope.data.userFinded)) {

        UserService.getUserByName($scope.data.userFinded).success(function (data) {

          if (data == 'EMPTY') {
            $ionicPopup.alert({
              title: '¡Usuario no encontrado!',
              template: 'No se ha encontrado el usuario. Verifique el nombre. Tenga en cuenta mayúsculas y minúsculas.'
            });
          }
          else {
            $scope.data.userFinded = '';
            $scope.openModal(data);
          }

        }).error(function (err) {
          console.log(err);
        });

      }

    };

    $scope.$on('$ionicView.enter', function () {
      $scope.rankinList = [];
      $scope.loading = false;
      $scope.data = {};
      $scope.data.userFinded = '';
      $scope.data.favoriteTeam = 'noteam.png';
      $ionicScrollDelegate.scrollTop();
      $scope.voteList = [];
      $scope.gameVotedList = [];
      $scope.loadRanking();

      if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
          $ionicPopup.confirm({
            title: textConectionLost.title,
            template: textConectionLost.text,
            buttons: [
              {
                text: 'Reintentar', type: 'button-positive', onTap: function (e) {$state.go('tab.dash');}
              }]
          });
        }
      }

    });

    /*$ionicPlatform.on('resume', function () {
      $state.go('tab.dash');
    });*/

  });
