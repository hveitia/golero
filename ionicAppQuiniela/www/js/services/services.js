angular.module('QuinielaIonicApp.Services', [])

  .service('LoginService', ['$q', function($q) {
    return {
      loginUser: function(name, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        if (name == 'user' && pw == 'secret') {
          deferred.resolve('Welcome ' + name + '!');
        } else {
          deferred.reject('Wrong credentials.');
        }
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }
    }
  }])
  .factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 1,
      name: 'Max Lynx',
      online: true,
      msgCount: 123,
      time: '11.35 AM',
      message: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      msgCount: 342,
      time: '10.35 AM',
      message: 'So careful with our relationship. Now you are part of us.',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      time: 'YESTERDAY',
      name: 'Perry Governor',
      msgCount: 342,
      online: true,

      message: 'You have mistaken I am not the person whom u r looking for!',
      face: 'img/perry.png'
    }, {
      id: 4,
      time: 'YESTERDAY',
      name: 'Mike Harrington',
      message: 'But I still have that voucher for mc donalds! What about that instead?',
      face: 'img/mike.png',
      msgCount: 38,
    }, {
      id: 5,
      msgCount: 2,
      time: 'FRIDAY',
      name: 'Alice Whitman',
      online: true,
      message: 'Thank You hunny. I love u sooooo much......',
      face: 'img/mike.png'
    }];

    return {
      all: function() {
        return chats;
      },
      remove: function(chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function(chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  })

  .factory('Game', ['$http', '$q', function($http, $q) {

    return {
      getAllGames: function() {
        return $http({
          method: 'GET',
          url: urlApi + 'game'
        });
      },
    };
  }])


  .factory('Accounts', function() {
    var socials = [{
      img: '../img/icons/ionic-icon.png',
      title: 'Ionic Market',
      color: '#229cff',
      url: 'https://market.ionic.io/user/305270',
      description: 'You can find all of my <b>Premium </b> and  <b>Free</b> ionic  <b>Apps</b> from ionic Market.'
    }, {
      img: '../img/icons/youtube.svg',
      title: 'Youtube',
      color: '#e52215',
      url: 'https://www.youtube.com/channel/UCXrvOXBvlugqfohxk76hvog',
      description: 'You <b>can access</b> My Videos in  <i class="italic thin"> Youtube. Feel free to <b>SUBSCRIBE</b> my channel</i>'
    }, {
      img: '../img/icons/twitter.svg',
      title: 'Twitter',
      color: '#2196f3',
      url: 'https://twitter.com/deshatom',
      description: 'Do you <b>need</b> to know my  <span class="thin ">last works..<b> Follow me on Twitter</b></span>'
    }, {
      img: '../img/icons/pinterest.svg',
      title: 'Pinterest',
      color: '#bd0a1c',
      url: 'https://www.pinterest.com/deshatom/',
      description: 'You can <b>see </b> more <b>Projects</b> that <b>I </b> have done. Please follow me on  <b>Pinterest</b>'
    }, ];

    return {
      all: function() {
        return socials;
      },
    };
  });
