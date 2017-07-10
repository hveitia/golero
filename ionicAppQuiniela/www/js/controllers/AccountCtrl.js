angular.module('QuinielaIonicApp')


  .controller('AccountCtrl', function($scope, $state, $stateParams, $ionicPlatform, UserService, DatabaseService) {



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

    };

    $scope.showComoPronosticarClick = function () {

    };

    $scope.$on('$ionicView.enter', function() {
      $scope.loadUserData();

    });

    $ionicPlatform.on('resume', function(){
      $state.go('tab.dash');
    });
  });
