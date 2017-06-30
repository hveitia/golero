angular.module('QuinielaApp')

  .controller('LogCtrl', ['$scope', '$http', '$q', 'HandleDataService',
    function($scope, $http, $q, HandleDataService) {

      $scope.pageload = function() {

        $scope.loadLogs();

      };

      $scope.loadLogs = function() {
        HandleDataService.getLogs().success(function(data) {
            $scope.logsList = data;
          })
          .error(function(err) {
            $scope.logsList = [];
            console.log(err);
          });
      };

      $scope.pageload();

    }
  ]);
