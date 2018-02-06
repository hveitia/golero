angular.module('QuinielaIonicApp.Services', [])

  .constant('storageKey', 'storage_')

  .factory('StorageService', ['$window', 'storageKey', function ($window, storageKey) {

    var storageService = {};

    var getStorageKey = function (key) {
      return storageKey + key;
    };

    storageService.setItem = function (key, object) {
      $window.localStorage.setItem(getStorageKey(key), angular.toJson(object));
    };

    storageService.getItem = function (key) {
      var jsonObject = $window.localStorage.getItem(getStorageKey(key));
      return jsonObject ? angular.fromJson(jsonObject) : null;
    };

    return storageService;
  }])

  .factory('DatabaseService', ['$q', function ($q) {
    var _db;

    return {
      initDB: initDB,
      addData: addData,
      getData: getData,
      deleteData: deleteData,
      updateData: updateData
    };

    function initDB() {
      // Creates the database or opens if it already exists
      /*PouchDB.plugin(PouchAdapterCordovaSqlite);
       _db = new PouchDB('appData.db', {
       adapter: 'cordova-sqlite',
       location: 'default',
       revs_limit: 1,
       auto_compaction: true
       });*/
      _db = new PouchDB('appData', {
        revs_limit: 1,
        auto_compaction: true
      });
    };

    function addData(key, data) {
      return $q.when(_db.put({
        _id: key,
        data: data
      }));
    }

    function getData(key) {
      return $q.when(_db.get(key));
    }

    function deleteData(key) {
      return $q.when(_db.remove(key));
    }

    function updateData(doc) {
      return $q.when(_db.put(doc));
    }
  }])

  .factory('RankinService', ['$http', '$q', 'StorageService', function ($http, $q, StorageService) {

    return {
      getRanking: function () {
        return $http({
          method: 'GET',
          url: urlApi + 'userRanking',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },

      userRankingLeague: function (league) {
        return $http({
          method: 'GET',
          url: urlApi + 'userRankingLeague/' + league,
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },

      getRankingPosition: function () {
        return $http({
          method: 'GET',
          url: urlApi + 'userRankingPosition',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      }
    };
  }])

  .factory('Game', ['$http', '$q', 'StorageService', function ($http, $q, StorageService) {

    return {
      getAllWorkingDay: function () {
        return $http({
          method: 'GET',
          url: urlApi + 'workingDay',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },

      getAllGames: function () {
        return $http({
          method: 'GET',
          url: urlApi + 'game',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },

      getGameToVote: function () {
        return $http({
          method: 'GET',
          url: urlApi + 'gameToVoteByDate',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },

      findGameByIdMany: function (idList) {
        return $http({
          method: 'POST',
          url: urlApi + '/findByIdMany',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          },
          data: {
            "idList": idList

          }
        });
      },

      findGamesByTeam: function (game) {
        return $http({
          method: 'GET',
          url: urlApi + 'findByTeam/' + game,
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },

      getGameById: function (idGame) {
        return $http({
          method: 'GET',
          url: urlApi + 'gameById/' + idGame,
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },

      getAllLeagues: function () {
        return $http({
          method: 'GET',
          url: urlApi + 'league',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      }
    };

  }])

  .factory('Vote', ['$http', '$q', 'StorageService', function ($http, $q, StorageService) {

    return {
      getVoteByUser: function () {
        return $http({
          method: 'GET',
          url: urlApi + 'voteByUser',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },
      getVoteByUserAny: function (user) {
        return $http({
          method: 'GET',
          url: urlApi + 'voteByUserAny/' + user,
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },
      getActiveVotesByUser: function () {
        return $http({
          method: 'GET',
          url: urlApi + 'votesActiveByUser',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },
      getTodayVotesByUser: function () {
        return $http({
          method: 'GET',
          url: urlApi + 'votesTodayByUser',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },
      deleteVote: function (vote) {
        return $http({
          method: 'DELETE',
          url: urlApi + 'vote/' + vote,
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      }
    };
  }])

  .factory('Text', ['$http', '$q', 'StorageService', function ($http, $q, StorageService) {

    return {
      getTexts: function () {
        return $http({
          method: 'GET',
          url: urlApi + 'getTexts',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },
      getTextsByKey: function (key) {
        return $http({
          method: 'GET',
          url: urlApi + 'getTextsByKey/' + key,
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      }
    };
  }])

  .factory('Team', ['$http', '$q', 'StorageService', function ($http, $q, StorageService) {

    return {
      getTeamsAll: function () {
        return $http({
          method: 'GET',
          url: urlApi + 'teamSA',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      }
    };
  }])

  .factory('Configs', ['$http', '$q', 'StorageService', function ($http, $q, StorageService) {

    return {
      getIosVersion: function () {
        return $http({
          method: 'GET',
          url: urlApi + 'getIosVersion',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },
      getAndroidVersion: function () {
        return $http({
          method: 'GET',
          url: urlApi + 'getAndroidVersion',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      }
    };
  }])

  .factory('UserService', ['$http', '$q', 'StorageService', function ($http, $q, StorageService) {

    return {
      getUser: function () {
        return $http({
          method: 'GET',
          url: urlApi + 'getUser',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });

      },
      getUserByName: function (name) {
        return $http({
          method: 'GET',
          url: urlApi + 'getUserByName/' + name,
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });

      },
      activateAccount: function (registerHash) {
        return $http({
          method: 'PUT',
          url: urlApi + 'activateAccount',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          },
          data: {
            "registerHash": registerHash
          }
        });
      },
      editEmail: function (newEmail) {
        return $http({
          method: 'PUT',
          url: urlApi + 'editEmail',
          data: {
            "email": newEmail
          },
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },
      verificateUserName: function (userName) {
        return $http({
          method: 'GET',
          url: urlApi + 'verificateUser/' + userName
        });
      }
    };
  }])

  .service('$cordovaScreenshot', ['$q', function ($q) {
    return {
      capture: function (filename, extension, quality) {
        extension = extension || 'jpg';
        quality = quality || '100';

        var defer = $q.defer();

        navigator.screenshot.save(function (error, res) {
          if (error) {

            defer.reject(error);
          } else {

            defer.resolve(res.filePath);
          }
        }, extension, quality, filename);

        return defer.promise;
      }
    };
  }]);
