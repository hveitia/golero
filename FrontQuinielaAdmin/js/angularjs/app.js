(function() {
  angular.module('QuinielaApp', ['ngRoute', 'QuinielaAppServices', 'angular-md5','ui.toggle'])

    .config(['$routeProvider', function($routeProvider) {

      $routeProvider.when("/", {
          templateUrl: "views/home.html",
          controller: "HomeCtrl"
        })
        .when("/team", {
          templateUrl: "views/team.html",
          controller: "TeamCtrl"
        })
        .when("/game", {
          templateUrl: "views/game.html",
          controller: "GameCtrl"
        })
        .when("/workingDay", {
          templateUrl: "views/workingDay.html",
          controller: "WorkingDayCtrl"
        })
        .when("/season", {
          templateUrl: "views/season.html",
          controller: "SeasonCtrl"
        })
        .when("/user", {
          templateUrl: "views/user.html",
          controller: "UserCtrl"
        })
        .when("/vote", {
          templateUrl: "views/vote.html",
          controller: "VoteCtrl"
        })
        .when("/log", {
          templateUrl: "views/log.html",
          controller: "LogCtrl"
        })
        .otherwise({
          reditrectTo: "/"
        });

    }]);
})();
