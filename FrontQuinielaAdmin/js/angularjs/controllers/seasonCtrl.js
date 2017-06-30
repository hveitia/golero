angular.module('QuinielaApp')

    .controller('SeasonCtrl', ['$scope', '$http', '$q', 'HandleDataService',
        function ($scope, $http, $q, HandleDataService) {


            $scope.loadSeasons = function () {

                HandleDataService.getAllSeansons().success(function (data) {
                    $scope.seasonList = data;
                })
                    .error(function (err) {
                        $scope.registeredUsers = [];
                        console.log(err);
                    });

            };

            $scope.activateUnactivateSeason = function (season, activate) {

                season.active = activate;

                HandleDataService.activateUnactivateSeason(season).success(function (data) {
                    $scope.pageload();
                }).error(function (err) {
                    console.log(err);
                });
            };

            $scope.pageload = function () {
                $scope.seasonList = [];
                $scope.loadSeasons();
            };

            $scope.pageload();

        }
    ]);
