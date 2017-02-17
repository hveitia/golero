angular.module('QuinielaIonicApp')

  .controller('DashCtrl', function($scope, $state, Vote, DatabaseService) {

    $scope.voteList = [];

    $scope.showMyVotes = function() {
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

    $scope.$on('$ionicView.enter', function() {
      $scope.voteList = [];
      $scope.loadVotesByUser();
    });
  })
