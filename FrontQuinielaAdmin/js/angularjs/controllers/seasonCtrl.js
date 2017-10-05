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

            $scope.addSeason = function () {

                if (!EsNuloVacio($scope.nameSeason) && !EsNuloVacio($scope.leagueSelected)) {
                    HandleDataService.addSeanson($scope.nameSeason, $scope.leagueSelected._id).success(function (data) {
                        $scope.pageload();
                        $scope.nameSeason = '';
                    }).error(function (err) {
                        console.log(err);
                    });
                }
            };

            $scope.updateLeague = function () {

                if(!EsNuloVacio($scope.leagueSelectedToUpdate) && !EsNuloVacio($scope.seasonToUpdateId)){

                    HandleDataService.updateLeague($scope.seasonToUpdateId, $scope.leagueSelectedToUpdate._id).success(function(data){

                        alert(data);
                        $scope.pageload();

                    }).error(function (err) {
                       console.log(err);
                    });

                }
            };

            $scope.cancelUpdateLeague = function(){
                $scope.showEditFrm = false;
                $scope.leagueSelectedToUpdate = {};
                $scope.seasonToUpdateId = '';
            };

            $scope.selectSeasonToUpdate = function(s){

                $scope.leagueSelectedToUpdate = $scope.leagueList[0];
                $scope.seasonToUpdateId = s._id;
                $scope.showEditFrm = true;
            };

            $scope.loadLeagues = function(){

                $scope.leagueList=[];
                HandleDataService.getAllLeagues().success(function(data){
                    $scope.leagueList = data;
                    $scope.leagueSelected = $scope.leagueList[0];
                }).error(function(err){
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
                $scope.showEditFrm = false;
                $scope.leagueSelectedToUpdate = {};
                $scope.seasonToUpdateId = '';
                $scope.loadSeasons();
                $scope.loadLeagues();
            };

            $scope.pageload();

        }
    ]);
