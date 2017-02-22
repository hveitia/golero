angular.module('QuinielaIonicApp')

  .controller('DashCtrl', function($scope, $state, $ionicModal, $http, $q,
    Vote, DatabaseService, RankinService, UserService) {

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

    $scope.goToRanking = function() {
      $state.go('tab.ranking');
    };

    $scope.goToMyVotes = function() {
      $state.go('tab.myVotes');
    };

    $scope.loadVotesByUser = function() {
      DatabaseService.initDB();
      DatabaseService.getData("userData").then(function(res) {
        $scope.userName = res.data.userName;
        Vote.getVoteByUser(res.data.token).success(function(data) {
            $scope.voteList = data;
          })
          .error(function(err) {
            console.log(err);
          });
      });

    };

    $scope.loadUserData = function() {
      DatabaseService.initDB();
      DatabaseService.getData("userData").then(function(res) {

        UserService.getUser(res.data.token).success(function(data) {
            $scope.user = data;
          })
          .error(function(err) {
            console.log(err);
          });
      });
    };

    $scope.loadRankingPosition = function() {
      DatabaseService.initDB();
      DatabaseService.getData("userData").then(function(res) {

        RankinService.getRankingPosition(res.data.token).success(function(data) {
            $scope.rankingPosition = data.pos;
            $scope.points = data.points;
          })
          .error(function(err) {
            console.log(err);
          });
      });
    };

    $scope.editFAvoriteTeam = function(team) {
      DatabaseService.initDB();
      DatabaseService.getData("userData").then(function(res) {
        $http({
            method: 'PUT',
            url: urlApi + 'editFavoriteTeam',
            headers: {
              'Authorization': 'Bearer ' + res.data.token,
              'Content-Type': 'application/json'
            },
            data: {
              "team": team
            }
          }).success(function(response) {
            $scope.user.favoriteTeam = team;
            $scope.modal.hide();
          })
          .error(function(err) {
            console.log(err);
          });
      });
    };
    $scope.editAvatar = function(avatar) {
      DatabaseService.initDB();
      DatabaseService.getData("userData").then(function(res) {
        $http({
            method: 'PUT',
            url: urlApi + 'editAvatar',
            headers: {
              'Authorization': 'Bearer ' + res.data.token,
              'Content-Type': 'application/json'
            },
            data: {
              "avatar": avatar
            }
          }).success(function(response) {
            $scope.user.avatar = avatar;
            $scope.modalAvatar.hide();
          })
          .error(function(err) {
            console.log(err);
          });
      });
    };
    $scope.$on('$ionicView.enter', function() {
      $scope.showNavBar = true;
      $scope.voteList = [];
      $scope.loadUserData();
      $scope.loadVotesByUser();
      $scope.loadRankingPosition();
    });
  })
