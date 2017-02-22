angular.module('QuinielaIonicApp')
  .controller('RankingCtrl', function($scope, $timeout,
    RankinService, DatabaseService) {


    $scope.loadRanking = function() {
      $scope.rankinList = [];
      DatabaseService.initDB();
      DatabaseService.getData("userData").then(function(res) {
        RankinService.getRanking(res.data.token).success(function(data) {
            $scope.rankinList = data;

            for (var i = 0; i < $scope.rankinList.length; i++) {
              switch (i) {
                case 0:
                  $scope.rankinList[i].class = '#ffd700';
                  break;
                case 1:
                  $scope.rankinList[i].class = '#c0c0c0';
                  break;
                case 2:
                  $scope.rankinList[i].class = '#8c7853 ';
                  break;
                default:
                  $scope.rankinList[i].class = 'darkblue';
              }

              if ($scope.rankinList[i].user == res.data.userName) {
                $scope.rankinList[i].backGroundClass = '#ddd';
              } else {
                $scope.rankinList[i].backGroundClass = '#fff';
              }

            }
          })
          .error(function(err) {
            console.log(err);
          });
      });

    };

    $scope.$on('$ionicView.enter', function() {

      $scope.rankinList = [];
      $scope.loadRanking();
    });

  })
