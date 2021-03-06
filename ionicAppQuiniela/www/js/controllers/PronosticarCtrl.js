angular.module('QuinielaIonicApp')
  .controller('PronosticarCtrl', function ($scope, $http, $ionicModal, $ionicPopup, $ionicScrollDelegate, $state, $ionicPlatform,
                                           Game, Vote, DatabaseService, StorageService) {
    $scope.urlApi = urlApi;

    $ionicModal.fromTemplateUrl('streak-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function (key) {

      $scope.loadingLocal = true;
      $scope.loadinVisitor = true;
      $scope.modal.show();

    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    $scope.loadGame = function () {
      $scope.gameToVoteList = [];
      $scope.gameToVoteListByDate = [];

      Game.getGameToVote().success(function (data) {

        $scope.gameToVoteList = data;
        $scope.fechaName = '';
        for (var i = 0; i < $scope.gameToVoteList.length; i++) {
          if ($scope.canShowGame($scope.gameToVoteList[i]._id)) {
            if ($scope.gameToVoteList[i].especialDate) {
              $scope.gameToVoteList[i].date = $scope.gameToVoteList[i].especialDate;
            } else {
              $scope.gameToVoteList[i].date = $scope.gameToVoteList[i].workingDay.date;
            }

          } else {
            $scope.gameToVoteList.splice(i, 1);
            i--;
          }
        }

        for (var i = 0; i < $scope.gameToVoteList.length; i++) {
          if (i + 1 < $scope.gameToVoteList.length) {
            if ($scope.gameToVoteList[i].workingDay.name != $scope.gameToVoteList[i + 1].workingDay.name) {
              $scope.gameToVoteList[i + 1].showDivid = true;
            }
          }
        }

        if ($scope.gameToVoteList.length > 0) {
          $scope.gameToVoteList[0].showDivid = true;
        }

        $scope.gameToVoteListAll = $scope.gameToVoteList;
        $scope.loadLeagues();

      })
        .error(function (err) {
          $scope.gameToVoteList = [];
          console.log(err);
        });

    };

    $scope.addVote = function (game, voteValue) {
      $scope.loading = true;

      $http({
        method: 'POST',
        url: urlApi + 'vote',
        headers: {
          'Authorization': 'Bearer ' + StorageService.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: {
          "valueVote": voteValue,
          "game": game._id
        }
      }).success(function (response) {
        $scope.loading = false;
        $scope.gameToVoteList = [];
        $scope.gameToVoteListByDate = [];
        $scope.voteList = [];
        $ionicScrollDelegate.scrollTop();
        $scope.showTipsHowToVote = StorageService.getItem('showTipsHowToVote') == null;
        $scope.loadVotesByUser();
        $scope.closeModal();
      })
        .error(function (err) {
          console.log(err);
        });

    };

    $scope.addVoteClick = function (game) {

      $scope.gameSelected = game;
      $scope.localStreak = [];
      $scope.visitorStreak = [];
      $scope.openModal();

      Game.findGamesByTeam(game.localTeam._id).success(function (data) {

        $scope.localStreak = data;
        $scope.loadingLocal = false;

        for(var i=0;i<$scope.localStreak.length;i++){
          if($scope.localStreak[i].goalsLocalTeam > $scope.localStreak[i].goalsVisitorTeam){

            if($scope.gameSelected.localTeam._id == $scope.localStreak[i].localTeam._id){
              $scope.localStreak[i].resultado = 'g';
            }
            else{
              $scope.localStreak[i].resultado = 'p';
            }

          }
          else{
            if($scope.localStreak[i].goalsLocalTeam < $scope.localStreak[i].goalsVisitorTeam){

              if($scope.gameSelected.localTeam._id == $scope.localStreak[i].localTeam._id){
                $scope.localStreak[i].resultado = 'p';
              }
              else{
                $scope.localStreak[i].resultado = 'g';
              }
            }
            else{
              $scope.localStreak[i].resultado = 'e';
            }
          }
        }

      })
        .error(function (err) {
          console.log(err);
        });
      Game.findGamesByTeam(game.visitorTeam._id).success(function (data) {

        $scope.visitorStreak = data;
        $scope.loadinVisitor = false;

        for(var i=0;i<$scope.visitorStreak.length;i++){
          if($scope.visitorStreak[i].goalsLocalTeam > $scope.visitorStreak[i].goalsVisitorTeam){

            if($scope.gameSelected.visitorTeam._id == $scope.visitorStreak[i].localTeam._id){
              $scope.visitorStreak[i].resultado = 'g';
            }
            else{
              $scope.visitorStreak[i].resultado = 'p';
            }

          }
          else{
            if($scope.visitorStreak[i].goalsLocalTeam < $scope.visitorStreak[i].goalsVisitorTeam){

              if($scope.gameSelected.visitorTeam._id == $scope.visitorStreak[i].visitorTeam._id){
                $scope.visitorStreak[i].resultado = 'g';
              }
              else{
                $scope.visitorStreak[i].resultado = 'p';
              }
            }
            else{
              $scope.visitorStreak[i].resultado = 'e';
            }
          }
        }

      })
        .error(function (err) {
          console.log(err);
        });
    };

    $scope.loadVotesByUser = function () {
      $scope.loading = true;

      Vote.getVoteByUser().success(function (data) {
        $scope.voteList = data;

        $scope.loadGame();

      })
        .error(function (err) {

          console.log(err);
        });

    };

    $scope.canShowGame = function (idGame) {
      for (var i = 0; i < $scope.voteList.length; i++) {
        if (idGame == $scope.voteList[i].game) {
          return false;
        }
      }
      return true;
    };

    $scope.buttonIKnowClick = function () {
      StorageService.setItem('showTipsHowToVote', true);
      $scope.showTipsHowToVote = false;
    };

    $scope.championClick = function(){
      $scope.serieAClass = 'imagenGrayScale';
      $scope.championClass = '';
      $scope.activeLeague = 'CH';
      $scope.gameToVoteList = $scope.gameToVoteListAll.filter(function (x) {
        return x.league._id ==  $scope.championLeague._id;
      });
    };

    $scope.serieAClick = function(){
      $scope.serieAClass = '';
      $scope.championClass = 'imagenGrayScale';
      $scope.activeLeague = 'SA';
      $scope.gameToVoteList = $scope.gameToVoteListAll.filter(function (x) {
        return x.league._id ==  $scope.serieALeague._id;
      });
    };

    $scope.loadLeagues = function(){

      Game.getAllLeagues().success(function(data){

        $scope.serieALeague = data.filter(function (x) {
          return x.name.indexOf('Copa Pilsener') > -1;
        })[0];

        $scope.championLeague = data.filter(function (x) {
          return x.name.indexOf('UEFA') > -1;
        })[0];

        $scope.gameToVoteList = $scope.gameToVoteListAll.filter(function (x) {
          return x.league._id ==  $scope.serieALeague._id;
        });

        $scope.loading = false;
        $scope.resumeAction();
      }).error(function (err) {

      });

    };

    $scope.resumeAction = function(){

      switch ($scope.activeLeague){
        case  'SA':{
          $scope.serieAClick();
        }break;
        case 'CH':{
          $scope.championClick();
        }break;
        default :
          $scope.serieAClick();
      }

    };

    $scope.$on('$ionicView.enter', function () {
      $scope.loading = false;
      $scope.gameToVoteList = [];
      $scope.gameToVoteListByDate = [];
      $scope.voteList = [];
      $ionicScrollDelegate.scrollTop();
      $scope.serieAClass = '';
      $scope.championClass = 'imagenGrayScale';
      $scope.showTipsHowToVote = StorageService.getItem('showTipsHowToVote') == null;
      $scope.loadVotesByUser();

      if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
          $ionicPopup.confirm({
            title: textConectionLost.title,
            template: textConectionLost.text,
            buttons: [
              {
                text: 'Reintentar', type: 'button-positive', onTap: function (e) {$state.go('tab.dash');}
              }]
          });
        }
      }
    });

  });
