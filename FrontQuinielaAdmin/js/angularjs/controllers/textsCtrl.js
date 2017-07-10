angular.module('QuinielaApp')

    .controller('TextsCtrl', ['$scope', '$http', '$q', 'HandleDataService',
        function ($scope, $http, $q, HandleDataService) {

            $scope.pageload = function () {

                $scope.modo = 'ADD';
                $scope.loadTexts();

            };

            $scope.addEditText = function () {

                if ($scope.modo == 'ADD') {
                    HandleDataService.addText($scope.key, $scope.text, $scope.title).success(function (data) {
                        $scope.loadTexts();
                        $scope.key = '';
                        $scope.text = '';
                        $scope.title = '';
                    }).error(function (err) {
                        console.log(err);
                    });
                } else {

                }

            };

            $scope.cancelAddEdit = function () {

                $scope.modo = 'ADD';
                $scope.key = '';
                $scope.text = '';
                $scope.title = '';
            };

            $scope.loadTexts = function () {

                HandleDataService.getTexts().success(function (data) {
                    $scope.textsList = data;
                }).error(function (err) {
                    $scope.textsList = [];
                    console.log(err);
                });
            };

            $scope.editTextClick = function (item) {
                $scope.key = item.key;
                $scope.text = item.text;
                $scope.title = item.title;
                $scope.modo = 'EDIT';
            };

            $scope.pageload();

        }
    ]);
