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
      _db = new PouchDB('appData');
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
  .factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
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

  .factory('Game', ['$http', '$q', 'DatabaseService', function($http, $q, DatabaseService) {

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

  .factory('Vote', ['$http', '$q', 'DatabaseService', function($http, $q, DatabaseService) {

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
