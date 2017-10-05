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

            $scope.filterByWorkingDate = function () {
                if (EsNuloVacio($scope.workingDayFinded)) {
                    $scope.voteList = $scope.voteListBackup;
                } else {
                    $scope.voteList = $scope.voteListBackup.filter(function (x) {
                        return x.game.workingDay.name == $scope.workingDayFinded;
                    });

                    $scope.createList();
                }
            };

            $scope.filterInactives = function () {
                $scope.voteList = $scope.voteListBackup.filter(function (x) {
                    return x.user == null || x.user.state != 'ACTIVE';
                });
            };

            $scope.voteNumberByUser = function (vote) {

                var array = $scope.voteList.filter(function (x) {
                    return x.user != null && x.user._id == vote.user._id;
                });

                var type = 'success';
                if (array.length > 6) {

                    type = 'danger';
                }
                else{
                    if (array.length < 6){
                        type = 'warning';
                    }
                }

                return {
                    user: array[0].user.user,
                    votes: array.length,
                    type: type
                };

            };

            $scope.findUser = function (user, list) {

                var array = list.filter(function (x) {
                    return x.user != null && x.user == user.user;
                });

                return array.length > 0;
            };

            $scope.createList = function () {

                var arrayResult = [];

                for(var i = 0; i < $scope.voteList.length; i++){

                    if(!$scope.findUser($scope.voteList[i].user, arrayResult)){
                        arrayResult.push($scope.voteNumberByUser($scope.voteList[i]));
                    }
                }

                $scope.listVoteCountByUser = arrayResult;
            };

            $scope.verifyList =function(){

                if(!$scope.listVoteCountByUser || $scope.listVoteCountByUser.length == 0){
                    $scope.createList();
                }
            };

            $scope.clearVotes = function(){

                var idList = [];
                var arrayToClean = $scope.voteList.filter(function (x) {
                    return x.user == null;

                });

                for (var i = 0; i < arrayToClean.length; i++) {

                    idList.push(arrayToClean[i]._id);
                }

                HandleDataService.clearVotes(idList).succes(function (data) {

                    alert('ok');
                    $scope.pageload();

                }).error(function(err){
                    console.log(err);
                });


            };

            $scope.pageload();

        }
    ]);
