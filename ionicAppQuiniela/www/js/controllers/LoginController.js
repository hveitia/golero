angular.module('QuinielaIonicApp')


  .controller('LoginController', function($scope, $http, $stateParams, $ionicPopup, $state, md5, DatabaseService) {

    $scope.data = {};
    $scope.showView = 'HOME';
    $scope.title = '';

    $scope.login = function() {

      $http.post(urlApi + 'authenticate', {
          "user": $scope.data.username,
          "pass": md5.createHash($scope.data.password || '')
        })
        .success(function(response) {

          if (!response.success) {
            var alertPopup = $ionicPopup.alert({
              title: 'Ingreso Fallido',
              template: returnApiCodes[response.message]
            });

          } else {
            var objDatosUsuario = {
              "token": response.token
            };
            DatabaseService.initDB();
            DatabaseService.addData("userData", objDatosUsuario);
            $state.go('tab.dash');
          }

        })
        .error(function(err) {
          console.log(err);
        });

    }

    $scope.addUser = function() {
      if ($scope.data.password != $scope.data.passwordConfirm) {
        var alertPopup = $ionicPopup.alert({
          title: 'Contraseña incorrecta!',
          template: 'Por favor chequear que coincidan la contraseña y la confirmación.'
        });
      } else {
        if ($scope.registerValidate()) {
          $http.post(urlApi + 'user', {
              "user": $scope.data.username,
              "pass": md5.createHash($scope.data.password || ''),
              "email": $scope.data.email
            })
            .success(function(response) {

              if (response.message) {
                var alertPopup = $ionicPopup.alert({
                  title: 'Error!',
                  template: returnApiCodes[response.message]
                });
              } else {
                $state.go('tab.dash');
              }

            })
            .error(function(err) {
              console.log(err);
            });
        } else {
          var alertPopup = $ionicPopup.alert({
            title: 'Campos vacíos!',
            template: 'Por favor chequear que no existen campos vacíos.'
          });
        }
      }
    };

    $scope.creatAccountButtonClick = function() {
      $scope.showView = 'REG';
      $scope.title = 'Crear Cuenta';
    };

    $scope.backButtonClick = function() {
      $scope.showView = 'HOME';
      $scope.title = '';
    };

    $scope.registerValidate = function() {
      if (!$scope.data.username ||
        !$scope.data.email ||
        !$scope.data.password ||
        $scope.data.username.trim() == "" ||
        $scope.data.email.trim() == "") {
        return false;
      }
      return true;
    };

    $scope.cerrarSesion = function() {
      DatabaseService.initDB();
      DatabaseService.getData("userData").then(function(res) {
        DatabaseService.deleteData(res);
      });
    };

    $scope.$on('$ionicView.enter', function() {
      $scope.cerrarSesion();

    });

  });
