angular.module('QuinielaApp')

  .controller('UserCtrl', ['$scope', '$http', '$q', 'HandleDataService',
    function($scope, $http, $q, HandleDataService) {

      $scope.pageload = function() {

        $scope.loadRegisteredUsers();

      };

      $scope.loadRegisteredUsers = function() {
        HandleDataService.getRegisteredUsers().success(function(data) {
            $scope.registeredUsers = data;
          })
          .error(function(err) {
            $scope.registeredUsers = [];
            console.log(err);
          });
      };

      $scope.deleteUserClick = function(user) {
        $scope.idDelete = user._id;
      };

      $scope.canceldeleteUser = function() {
        $scope.idDelete = '';
      };

      $scope.cancelResetAllUsers = function(){

      };

      $scope.resetAllUsers = function () {
        HandleDataService.resetUserPointsAll().success(function (data) {
          $scope.pageload();
        }).error(function(err){
          console.log(err);
        });

      };

      $scope.deleteUser = function() {

        if ($scope.idDelete != '') {
          HandleDataService.deleteUser($scope.idDelete).success(function(data) {
              $scope.pageload();
            })
            .error(function(err) {

              console.log(err);
            });
        }
      };

      $scope.pageload();

    }
  ]);
