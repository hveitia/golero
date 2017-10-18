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
                resendConfirmationMail: function (user) {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'resendConfirmationMail/' + user,
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
                loadWorkingDaysByLeague: function (league) {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'workingDayLeague/' + league,
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                loadSeasonByLeague: function (league) {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'seasonLeague/' + league,
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                loadTeamsByLeague: function (league) {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'teamLeague/' + league,
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                loadGameByLeague: function (league) {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'gameLeague/' + league,
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
                getAllLeagues: function () {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'league',
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
                updateLeague: function (season, league) {
                    return $http({
                        method: 'PUT',
                        url: urlApi + 'editLeague/' + season,
                        data: {
                            "league": league
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                editTeamLeague: function (team, league) {
                    return $http({
                        method: 'PUT',
                        url: urlApi + 'editTeamLeague/' + team,
                        data: {
                            "league": league
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                addSeanson: function (name, league) {
                    return $http({
                        method: 'POST',
                        url: urlApi + 'season',
                        data: {
                            "name": name,
                            "league": league
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                addTeam: function (team) {
                    return $http({
                        method: 'POST',
                        url: urlApi + 'team',
                        data: {
                            name: team.name,
                            logo: team.logo,
                            league: team.league
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                addAllGamesToLeague: function (league) {
                    return $http({
                        method: 'POST',
                        url: urlApi + 'addAllGamesToLeague',
                        data: {
                            league: league
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                addAllWorkingDayToLeague: function (league) {
                    return $http({
                        method: 'POST',
                        url: urlApi + 'addAllWorkingDayToLeague',
                        data: {
                            league: league
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                addLeague: function (name, logo) {
                    return $http({
                        method: 'POST',
                        url: urlApi + 'league',
                        data: {
                            "name": name,
                            "logo": logo
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
                editPoints: function (user, point) {
                    return $http({
                        method: 'PUT',
                        url: urlApi + 'editPoints/' + user,
                        data: {
                            "point": point
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
                            "title": title
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
                updateIosVersion: function (config) {
                    return $http({
                        method: 'PUT',
                        url: urlApi + 'updateIosVersion/' + config._id,
                        data: {
                            "iosVersion": config.iosVersion
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                updateAndroidVersion: function (config) {
                    return $http({
                        method: 'PUT',
                        url: urlApi + 'updateAndriodVersion/' + config._id,
                        data: {
                            "androidVersion": config.androidVersion
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
                            "visitorTeam": obj.teamVisitor,
                            "league": obj.league
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
                            "name": obj.name,
                            "league": obj.league
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
                userRankingUpdate: function () {
                    return $http({
                        method: 'GET',
                        url: urlApi + 'userRankingUpdate',
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
                clearLogs: function () {
                    return $http({
                        method: 'DELETE',
                        url: urlApi + 'clearLogs',
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                clearVotes: function(idList){
                    return $http({
                        method: 'POST',
                        url: urlApi + 'clearVotes',
                        data: {
                            "idList": idList
                        },
                        headers: {
                            'Authorization': 'Bearer ' + GetLocalStorage('userToken'),
                            'Content-Type': 'application/json'
                        }
                    });
                },
                clearUsers: function(){
                    return $http({
                        method: 'GET',
                        url: urlApi + 'clearUsers',
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
                },
                deleteWorkingDay: function (wd) {
                    return $http({
                        method: 'DELETE',
                        url: urlApi + 'workingDayName/' + wd,
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
