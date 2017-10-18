angular.module('QuinielaApp')

    .controller('UserCtrl', ['$scope', '$http', '$q', 'HandleDataService',
        function ($scope, $http, $q, HandleDataService) {

            $scope.pageload = function () {

                $scope.showOnlyCreated = false;
                $scope.loaded = false;
                $scope.loadRegisteredUsers();

            };

            $scope.loadRegisteredUsers = function () {
                HandleDataService.getRegisteredUsers().success(function (data) {
                    $scope.loaded = true;
                    $scope.registeredUsers = data;

                    if ($scope.showOnlyCreated) {
                        $scope.registeredUsersToShow = $scope.registeredUsers.filter(function (x) {
                            return x != null && x.state == 'CREATED';
                        });
                    } else {
                        $scope.registeredUsersToShow = $scope.registeredUsers;
                    }
                })
                    .error(function (err) {
                        $scope.registeredUsers = [];
                        console.log(err);
                    });
            };

            $scope.deleteUserClick = function (user) {
                $scope.idDelete = user._id;
            };

            $scope.canceldeleteUser = function () {
                $scope.idDelete = '';
            };

            $scope.cancelResetAllUsers = function () {

            };

            $scope.resetAllUsers = function () {
                HandleDataService.resetUserPointsAll().success(function () {
                    $scope.pageload();
                }).error(function (err) {
                    console.log(err);
                });

            };

            $scope.resendConfirmationMail = function (item) {

                HandleDataService.resendConfirmationMail(item._id).success(function () {

                    alert('Mail Resended OK');

                }).error(function (err) {

                    console.log(err);

                });

            };

            $scope.deleteUser = function () {

                if ($scope.idDelete != '') {
                    HandleDataService.deleteUser($scope.idDelete).success(function (data) {
                        $scope.pageload();
                    })
                        .error(function (err) {

                            console.log(err);
                        });
                }
            };

            $scope.userRankingUpdate = function () {

                HandleDataService.userRankingUpdate().success(function () {
                    $scope.pageload();
                }).error(function (err) {
                    console.log(err);
                });

            };

            $scope.$watch('showOnlyCreated', function () {

                if ($scope.loaded) {
                    if ($scope.showOnlyCreated) {
                        $scope.registeredUsersToShow = $scope.registeredUsers.filter(function (x) {
                            return x != null && x.state == 'CREATED';
                        });
                    } else {
                        $scope.registeredUsersToShow = $scope.registeredUsers;
                    }
                }
            });

            $scope.editPoints = function () {
                HandleDataService.editPoints($scope.userNewPoint, $scope.newPoint).success(function (data) {

                    alert('dddd');

                }).error(function (err) {
                    console.log(err);
                })
            };

            $scope.clearUsers = function(){

                HandleDataService.clearUsers().succes(function (data) {

                    alert('ok');
                    $scope.pageload();

                }).error(function(err){
                    console.log(err);
                });


            };

            $scope.pageload();

        }
    ]);
