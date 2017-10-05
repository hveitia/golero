angular.module('QuinielaApp')

    .controller('GameCtrl', ['$scope', '$http', 'HandleDataService', function ($scope, $http, HandleDataService) {

        $scope.gameList = [];
        $scope.teamsList = [];
        $scope.seasonList = [];
        $scope.workinDayList = [];
        $scope.showFiltered = true;

        $scope.pageload = function () {

            //$scope.loadTeams();
            //$scope.loadSeasons();
            //$scope.loadWorkingDays();
            //$scope.loadGames();
            $scope.loadLeagues();

        };

        $scope.loadLeagues = function(){

            $scope.leagueList=[];
            HandleDataService.getAllLeagues().success(function(data){

                $scope.leagueList = data;
                $scope.leagueSelected = $scope.leagueList[0];

                $scope.loadSeasonByLeague();

            }).error(function(err){
                console.log(err);
            });
        };

        $scope.loadTeams = function () {
            HandleDataService.getAllTeams().success(function (data) {
                $scope.teamsList = data;
                $scope.teamLocal = data[0];
                $scope.teamVisitor = data[1];
            })
                .error(function (err) {
                    $scope.teamsList = [];
                    console.log(err);
                });
        };

        $scope.loadSeasons = function () {
            HandleDataService.getAllSeansonsActive().success(function (data) {
                $scope.seasonList = data;
                $scope.seasonSelected = data[0];

            })
                .error(function (err) {
                    $scope.seasonList = [];
                    console.log(err);
                });
        };

        $scope.addAllGamesToLeague = function () {
            HandleDataService.addAllGamesToLeague($scope.leagueSelected._id).success(function (data) {
                alert('ok');
            }).error(function (err) {
                console.log(err);
            })
        };

        $scope.loadWorkingDaysByLeague = function(){

            if(!EsNuloVacio($scope.leagueSelected._id)){
                HandleDataService.loadWorkingDaysByLeague($scope.leagueSelected._id).success(function (data) {

                    $scope.workinDayList = data.filter(function (x) {
                        return x.active
                    });

                    $scope.workinDaySelected = $scope.workinDayList[0];

                }).error(function (err) {

                    $scope.workinDayList = [];
                    console.log(err);
                })
            }
        };

        $scope.loadSeasonByLeague = function(){

            if(!EsNuloVacio($scope.leagueSelected._id)){

                HandleDataService.loadSeasonByLeague($scope.leagueSelected._id).success(function (data) {

                    $scope.seasonList = data.filter(function (x) {
                        return x.active
                    });
                    $scope.seasonSelected = $scope.seasonList[0];

                    $scope.loadWorkingDaysByLeague();
                    $scope.loadTeamByLeague();
                    $scope.loadGameByLeague();

                }).error(function (err) {

                    $scope.workinDayList = [];
                    console.log(err);
                })
            }
        };

        $scope.loadTeamByLeague = function(){

            if(!EsNuloVacio($scope.leagueSelected._id)){

                HandleDataService.loadTeamsByLeague($scope.leagueSelected._id).success(function (data) {

                    $scope.teamsList = data;
                    $scope.teamLocal = data[0];
                    $scope.teamVisitor = data[1];

                }).error(function (err) {

                    $scope.workinDayList = [];
                    console.log(err);
                })
            }
        };

        $scope.loadGameByLeague = function () {

            if(!EsNuloVacio($scope.leagueSelected._id)){

                HandleDataService.loadGameByLeague($scope.leagueSelected._id).success(function (data) {

                    $scope.gameList = data;

                    if($scope.showFiltered){
                        $scope.gameList = $scope.gameList.filter(function (x) {
                            return  x.workingDay._id == $scope.workinDaySelected._id;
                        });
                    }

                    for (var i = 0; i < $scope.gameList.length; i++) {
                        $scope.gameList[i].date = ($scope.gameList[i].especialDate) ? $scope.gameList[i].especialDate : $scope.gameList[i].workingDay.date;
                        if (isGameToUpdate($scope.gameList[i])) {
                            $scope.gameList[i].toUpdate = true;
                        } else {
                            $scope.gameList[i].toUpdate = false;
                        }
                    }

                }).error(function (err) {

                    $scope.workinDayList = [];
                    console.log(err);
                })
            }
        };

        $scope.loadWorkingDays = function () {
            HandleDataService.getAllWorkingDaysActive().success(function (data) {
                $scope.workinDayList = data;
                $scope.workinDaySelected = data[0];

            })
                .error(function (err) {
                    $scope.seasonList = [];
                    console.log(err);
                });
        };

        $scope.loadGames = function (){
            HandleDataService.getAllGames().success(function (data) {
                $scope.gameList = data;

                if($scope.showFiltered){
                    $scope.gameList = $scope.gameList.filter(function (x) {
                        return  x.workingDay._id == $scope.workinDaySelected._id;
                    });
                }

                for (var i = 0; i < $scope.gameList.length; i++) {
                    $scope.gameList[i].date = ($scope.gameList[i].especialDate) ? $scope.gameList[i].especialDate : $scope.gameList[i].workingDay.date;
                    if (isGameToUpdate($scope.gameList[i])) {
                        $scope.gameList[i].toUpdate = true;
                    } else {
                        $scope.gameList[i].toUpdate = false;
                    }
                }
            })
                .error(function (err) {
                    $scope.gameList = [];
                    console.log(err);
                });
        };

        $scope.addGame = function () {
            var obj = {
                "workinDaySelected": $scope.workinDaySelected._id,
                "teamLocal": $scope.teamLocal._id,
                "teamVisitor": $scope.teamVisitor._id,
                "league":$scope.leagueSelected._id
            };
            HandleDataService.addGame(obj).success(function (data) {

                alert('Partido Guardado OK');

                $scope.loadGames();
            })
                .error(function (err) {
                    alert(err);
                    console.log(err);
                });

        };

        $scope.addGameSpecialDate = function () {
            var obj = {
                id: $scope.gameId,
                especialDate: $scope.specialDate
            };
            HandleDataService.updateGameSpecialDate(obj).success(function (data) {
                $('#modalAddEditSpecialDate').modal('hide')
            })
                .error(function (err) {
                    alert(err);
                    console.log(err);
                });
        };

        $scope.editGameClick = function (item) {

            $scope.gameId = item._id;
            $scope.local = item.localTeam.name;
            $scope.visitor = item.visitorTeam.name;
            $scope.goalsLocal = 0;
            $scope.goalsVisitor = 0;

        };

        $scope.setStateUpdated = function (game) {
            HandleDataService.setStateUpdated(game).success(function (data) {
                $scope.pageload();
            })
                .error(function (err) {
                    console.log(err.message);
                });
        };

        $scope.editGameDateClick = function (item) {

            $scope.gameId = item._id;
            $scope.local = item.localTeam.name;
            $scope.visitor = item.visitorTeam.name;
            $scope.goalsLocal = 0;
            $scope.goalsVisitor = 0;
            $scope.specialDate = new Date(item.workingDay.date);

        };

        $scope.deleteGameClick = function (game) {
            $scope.idDelete = game._id;
        };

        $scope.canceldeleteGame = function () {
            $scope.idDelete = '';
        };

        $scope.deleteGame = function () {

            if ($scope.idDelete != '') {
                HandleDataService.deleteGame($scope.idDelete).success(function (data) {
                    $scope.pageload();
                })
                    .error(function (err) {

                        console.log(err);
                    });
            }
        };

        $scope.pageload();

    }]);
