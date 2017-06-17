angular.module('QuinielaIonicApp')

  .controller('DashCtrl', function ($scope, $state, $ionicModal, $ionicPopup, $http, $q,
                                    Vote, Game,DatabaseService, RankinService, UserService, StorageService) {

    // --------- Modals zone  --------------

    $ionicModal.fromTemplateUrl('select-team-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    $ionicModal.fromTemplateUrl('select-avatar-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modalAvatar = modal;
    });
    $scope.openModalAvatar = function () {
      $scope.modalAvatar.show();
    };
    $scope.closeModalAvatar = function () {
      $scope.modalAvatar.hide();
    };

    $ionicModal.fromTemplateUrl('roler-user-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modalRoler = modal;
    });
    $scope.openModalRoler = function () {
      $scope.modalRoler.show();
    };
    $scope.closeModalRoler = function () {
      $scope.modalRoler.hide();
    };

    $ionicModal.fromTemplateUrl('view-votes-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modalViewVotes = modal;
    });
    $scope.openModalViewVotes = function () {
      $scope.modalViewVotes.show();
    };
    $scope.closeModalViewVotes  = function () {
      $scope.modalViewVotes.hide();
    };


    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
      $scope.modalAvatar.remove();
      $scope.modalRoler.remove();
      $scope.modalViewVotes.remove();
    });

    // --------- Modals zone  --------------

    // --------- Redirect zone  --------------

    $scope.goToRanking = function () {
      $state.go('tab.ranking');
    };

    $scope.goToMyVotes = function () {
      $state.go('tab.myVotes');
    };

    $scope.goToPronosticar = function () {
      $state.go('tab.pronosticar');
    };

    // --------- Redirect zone  --------------

    $scope.showTodayVote = function () {

      $scope.viewVotesHeader = 'Mis pronósticos para hoy';
      $scope.openModalViewVotes();
      $scope.loading = true;
      var idList = [];
      for (var i = 0; i < $scope.todayVoteList.length; i++) {
        idList.push($scope.todayVoteList[i].game._id);
      }

      Game.findGameByIdMany(idList).success(function (data) {
        $scope.gameToday = data;

        for(var i=0;i<$scope.gameToday.length;i++){
            for(var j=0;j<$scope.todayVoteList.length;j++){

              if($scope.gameToday[i]._id == $scope.todayVoteList[j].game._id){

                if ($scope.todayVoteList[j].valueVote == '1') {
                  $scope.gameToday[i].localTeamClass = 'animated zoomIn pronosticarList';
                  $scope.gameToday[i].visitoTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                  $scope.gameToday[i].tiedClass = 'fa fa-handshake-o fa-2x animated zoomIn imagenGrayScale';
                } else {
                  if ($scope.todayVoteList[j].valueVote == '2') {
                    $scope.gameToday[i].localTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                    $scope.gameToday[i].visitoTeamClass = 'animated zoomIn pronosticarList';
                    $scope.gameToday[i].tiedClass = 'fa fa-handshake-o fa-2x animated zoomIn imagenGrayScale';
                  } else {
                    $scope.gameToday[i].localTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                    $scope.gameToday[i].visitoTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                    $scope.gameToday[i].tiedClass = 'fa fa-handshake-o fa-2x animated zoomIn';
                  }
                }

              }


            }
        }

        $scope.loading = false;

      }).error(function (err) {
        console.log(err);
      });

    };

    $scope.showAllVotes = function () {

      $scope.viewVotesHeader = 'Todos mis pronósticos';
      $scope.openModalViewVotes();
      $scope.loading = true;
      var idList = [];
      for (var i = 0; i < $scope.voteList.length; i++) {
        idList.push($scope.voteList[i].game);
      }

      Game.findGameByIdMany(idList).success(function (data) {
        $scope.gameToday = data;

        for(var i=0;i<$scope.gameToday.length;i++){
          for(var j=0;j<$scope.voteList.length;j++){

            if($scope.gameToday[i]._id == $scope.voteList[j].game){

              if ($scope.voteList[j].valueVote == '1') {
                $scope.gameToday[i].localTeamClass = 'animated zoomIn pronosticarList';
                $scope.gameToday[i].visitoTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                $scope.gameToday[i].tiedClass = 'fa fa-handshake-o fa-2x animated zoomIn imagenGrayScale';
              } else {
                if ($scope.voteList[j].valueVote == '2') {
                  $scope.gameToday[i].localTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                  $scope.gameToday[i].visitoTeamClass = 'animated zoomIn pronosticarList';
                  $scope.gameToday[i].tiedClass = 'fa fa-handshake-o fa-2x animated zoomIn imagenGrayScale';
                } else {
                  $scope.gameToday[i].localTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                  $scope.gameToday[i].visitoTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                  $scope.gameToday[i].tiedClass = 'fa fa-handshake-o fa-2x animated zoomIn';
                }
              }

            }


          }
        }

        $scope.loading = false;

      }).error(function (err) {
        console.log(err);
      });




    };

    $scope.loadTodayVotes = function () {

      Vote.getTodayVotesByUser().success(function (data) {
        $scope.todayVoteList = data;
      })
        .error(function (err) {
          console.log(err);
        });
    };

    $scope.loadVotesByUser = function () {

      $scope.userName = StorageService.getItem('user');
      Vote.getVoteByUser().success(function (data) {
        $scope.voteList = data;
      })
        .error(function (err) {
          console.log(err);
        });
    };

    $scope.loadactiveVotesByUser = function () {

      Vote.getActiveVotesByUser().success(function (data) {
        $scope.activeVotes = data;
      })
        .error(function (err) {
          console.log(err);
        });
    };

    $scope.loadUserData = function (roler) {

      UserService.getUser().success(function (data) {
        $scope.user = data;
        if (roler) {
          $scope.user.favoriteTeam = teamRoler;
          $scope.user.avatar = avatarRoler;
        }

      })
        .error(function (err) {
          console.log(err);
        });

    };

    $scope.loadRankingPosition = function () {

      RankinService.getRankingPosition().success(function (data) {
        $scope.rankingPosition = data.pos;
        $scope.points = data.points;
      })
        .error(function (err) {
          console.log(err);
        });

    };

    $scope.editFAvoriteTeam = function (team, enroler) {

      $http({
        method: 'PUT',
        url: urlApi + 'editFavoriteTeam',
        headers: {
          'Authorization': 'Bearer ' + StorageService.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: {
          "team": team
        }
      }).success(function (response) {

        if (enroler) {
          StorageService.setItem('showRolerWizard', false);
          teamRoler = team;
          $scope.voteList = [];
          $scope.loadUserData(true);
          $scope.loadVotesByUser();
          $scope.loadRankingPosition();
          $scope.closeModalRoler();
          $scope.loadactiveVotesByUser();

        } else {
          $scope.user.favoriteTeam = team;
          $scope.modal.hide();
        }

      })
        .error(function (err) {
          console.log(err);
        });

    };

    $scope.editAvatar = function (avatar, enroler) {

      $http({
        method: 'PUT',
        url: urlApi + 'editAvatar',
        headers: {
          'Authorization': 'Bearer ' + StorageService.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: {
          "avatar": avatar
        }
      }).success(function (response) {

        if (enroler) {
          $scope.enroler = 'team';
          $scope.modalEnrolerTitle = 'Equipo Favorito';
          avatarRoler = avatar;
        } else {
          $scope.user.avatar = avatar;
          $scope.modalAvatar.hide();
        }

      })
        .error(function (err) {
          console.log(err);
        });

    };

    $scope.editName = function () {
      $scope.loading = true;
      $http({
        method: 'PUT',
        url: urlApi + 'editName',
        data: {
          "user": $scope.data.newName,
          "uuid": StorageService.getItem('password')
        }
      }).success(function (response) {
        if (response.message) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: returnApiCodes[response.message]
          });
          $scope.loading = false;
        } else {
          $http.post(urlApi + 'authenticate', {
            "user": $scope.data.newName,
            "pass": StorageService.getItem('password')
          })
            .success(function (response) {
              $scope.loading = false;
              StorageService.setItem('token', response.token);
              StorageService.setItem('user', $scope.data.newName);
              $scope.enroler = 'avatar';
              $scope.modalEnrolerTitle = 'Avatar';

            })
            .error(function (err) {
              console.log(err);
            });
        }
      })
        .error(function (err) {
          console.log(err);
        });

    };

    $scope.cerrarSesion = function () {

      StorageService.setItem('usuario', null);
      StorageService.setItem('password', null);
      StorageService.setItem('token', null);
      StorageService.setItem('showTipsHowToVote', null);
      StorageService.setItem('showTipsHowToEdit', null);
      $state.go('login');

    };

    $scope.onSwipeLeft = function () {
      $state.go('tab.pronosticar');
    };

    $scope.$on('$ionicView.enter', function () {
      $scope.showNavBar = true;
      $scope.data = {};
      $scope.activeVotes = 0;

      if (StorageService.getItem('showRolerWizard')) {
        var teamRoler = '';
        var avatarRoler = '';
        $scope.loading = false;
        $scope.openModalRoler();
        $scope.enroler = 'name';
        $scope.modalEnrolerTitle = 'Nombre';

      } else {
        $scope.voteList = [];
        $scope.todayVoteList = [];
        $scope.loadUserData();
        $scope.loadVotesByUser();
        $scope.loadRankingPosition();
        $scope.loadactiveVotesByUser();
        $scope.loadTodayVotes();
      }

    });
  });
