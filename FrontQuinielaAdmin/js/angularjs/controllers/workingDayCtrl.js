angular.module('QuinielaApp')

  .controller('WorkingDayCtrl', ['$scope', '$http', '$q', 'HandleDataService',
    function($scope, $http, $q, HandleDataService) {


      $scope.seasonList = [];
      $scope.workinDayList = [];
      $scope.workinDayName = 1;
      $scope.workinDayDate = new Date();

      $scope.pageload = function() {

        $scope.loadWorkingDays();
        $scope.loadSeasons();

      };

      $scope.loadSeasons = function() {
        HandleDataService.getAllSeansons().success(function(data) {
            $scope.seasonList = data;
            $scope.seasonSelected = data[0];

          })
          .error(function(err) {
            $scope.seasonList = [];
            console.log(err);
          });
      };

      $scope.loadWorkingDays = function() {
        HandleDataService.getAllWorkingDays().success(function(data) {
            $scope.workinDayList = data;

          })
          .error(function(err) {
            $scope.workinDayList = [];
            console.log(err);
          });
      };

      $scope.addWorkingDay = function() {

        var obj = {
          "date": $scope.workinDayDate,
          "season": $scope.seasonSelected._id,
          "name": $scope.workinDayName
        };

        HandleDataService.addWorkingDay(obj).success(function(data) {
            $scope.loadWorkingDays();
          })
          .error(function(err) {
            console.log(err);
          });
      };

      $scope.pageload();

    }
  ]);
