/**
 * Created by hveitia on 8/2/17.
 */

angular.module('QuinielaIonicApp')
  .controller('LostConnectionCtrl', function ($scope, $interval, $ionicPopup, $state, $ionicPlatform) {


    $scope.$on('$ionicView.enter', function () {

      $scope.textConection();

    });

    $scope.textConection = function () {
      if (window.Connection) {
        if (navigator.connection.type != Connection.NONE) {
          $state.go('tab.dash');
        }
      }
    };

    /*$ionicPlatform.on('resume', function () {
      $state.go('tab.dash');
    });*/

    $interval($scope.textConection, 1000);

  });

