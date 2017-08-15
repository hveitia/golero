angular.module('QuinielaApp')

    .controller('VoteCtrl', ['$scope', '$http', '$q', 'HandleDataService',
        function ($scope, $http, $q, HandleDataService) {

            $scope.pageload = function () {

                $scope.loadVotes();

            };

            $scope.loadVotes = function () {

                var idList = [];
                HandleDataService.getVotes().success(function (data) {
                    $scope.voteList = data;

                    for (var i = 0; i < $scope.voteList.length; i++) {

                        idList.push($scope.voteList[i].game)
                    }

                    HandleDataService.findGameByIdMany(idList).success(function (data) {

                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < $scope.voteList.length; j++) {
                                if ($scope.voteList[j].game == data[i]._id) {
                                    $scope.voteList[j].game = data[i];
                                }
                            }
                        }

                        $scope.voteListBackup = $scope.voteList;

                    }).error(function (err) {
                        console.log(err);
                    });

                }).error(function (err) {
                    $scope.voteList = [];
                    console.log(err);
                });
            };

            $scope.getGameById = function (id, vote) {

                HandleDataService.getGamesById(id).success(function (data) {
                    vote.game = data;
                }).error(function (err) {
                    console.log(err);
                });
            };

            $scope.deleteVoteClick = function (vote) {
                $scope.idDelete = vote._id;
            };

            $scope.canceldeleteVote = function () {
                $scope.idDelete = '';
            };

            $scope.deleteVote = function () {

                if ($scope.idDelete != '') {
                    HandleDataService.deleteVote($scope.idDelete).success(function (data) {
                        $scope.pageload();
                    }).error(function (err) {
                        console.log(err);
                    });
                }
            };

            $scope.filterByWorkingDate = function(){
                if(EsNuloVacio($scope.workingDayFinded)){
                    $scope.voteList = $scope.voteListBackup;
                }else {
                    $scope.voteList = $scope.voteListBackup.filter(function (x) {
                        return x.game.workingDay.name == $scope.workingDayFinded;
                    });
                }
            };

            $scope.filterInactives = function () {
                $scope.voteList = $scope.voteListBackup.filter(function (x) {
                    return x.user.state == 'CREATED';
                });
            };


            $scope.pageload();

        }
    ]);
