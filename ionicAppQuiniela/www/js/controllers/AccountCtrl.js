angular.module('QuinielaIonicApp')


  .controller('AccountCtrl', function($scope, $stateParams, UserService, DatabaseService) {



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

    $scope.$on('$ionicView.enter', function() {
      $scope.loadUserData();
    });
  });
