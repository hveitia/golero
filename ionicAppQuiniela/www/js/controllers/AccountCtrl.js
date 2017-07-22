angular.module('QuinielaIonicApp')
  .controller('AccountCtrl', function ($scope, $interval, $state, $stateParams, $ionicPlatform, $ionicModal,
                                       UserService, DatabaseService, Text) {

    $ionicModal.fromTemplateUrl('view-texts-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function (key) {
      $scope.modal.show();
      $scope.getTextsByKey(key);
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    $scope.loadUserData = function () {
      DatabaseService.initDB();
      DatabaseService.getData("userData").then(function (res) {

        UserService.getUser(res.data.token).success(function (data) {
          $scope.user = data;
        })
          .error(function (err) {
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
      $scope.openModal('comoJugar');
    };

    $scope.showComoPronosticarClick = function () {
      $scope.openModal('comoPronosticar');
    };

    $scope.getTextsByKey = function (key) {
      $scope.loading = true;
      Text.getTextsByKey(key).success(function (data) {
        $scope.textToShow = data[0].text;
        $scope.modalTitle = data[0].title;

        $scope.parrafosList = $scope.textToShow.split('<p>');
        $scope.loading = false;
      }).error(function (err) {
        console.log(err);
      })
    };

    $scope.nextSlide = function () {
      $scope.index++;
      $scope.imgUrl = $scope.imgUrlsList[0];

      if ($scope.index == 4)
        $scope.index = 0;
    };

    $scope.loadSlideImages = function () {

      for (var i = 0; i < 5; i++) {
        $scope.imgUrlsList.push('http://via.placeholder.com/375x150?text=Slide' + i);
      }

      $scope.imgUrl = $scope.imgUrlsList[0];
    };

    $scope.imgUrlsList = [];
    $scope.index = 0;
    $scope.imgUrl = './img/Slide1.jpg';
    //$scope.loadSlideImages();
    //$interval($scope.nextSlide, 1000);

    $scope.$on('$ionicView.enter', function () {
      //$scope.loadUserData();

    });

  });
