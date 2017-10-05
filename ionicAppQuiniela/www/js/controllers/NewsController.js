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
      $scope.newsImage = item.image;
      $scope.newsText = item.description;
      $scope.newsTitle = item.title;
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

    $scope.goToHome = function () {

      $scope.loading = true;
      $scope.loadingMarca = true;
      $state.go('tab.dash');
    };


    $scope.loadNews = function () {

      var urlToRead = 'http://www.elcomercio.com/rss/deportes';

      var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cenclosure%2Cdescription%20from%20rss%20where%20url%3D%22' + encodeURIComponent(urlToRead) + '%22&format=json';

      $http({
        method: 'GET',
        url: url
      }).success(function (data) {

        $scope.newsList = (data && data.query && data.query.results && data.query.results.item) ? data.query.results.item : undefined;

        if ($scope.newsList) {
          angular.forEach($scope.newsList, function (v, k) {

            v.image = (v.enclosure && v.enclosure.url) ? v.enclosure.url : './img/logoComercion.jpeg';
            v.fuente = 'El Comercio';

          });

          $scope.loading = false;
          $scope.comercionNews = $scope.newsList;
          $scope.loadNewsMarca();
        } else {
          $scope.loading = false;
        }
      }).error(function (err) {
        $scope.loading = false;
        console.log(err);
      });

    };

    $scope.loadNewsMarca = function () {

      $scope.loadingMarca = true;
      var urlToRead = 'http://estaticos.marca.com/rss/portada.xml';
      var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22' + encodeURIComponent(urlToRead) + '%22&format=json';

      $http({
        method: 'GET',
        url: url
      }).success(function (data) {

        var arrayNews = [];

        var array = (data && data.query && data.query.results && data.query.results.item) ? data.query.results.item : undefined;
        if (array) {
          angular.forEach(array, function (v, k) {

            if (v.content && parseInt(v.content.width) > 300) {
              arrayNews.push({
                title: v.title[0],
                image: v.content && v.content.url ? v.content.url : 'http://e00-marca.uecdn.es/assets/v1/img/logo-marca.svg',
                description: v.description[1].content,
                link: v.link,
                fuente: 'Marca'
              });
            }

          });

          $scope.marcaNews = arrayNews.filter(function (x) {
            return !EsNuloVacio(x.image);
          });
          $scope.loadingMarca = false;
        } else {
          $scope.loadingMarca = false;
        }
      }).error(function (err) {
        $scope.loadingMarca = false;
        console.log(err);
      });

    };

    $scope.showMarcaNews = function () {
      $scope.newsList = $scope.marcaNews;
      $scope.marcaClass = '';
      $scope.comercioClass = 'imagenGrayScale';
    };

    $scope.showComercioNews = function () {
      $scope.newsList = $scope.comercionNews;
      $scope.marcaClass = 'imagenGrayScale';
      $scope.comercioClass = '';
    };

    $scope.$on('$ionicView.enter', function () {

      $scope.newsList = [];
      $ionicScrollDelegate.scrollTop();
      $scope.loading = true;
      $scope.marcaClass = 'animated zoomIn imagenGrayScale';
      $scope.comercioClass = 'animated zoomIn';
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

  });
