angular.module('QuinielaIonicApp.Services', [])
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
      //PouchDB.plugin(PouchAdapterCordovaSqlite);
      /*_db = new PouchDB('appData.db', {
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

  .factory('RankinService', ['$http', '$q', function($http, $q) {

    return {
      getRanking: function(token) {
        return $http({
          method: 'GET',
          url: urlApi + 'userRanking',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });
      },
      getRankingPosition: function(token) {
        return $http({
          method: 'GET',
          url: urlApi + 'userRankingPosition',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });
      }
    };
  }])

  .factory('Game', ['$http', '$q', function($http, $q) {

    return {
      getAllWorkingDay: function(token) {
        return $http({
          method: 'GET',
          url: urlApi + 'workingDay',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });
      },
      getAllGames: function(token) {
        return $http({
          method: 'GET',
          url: urlApi + 'game',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });
      },
      getGameToVote: function(token) {
        return $http({
          method: 'GET',
          url: urlApi + 'gameToVoteByDate',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });
      }
    };
  }])

  .factory('Vote', ['$http', '$q', function($http, $q) {

    return {
      getVoteByUser: function(token) {

        return $http({
          method: 'GET',
          url: urlApi + '/voteByUser',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });

      }
    };
  }])
  .factory('UserService', ['$http', '$q', function($http, $q) {

    return {
      getUser: function(token) {
        return $http({
          method: 'GET',
          url: urlApi + '/getUser',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });

      }
    };
  }])
