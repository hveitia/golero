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

    $scope.cargarModalShare = function () {
      var message = {
        text: "Hola, te recomiendo descargar la aplicaci\u00F3n Golero y demuestra que eres el mejor atrapando balones.",
        url: "http://google.com"
      };
      window.socialmessage.send(message);
    };

    $scope.showComoJugarClick = function () {
      $scope.showComoJugar = !$scope.showComoJugar;
    };

    $scope.showComoPronosticarClick = function () {
      $scope.showComoPronosticar = !$scope.showComoPronosticar;
    };

    $scope.$on('$ionicView.enter', function() {
      $scope.loadUserData();
      $scope.showComoJugar = false;
      $scope.showComoPronosticar = false;
    });
  });
