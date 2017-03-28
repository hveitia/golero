angular.module('QuinielaIonicApp')


  .controller('LoginController', function($scope, $http, $stateParams, $ionicPopup, $state, md5,
    StorageService, $cordovaDevice) {



    $scope.login = function() {

      if ($scope.data.username && $scope.data.username != '' && $scope.data.password && $scope.data.password != '') {
        $http.post(urlApi + 'authenticate', {
            "user": $scope.data.username,
            "pass": $scope.data.password
          })
          .success(function(response) {

            if (!response.success) {
              var alertPopup = $ionicPopup.alert({
                title: 'Ingreso Fallido',
                template: returnApiCodes[response.message]
              });

            } else {
              StorageService.setItem('token', response.token);
              StorageService.setItem('user', $scope.data.username);
              StorageService.setItem('password', $scope.data.password);
              $state.go('tab.dash');
            }
          })
          .error(function(err) {
            console.log(err);
          });
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'Ingreso Fallido',
          template: 'Verifique que no existen campos vacíos.'
        });
      }
    }

    $scope.addUser = function() {
      if (!$scope.data.password) {
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

                StorageService.setItem('registred', true);
                $scope.showView = 'SUCCESS';
                $scope.title = '';
              }

            })
            .error(function(err) {
              console.log(err);
            });
        } else {
          var alertPopup = $ionicPopup.alert({
            title: 'Campos vacíos!',
            template: 'Por favor chequear que no existen campos vacíos. Además que el email esté correcto.'
          });
        }
      }
    };

    $scope.addUserUUDI = function(uuid) {

      $http.post(urlApi + 'register', {
          "pass": uuid
        })
        .success(function(response) {

          StorageService.setItem('password', uuid);
          StorageService.setItem('registred', true);
          StorageService.setItem('showRolerWizard', true);
          $state.go('tab.dash');

        })
        .error(function(err) {
          console.log(err);
        });
    };

    $scope.creatAccountButtonClick = function() {

      $scope.data = {};
      $scope.showView = 'REG';
      $scope.title = 'Crear Cuenta';

    };

    $scope.backButtonClick = function() {
      $scope.showView = 'HOME';
      $scope.title = '';
      $scope.data = {};
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

    document.addEventListener("deviceready", function() {

      var registred = StorageService.getItem('registred');
      if (!registred) {
        //$scope.addUserUUDI($cordovaDevice.getUUID());
      }


    }, false);

    $scope.$on('$ionicView.enter', function() {

      var user = StorageService.getItem('user');
      var pass = StorageService.getItem('password');
      var registred = StorageService.getItem('registred');

      $scope.data = {};

      if (registred) {

        $scope.data.username = user;
        $scope.data.password = pass;
        $scope.login();

      } else {
        $scope.addUserUUDI('uuid');
      }
    });

  });
