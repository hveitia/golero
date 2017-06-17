angular.module('QuinielaIonicApp.Services', [])

  .constant('storageKey', 'storage_')

  .factory('StorageService', ['$window', 'storageKey', function($window, storageKey) {

    var storageService = {};

    var getStorageKey = function(key) {
      return storageKey + key;
    };

    storageService.setItem = function(key, object) {
      $window.localStorage.setItem(getStorageKey(key), angular.toJson(object));
    };

    storageService.getItem = function(key) {
      var jsonObject = $window.localStorage.getItem(getStorageKey(key));
      return jsonObject ? angular.fromJson(jsonObject) : null;
    };

    return storageService;
  }])

  .factory('DatabaseService', ['$q', function($q) {
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

  .factory('RankinService', ['$http', '$q', 'StorageService', function($http, $q, StorageService) {

    return {
      getRanking: function() {
        return $http({
          method: 'GET',
          url: urlApi + 'userRanking',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },
      getRankingPosition: function() {
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

  .factory('Game', ['$http', '$q', 'StorageService', function($http, $q, StorageService) {

    return {
      getAllWorkingDay: function() {
        return $http({
          method: 'GET',
          url: urlApi + 'workingDay',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },

      getAllGames: function() {
        return $http({
          method: 'GET',
          url: urlApi + 'game',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },

      getGameToVote: function() {
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
      getGameById: function (idGame) {
        return $http({
          method: 'GET',
          url: urlApi + '/gameById/' + idGame,
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      }
    };

  }])

  .factory('Vote', ['$http', '$q', 'StorageService', function($http, $q, StorageService) {

    return {
      getVoteByUser: function() {
        return $http({
          method: 'GET',
          url: urlApi + '/voteByUser',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },
      getVoteByUserAny: function(user) {
        return $http({
          method: 'GET',
          url: urlApi + '/voteByUserAny/' + user,
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },
      getActiveVotesByUser: function() {
        return $http({
          method: 'GET',
          url: urlApi + '/votesActiveByUser',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },
      getTodayVotesByUser: function() {
        return $http({
          method: 'GET',
          url: urlApi + '/votesTodayByUser',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      },
      deleteVote: function(vote) {
        return $http({
          method: 'DELETE',
          url: urlApi + '/vote/' + vote,
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      }
    };
  }])

  .factory('UserService', ['$http', '$q', 'StorageService', function($http, $q, StorageService) {

    return {
      getUser: function() {
        return $http({
          method: 'GET',
          url: urlApi + '/getUser',
          headers: {
            'Authorization': 'Bearer ' + StorageService.getItem('token'),
            'Content-Type': 'application/json'
          }
        });

      }
    };
  }]);
