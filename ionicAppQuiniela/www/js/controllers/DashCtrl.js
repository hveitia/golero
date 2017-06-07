angular.module('QuinielaIonicApp')

  .controller('DashCtrl', function($scope, $state, $ionicModal, $ionicPopup, $http, $q,
    Vote, DatabaseService, RankinService, UserService, StorageService) {

    $ionicModal.fromTemplateUrl('select-team-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
      $scope.modalAvatar.remove();
    });

    $ionicModal.fromTemplateUrl('select-avatar-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalAvatar = modal;
    });
    $scope.openModalAvatar = function() {
      $scope.modalAvatar.show();
    };
    $scope.closeModalAvatar = function() {
      $scope.modalAvatar.hide();
    };

    $ionicModal.fromTemplateUrl('roler-user-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalRoler = modal;
    });
    $scope.openModalRoler = function() {
      $scope.modalRoler.show();
    };
    $scope.closeModalRoler = function() {
      $scope.modalRoler.hide();
    };

    $scope.goToRanking = function() {
      $state.go('tab.ranking');
    };

    $scope.goToMyVotes = function() {
      $state.go('tab.myVotes');
    };

    $scope.loadVotesByUser = function() {

      $scope.userName = StorageService.getItem('user');
      Vote.getVoteByUser().success(function(data) {
          $scope.voteList = data;
        })
        .error(function(err) {
          console.log(err);
        });
    };

    $scope.loadactiveVotesByUser = function() {

      Vote.getActiveVotesByUser().success(function(data) {
          $scope.activeVotes = data;
        })
        .error(function(err) {
          console.log(err);
        });
    };

    $scope.loadUserData = function(roler) {

      UserService.getUser().success(function(data) {
          $scope.user = data;
          if (roler) {
            $scope.user.favoriteTeam = teamRoler;
            $scope.user.avatar = avatarRoler;
          }

        })
        .error(function(err) {
          console.log(err);
        });

    };

    $scope.loadRankingPosition = function() {

      RankinService.getRankingPosition().success(function(data) {
          $scope.rankingPosition = data.pos;
          $scope.points = data.points;
        })
        .error(function(err) {
          console.log(err);
        });

    };

    $scope.editFAvoriteTeam = function(team, enroler) {

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
        }).success(function(response) {

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
        .error(function(err) {
          console.log(err);
        });

    };

    $scope.editAvatar = function(avatar, enroler) {

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
        }).success(function(response) {

          if (enroler) {
            $scope.enroler = 'team';
            $scope.modalEnrolerTitle = 'Equipo Favorito';
            avatarRoler = avatar;
          } else {
            $scope.user.avatar = avatar;
            $scope.modalAvatar.hide();
          }

        })
        .error(function(err) {
          console.log(err);
        });

    };

    $scope.editName = function() {
      $scope.loading = true;
      $http({
          method: 'PUT',
          url: urlApi + 'editName',
          data: {
            "user": $scope.data.newName,
            "uuid": StorageService.getItem('password')
          }
        }).success(function(response) {
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
              .success(function(response) {
                $scope.loading = false;
                StorageService.setItem('token', response.token);
                StorageService.setItem('user', $scope.data.newName);
                $scope.enroler = 'avatar';
                $scope.modalEnrolerTitle = 'Avatar';

              })
              .error(function(err) {
                console.log(err);
              });
          }
        })
        .error(function(err) {
          console.log(err);
        });

    };

    $scope.cerrarSesion = function() {

      StorageService.setItem('usuario', null);
      StorageService.setItem('password', null);
      StorageService.setItem('token', null);
      StorageService.setItem('showTipsHowToVote', null);
      StorageService.setItem('showTipsHowToEdit', null);
      $state.go('login');

    };

    $scope.onSwipeLeft = function() {
      $state.go('tab.pronosticar');
    };

    $scope.$on('$ionicView.enter', function() {
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
        $scope.loadUserData();
        $scope.loadVotesByUser();
        $scope.loadRankingPosition();
        $scope.loadactiveVotesByUser();
      }

    });
  })
