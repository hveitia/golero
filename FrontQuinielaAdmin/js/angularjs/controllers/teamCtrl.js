angular.module('QuinielaApp')

  .controller('TeamCtrl', ['$scope', '$http', '$q', 'HandleDataService',
    function($scope, $http, $q, HandleDataService) {

      $scope.pageload = function() {

        HandleDataService.getAllTeams().success(function(data) {
            $scope.teamsList = data;
          })
          .error(function(err) {
            $scope.teamsList = [];
            console.log(err);
          });

      };

      $scope.pageload();

    }
  ]);
