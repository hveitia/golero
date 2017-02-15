angular.module('QuinielaAppLogin', ['ngRoute', 'angular-md5'])


  .controller('LoginCtrl', ['$scope', '$http', '$q', '$window', 'md5',
    function($scope, $http, $q, $window, md5) {

      $scope.data = {};
      $scope.pageload = function() {

      };

      $scope.autenticate = function() {

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
              SetLocalStorage('isLogued', true);
              SetLocalStorage('userToken', response.token);
              $window.location = 'index.html';
            }

          })
          .error(function(err) {
            console.log(err);
          });


      };

      $scope.pageload();

    }
  ]);
