angular.module('QuinielaIonicApp')
  .controller('NewsController', function ($scope, $timeout, $ionicModal, $ionicPopup, $ionicScrollDelegate, $state, $ionicPlatform, $http) {

    $ionicModal.fromTemplateUrl('view-textsNews-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function (item) {
      $scope.modal.show();
      $scope.newsImage = item.enclosure.url;
      $scope.newsText =  item.description;
      $scope.newsTitle =  item.title;
      $scope.url = item.link;
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    $scope.openFullNews = function () {

      cordova.InAppBrowser.open($scope.url, '_system', 'location=yes');
    };

    $scope.loadNews = function () {

      var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cenclosure%2Cdescription%20from%20rss%20where%20url%3D%22' + encodeURIComponent('http://www.elcomercio.com/rss/deportes') + '%22&format=json';

      $http({
        method: 'GET',
        url: url
      }).success(function (data) {

        $scope.newsList = data.query.results.item;
        $scope.loading = false;
      }).error(function (err) {
        $scope.loading = false;
        console.log(err);
      });

    };

    $scope.goToHome = function(){
      $state.go('tab.dash');
    };

    $scope.$on('$ionicView.enter', function () {

      $scope.newsList = [];
      $ionicScrollDelegate.scrollTop();
      $scope.loading = true;
      $scope.loadNews();



      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {
          $ionicPopup.confirm({
            title: textConectionLost.title,
            template: textConectionLost.text,
            buttons: [
              {
                text: 'Reintentar', type: 'button-positive', onTap: function (e) {
                $state.go('tab.dash');
              }
              }]
          });
        }
      }

    });

    $ionicPlatform.on('resume', function () {
      $state.go('tab.dash');
    });

  });
