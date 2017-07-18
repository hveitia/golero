(function () {
    angular.module('QuinielaAppServices', [])
        .factory('HandleDataService', ['$http', '$q', function ($http, $q) {

            return {
                getRegisteredUsers: function () {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'user',
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                getLogs: function () {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'log',
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                getTextsByKey: function (key) {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'getTextsByKey/' + key,
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                getTexts: function () {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'getTexts',
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                getConfigs: function () {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'loadConfigs',
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                getVotes: function () {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'vote',
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                getAllTeams: function () {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'team',
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                getAllWorkingDays: function () {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'workingDay',
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                getAllWorkingDaysActive: function () {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'workingDayActive',
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                getAllGames: function () {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'game',
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                getGamesByWorkingDay: function (workingDay) {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'game/' + workingDay,
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                getGamesById: function (id) {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'gameById/' + id,
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                findGameByIdMany: function (idList) {
                    return $http({
                        method: 'POST',
                        url: urlApi + 'findByIdMany',
                        data: {
                            "idList": idList

                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                getGameByState: function (state) {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'gameState/' + state,
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                getAllSeansons: function () {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'season',
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                getAllSeansonsActive: function () {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'seasonActives',
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                addSeanson: function (name) {
                    return $http({
                        method: 'POST',
                        url: urlApi + 'season',
                        data:{
                            "name": name
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                activateUnactivateSeason: function (season) {
                    return $http({
                        method: 'PUT',
                        url: urlApi + 'activateUnactivateSeason/' + season._id,
                        data: {
                            "active": season.active
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                updateText: function (key, text, title) {
                    return $http({
                        method: 'PUT',
                        url: urlApi + 'updateTexts',
                        data: {
                            "key": key,
                            "text": text,
                            "title": title
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                addText: function (key, text, title) {
                    return $http({
                        method: 'POST',
                        url: urlApi + 'addTexts',
                        data: {
                            "key": key,
                            "text": text,
                            "title":title
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                updateGame: function (game) {
                    return $http({
                        method: 'PUT',
                        url: urlApi + 'gameUpdate/' + game.id,
                        data: {
                            "goalsLocalTeam": game.goalsLocalTeam,
                            "goalsVisitorTeam": game.goalsVisitorTeam
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                updateSaveLogs: function (config) {
                    return $http({
                        method: 'PUT',
                        url: urlApi + 'configsUpdateSaveLog/' + config._id,
                        data: {
                            "saveLogs": config.saveLogs
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                setStateUpdated: function (game) {
                    return $http({
                        method: 'PUT',
                        url: urlApi + 'setUpdateState/' + game._id,
                        data: {},
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                addGame: function (obj) {
                    return $http({
                        method: 'POST',
                        url: urlApi + 'game',
                        data: {
                            "workingDay": obj.workinDaySelected,
                            "localTeam": obj.teamLocal,
                            "visitorTeam": obj.teamVisitor
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                addWorkingDay: function (obj) {
                    return $http({
                        method: 'POST',
                        url: urlApi + 'workingDay',
                        data: {
                            "date": obj.date,
                            "season": obj.season,
                            "name": obj.name
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                updateGameSpecialDate: function (game) {
                    return $http({
                        method: 'PUT',
                        url: urlApi + 'gameUpdateSpecialDate/' + game.id,
                        data: {
                            "especialDate": game.especialDate
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                updateTeamName: function (team, newName) {
                    return $http({
                        method: 'PUT',
                        url: urlApi + 'editTeamName/' + team,
                        data: {
                            "name": newName
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                resetUserPointsAll: function () {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'resetUserPointsAll',
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                deleteUser: function (user) {
                    return $http({
                        method: 'DELETE',
                        url: urlApi + 'user/' + user,
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                deleteVote: function (vote) {
                    return $http({
                        method: 'DELETE',
                        url: urlApi + 'vote/' + vote,
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                deleteGame: function (game) {
                    return $http({
                        method: 'DELETE',
                        url: urlApi + 'deleteGame/' + game,
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                }
                //////////////////////////////////////////////
            }
        }]);

})();
