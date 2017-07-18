angular.module('QuinielaApp')

  .controller('TeamCtrl', ['$scope', '$http', '$q', 'HandleDataService',
    function($scope, $http, $q, HandleDataService) {

      $scope.pageload = function() {

        HandleDataService.getAllTeams().success(function(data) {
            $scope.teamsList = data;

            for(var i =0; i < $scope.teamsList.length; i++){

              $scope.teamsList[i].logoUrl  = urlApi + 'getTeamLogo/' + $scope.teamsList[i].logo;
            }

          $scope.teanName = '';

          })
          .error(function(err) {
            $scope.teamsList = [];
            console.log(err);
          });

      };

      $scope.editTeamClick = function (team) {

        $scope.teanName = team.name;
        $scope.id = team._id;

      };

      $scope.editTeamName = function(){
        HandleDataService.updateTeamName($scope.id,$scope.teanName).success(function (data) {

          $scope.teanName = '';
          $scope.id = '';

          $scope.pageload();

        }).error(function (err) {
          console.log(err);
        })
      };

      $scope.pageload();

    }
  ]);
