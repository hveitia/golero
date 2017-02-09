angular.module('QuinielaIonicApp')


  .controller('AccountCtrl', function($scope, Accounts, $stateParams) {
    $scope.items = Accounts.all();
  });
