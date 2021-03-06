angular.module('QuinielaApp')

    .controller('HomeCtrl', ['$scope', '$http', '$q', 'HandleDataService', '$window',
        function ($scope, $http, $q, HandleDataService, $window) {

            $scope.pageload = function () {

                $scope.votesNextDate = 0;
                $scope.gamesToUpdate = 0;
                $scope.isLogued = false;


                if (!GetLocalStorage('isLogued')) {
                    $window.location = 'login.html';
                } else {
                    $scope.loadRegisteredUsers();
                    $scope.loadWorkingDays();
                    $scope.loadGamesToUpdate();
                    $scope.loadConfigs();
                    $scope.loadLeagues();
                }

            };

            $scope.loadLeagues = function () {

                $scope.leagueList = [];
                HandleDataService.getAllLeagues().success(function (data) {

                    $scope.leagueList = data;
                    $scope.leagueSelected = $scope.leagueList[0];


                }).error(function (err) {
                    console.log(err);
                });
            };

            $scope.changeLogControl = function () {

                $scope.configs.saveLogs = $scope.toggleValue;
                HandleDataService.updateSaveLogs($scope.configs).success(function (data) {
                    alert('Logs configs updated success!!');
                }).error(function (err) {
                    console.log(err.message);
                });

            };

            $scope.loadConfigs = function () {
                HandleDataService.getConfigs().success(function (data) {
                    $scope.configs = data[0];
                    $scope.toggleValue = $scope.configs.saveLogs;

                }).error(function (err) {

                    console.log(err.message);
                });
            };

            $scope.updateIosVersion = function () {

                HandleDataService.updateIosVersion($scope.configs).success(function (data) {
                    $scope.configs = data;
                    alert('Ios Version updated!!');
                }).error(function (err) {

                    console.log(err.message);
                });
            };

            $scope.updateAndroidVersion = function () {

                HandleDataService.updateAndroidVersion($scope.configs).success(function (data) {
                    $scope.configs = data;
                    alert('Android Version updated!!');
                }).error(function (err) {

                    console.log(err.message);
                })
            };

            $scope.loadRegisteredUsers = function () {
                HandleDataService.getRegisteredUsers().success(function (data) {
                    $scope.registeredUsers = data;

                    $scope.userActives = $scope.registeredUsers.filter(function (x) {
                        return x.state == 'ACTIVE';
                    });

                    $scope.userCreated = $scope.registeredUsers.filter(function (x) {
                        return x.state == 'CREATED';
                    });

                }).error(function (err) {
                    $scope.registeredUsers = [];
                    console.log(err);
                });
            };

            $scope.loadGames = function () {
                $scope.gameList = [];
                if (!EsNuloVacio($scope.workinDaySelected)) {
                    HandleDataService.getGamesByWorkingDay($scope.workinDaySelected._id).success(function (data) {
                        $scope.gameList = data;

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
                }
            };

            $scope.showGamesToUpdate = function () {
                $scope.gameList = [];

                $scope.gameList = $scope.gamesToUpdateList;

                for (var i = 0; i < $scope.gameList.length; i++) {

                    $scope.gameList[i].date = ($scope.gameList[i].especialDate) ? $scope.gameList[i].especialDate : $scope.gameList[i].workingDay.date;

                    if (isGameToUpdate($scope.gameList[i])) {
                        $scope.gameList[i].toUpdate = true;
                    } else {
                        $scope.gameList[i].toUpdate = false;
                    }
                }
            };

            $scope.loadWorkingDays = function () {
                HandleDataService.getAllWorkingDaysActive().success(function (data) {

                    $scope.workinDayList = data;
                    $scope.workinDaySelected = data[0];
                    $scope.workinDayListAll = data;
                    $scope.loadGames();


                })
                    .error(function (err) {
                        $scope.workinDayList = [];
                        console.log(err);
                    });
            };

            $scope.loadGamesToUpdate = function () {
                $scope.gamesToUpdateList = [];
                $scope.gamesToUpdate = 0;
                HandleDataService.getGameByState('SCHEDULED').success(function (data) {

                    for (var i = 0; i < data.length; i++) {
                        if (isGameToUpdate(data[i])) {
                            $scope.gamesToUpdate++;
                            $scope.gamesToUpdateList.push(data[i]);
                        }
                    }

                })
                    .error(function (err) {
                        $scope.gamesToUpdate = 0;
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

            $scope.updateGame = function () {
                var obj = {
                    id: $scope.gameId,
                    goalsLocalTeam: $scope.goalsLocal,
                    goalsVisitorTeam: $scope.goalsVisitor
                };
                HandleDataService.updateGame(obj).success(function (data) {
                    $('#modalUpdateGame').modal('hide');
                    $scope.loadGames();
                    $scope.loadGamesToUpdate();
                })
                    .error(function (err) {
                        alert(err);
                        console.log(err);
                    });

            };


            $scope.$watch('leagueSelected', function(){

                if($scope.leagueSelected){
                    if($scope.workinDayListAll && $scope.workinDayListAll.length > 0){
                        $scope.workinDayList = $scope.workinDayListAll.filter(function (x) {
                            return x.league._id == $scope.leagueSelected._id;
                        });

                        $scope.workinDaySelected = $scope.workinDayList[0];
                        $scope.loadGames();
                    }

                }




            });

            $scope.pageload();

        }
    ]);
