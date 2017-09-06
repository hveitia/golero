angular.module('QuinielaApp')

    .controller('LeagueCtrl', ['$scope', '$http', '$q', 'HandleDataService',
        function ($scope, $http, $q, HandleDataService) {


            $scope.loadLeagues = function () {

                HandleDataService.getAllLeagues().success(function (data) {

                    $scope.leagueList = data;

                    for (var i = 0; i < $scope.leagueList.length; i++) {

                        $scope.leagueList[i].logoUrl = urlApi + 'getLeagueLogo/' + $scope.leagueList[i].logo;
                    }
                })
                    .error(function (err) {
                        console.log(err);
                    });

            };

            $scope.addLeague = function () {

                if (!EsNuloVacio($scope.nameLeague) && !EsNuloVacio($scope.logoLeague)) {

                    HandleDataService.addLeague($scope.nameLeague, $scope.logoLeague).success(function (data) {

                        $scope.pageload();
                        $scope.nameLeague = '';
                        $scope.logoLeague = '';

                    }).error(function (err) {
                        console.log(err);
                    });
                }
            };


            $scope.pageload = function () {

                $scope.leagueList = [];
                $scope.loadLeagues();
            };

            $scope.pageload();

        }
    ]);
