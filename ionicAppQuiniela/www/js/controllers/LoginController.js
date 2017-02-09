angular.module('QuinielaIonicApp')


  .controller('LoginController', function($scope, $http, Accounts, $stateParams, LoginService, $ionicPopup, $state, md5) {

    $scope.data = {};
    $scope.showView = 'REG';
    $scope.title = 'Registrar';

    $scope.login = function() {

      $state.go('tab.dash');
      /*LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
        $state.go('tab.dash');
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });*/
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

  });
