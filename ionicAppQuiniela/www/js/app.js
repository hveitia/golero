// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('QuinielaIonicApp', ['ionic', 'chart.js', 'QuinielaIonicApp.Services', 'angular-md5', 'ngCordova'])

  .run(function($ionicPlatform) {


    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }

      if (window.ga) {
        window.ga.startTrackerWithId('UA-82430654-1');
        window.ga.trackView('Start application')
      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }






    });
  })


  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      })


      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.myVotes', {
        url: '/myVotes',
        views: {
          'tab-myVotes': {
            templateUrl: 'templates/tab-myVotes.html',
            controller: 'MyVotesCtrl'
          }
        }
      })

      .state('tab.ranking', {
        url: '/ranking',
        views: {
          'tab-ranking': {
            templateUrl: 'templates/tab-ranking.html',
            controller: 'RankingCtrl'
          }
        }
      })

      .state('tab.pronosticar', {
        url: '/pronosticar',
        views: {
          'tab-pronosticar': {
            templateUrl: 'templates/tab-pronosticar.html',
            controller: 'PronosticarCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'

          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
    $ionicConfigProvider.tabs.position('bottom'); // other values: top

  })
  .controller('MainCtrl', function($scope) {


    $scope.$on('$ionicView.enter', function() {
      $scope.showNavBar = false;
    });
  });
