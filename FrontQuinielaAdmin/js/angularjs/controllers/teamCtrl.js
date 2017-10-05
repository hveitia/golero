angular.module('QuinielaApp')

    .controller('TeamCtrl', ['$scope', '$http', '$q', 'HandleDataService',
        function ($scope, $http, $q, HandleDataService) {

            $scope.pageload = function () {

                $scope.showEditFrm = false;
                $scope.loadLeagues();

                HandleDataService.getAllTeams().success(function (data) {
                    $scope.teamsList = data;

                    for (var i = 0; i < $scope.teamsList.length; i++) {

                        $scope.teamsList[i].logoUrl = urlApi + 'getTeamLogo/' + $scope.teamsList[i].logo;
                    }

                    $scope.teanName = '';

                })
                    .error(function (err) {
                        $scope.teamsList = [];
                        console.log(err);
                    });

            };

            $scope.editTeamClick = function (team) {

                $scope.teanName = team.name;
                $scope.id = team._id;

            };

            $scope.addTeamClick = function () {

                $scope.showFrmNew = true;
                $scope.teamNameNew = '';
                $scope.teamLogoNew = '';
                $scope.leagueSelectedToUpdateNew = $scope.leagueList[0];

            };

            $scope.addTeamCancel = function () {

                $scope.showFrmNew = false;

            };

            $scope.addTeam = function () {

                if (!EsNuloVacio($scope.teamNameNew) && !EsNuloVacio($scope.teamLogoNew) && !EsNuloVacio($scope.leagueSelectedToUpdateNew._id)) {

                    var team = {
                        name: $scope.teamNameNew,
                        logo: $scope.teamLogoNew,
                        league: $scope.leagueSelectedToUpdateNew._id
                    };

                    HandleDataService.addTeam(team).success(function (data) {

                        alert('ok');

                        $scope.pageload();

                    }).error(function (err) {
                        console.log(err);
                    });
                }
                else{
                    alert('Campos vacios');
                }
            };

            $scope.loadLeagues = function () {

                $scope.leagueList = [];
                HandleDataService.getAllLeagues().success(function (data) {
                    $scope.leagueList = data;
                    $scope.leagueSelected = $scope.leagueList[0];
                    $scope.leagueSelectedToUpdateNew = $scope.leagueList[0];
                }).error(function (err) {
                    console.log(err);
                });
            };

            $scope.editTeamLeagueClick = function (team) {
                $scope.showEditFrm = true;
                $scope.teanName = team.name;
                $scope.leagueSelectedToUpdate = $scope.leagueList[0];
                $scope.teamToUpdateId = team._id;
            };

            $scope.cancelUpdateLeague = function () {
                $scope.showEditFrm = false;
                $scope.leagueSelectedToUpdate = {};
                $scope.teamToUpdateId = '';
                $scope.teanName = '';
            };

            $scope.editTeamLeague = function () {

                if (!EsNuloVacio($scope.leagueSelectedToUpdate) && !EsNuloVacio($scope.teamToUpdateId)) {

                    HandleDataService.editTeamLeague($scope.teamToUpdateId, $scope.leagueSelectedToUpdate._id).success(function (data) {

                        alert(data);
                        $scope.pageload();

                    }).error(function (err) {
                        console.log(err);
                    });

                }
            };

            $scope.editTeamName = function () {

                HandleDataService.updateTeamName($scope.id, $scope.teanName).success(function (data) {

                    $scope.teanName = '';
                    $scope.id = '';
                    $scope.showFrmNew = false;
                    $scope.pageload();

                }).error(function (err) {
                    console.log(err);
                })
            };

            $scope.pageload();

        }
    ]);
