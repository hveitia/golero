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

      $scope.pageload();

    }
  ]);
