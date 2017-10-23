angular.module('QuinielaIonicApp')

  .controller('DashCtrl', function ($scope, $state, $ionicModal, $ionicPopup, $http, $q, $ionicPlatform, $ionicHistory, $cordovaDevice,
                                    Vote, Game, Text, Team, DatabaseService, Configs, RankinService, UserService, StorageService) {

    $scope.urlApi = urlApi;

    //colores
    //azul #190855
    //naranja #ea905d
    // --------- Modals zone  --------------

    $ionicModal.fromTemplateUrl('select-team-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.loadTeamsAll();
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    $ionicModal.fromTemplateUrl('select-avatar-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modalAvatar = modal;
    });
    $scope.openModalAvatar = function () {
      $scope.modalAvatar.show();
    };
    $scope.closeModalAvatar = function () {
      $scope.modalAvatar.hide();
    };

    $ionicModal.fromTemplateUrl('roler-user-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modalRoler = modal;
    });
    $scope.openModalRoler = function () {

      if (StorageService.getItem('registred')) {
        $scope.closeModalRoler();
      }
      else {
        $scope.modalRoler.show();
      }

    };
    $scope.closeModalRoler = function () {
      $scope.modalRoler.hide();
    };

    $ionicModal.fromTemplateUrl('view-votes-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modalViewVotes = modal;
    });
    $scope.openModalViewVotes = function () {
      $scope.modalViewVotes.show();
    };
    $scope.closeModalViewVotes = function () {
      $scope.modalViewVotes.hide();
    };


    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
      $scope.modalAvatar.remove();
      $scope.modalRoler.remove();
      $scope.modalViewVotes.remove();
    });

    // --------- Modals zone  --------------

    // --------- Redirect zone  --------------

    $scope.goToRanking = function () {
      $state.go('tab.ranking');
    };

    $scope.goToMyVotes = function () {
      $state.go('tab.myVotes');
    };

    $scope.goToPronosticar = function () {
      $state.go('tab.pronosticar');
    };

    $scope.goToViewNews = function () {
      $state.go('news');
    };

    $scope.goToViewPositionsTable = function () {
      $state.go('positionsTable');
    };

    // --------- Redirect zone  --------------

    $scope.showTodayVote = function () {

      $scope.viewVotesHeader = 'Mis pronósticos para hoy';
      $scope.openModalViewVotes();
      $scope.loading = true;
      $scope.gameToday = [];
      var idList = [];
      for (var i = 0; i < $scope.todayVoteList.length; i++) {
        idList.push($scope.todayVoteList[i].game._id);
      }

      Game.findGameByIdMany(idList).success(function (data) {
        $scope.gameToday = data;

        for (var i = 0; i < $scope.gameToday.length; i++) {
          for (var j = 0; j < $scope.todayVoteList.length; j++) {

            if ($scope.gameToday[i]._id == $scope.todayVoteList[j].game._id) {

              if ($scope.todayVoteList[j].valueVote == '1') {
                $scope.gameToday[i].localTeamClass = 'animated zoomIn pronosticarList';
                $scope.gameToday[i].visitoTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                $scope.gameToday[i].tiedClass = 'fa fa-handshake-o fa-2x animated zoomIn imagenGrayScale';
              } else {
                if ($scope.todayVoteList[j].valueVote == '2') {
                  $scope.gameToday[i].localTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                  $scope.gameToday[i].visitoTeamClass = 'animated zoomIn pronosticarList';
                  $scope.gameToday[i].tiedClass = 'fa fa-handshake-o fa-2x animated zoomIn imagenGrayScale';
                } else {
                  $scope.gameToday[i].localTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                  $scope.gameToday[i].visitoTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                  $scope.gameToday[i].tiedClass = 'fa fa-handshake-o fa-2x animated zoomIn';
                }
              }
              $scope.gameToday[i].backGroundClass = $scope.getBackgroundVotesList($scope.todayVoteList[j], $scope.gameToday[i]);
            }
          }
        }

        $scope.loading = false;

      }).error(function (err) {
        console.log(err);
      });

    };

    $scope.getBackgroundVotesList = function (vote, game) {

      var acierto = 'green';
      var noAcierto = 'red';
      var negro = '#190855';

      if (game.state != "UPDATED") {
        return negro;
      }


      switch (vote.valueVote) {
        case '1':
        {
          if (game.goalsLocalTeam > game.goalsVisitorTeam)
            return acierto;
          return noAcierto;
        }
        case '2':
        {
          if (game.goalsLocalTeam < game.goalsVisitorTeam)
            return acierto;
          return noAcierto;
        }
        case '0':
        {
          if (game.goalsLocalTeam == game.goalsVisitorTeam)
            return acierto;
          return noAcierto;
        }
      }
    };

    $scope.showAllVotes = function () {

      $scope.viewVotesHeader = 'Todos mis pronósticos';
      $scope.openModalViewVotes();
      $scope.loading = true;
      $scope.gameToday = [];
      var idList = [];
      for (var i = 0; i < $scope.voteList.length; i++) {
        idList.push($scope.voteList[i].game);
      }

      Game.findGameByIdMany(idList).success(function (data) {
        $scope.gameToday = data;


        for (var i = 0; i < $scope.gameToday.length; i++) {
          if (EsNuloVacio($scope.gameToday[i])) {
            $scope.gameToday.splice(i, 1);
            i--;
          }
          else {
            if (i + 1 < $scope.gameToday.length) {
              if ($scope.gameToday[i].workingDay.name != $scope.gameToday[i + 1].workingDay.name) {
                $scope.gameToday[i + 1].showDivid = true;
              }
            }
          }
        }
        if ($scope.gameToday.length > 0) {
          $scope.gameToday[0].showDivid = true;
        }

        for (var i = 0; i < $scope.gameToday.length; i++) {
          for (var j = 0; j < $scope.voteList.length; j++) {

            if (!EsNuloVacio($scope.gameToday[i]) && !EsNuloVacio($scope.voteList[j])) {
              if ($scope.gameToday[i]._id == $scope.voteList[j].game) {

                if ($scope.voteList[j].valueVote == '1') {
                  $scope.gameToday[i].localTeamClass = 'animated zoomIn pronosticarList';
                  $scope.gameToday[i].visitoTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                  $scope.gameToday[i].tiedClass = 'fa fa-handshake-o fa-2x animated zoomIn imagenGrayScale';
                } else {
                  if ($scope.voteList[j].valueVote == '2') {
                    $scope.gameToday[i].localTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                    $scope.gameToday[i].visitoTeamClass = 'animated zoomIn pronosticarList';
                    $scope.gameToday[i].tiedClass = 'fa fa-handshake-o fa-2x animated zoomIn imagenGrayScale';
                  } else {
                    $scope.gameToday[i].localTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                    $scope.gameToday[i].visitoTeamClass = 'animated zoomIn pronosticarList imagenGrayScale';
                    $scope.gameToday[i].tiedClass = 'fa fa-handshake-o fa-2x animated zoomIn';
                  }
                }
                $scope.gameToday[i].backGroundClass = $scope.getBackgroundVotesList($scope.voteList[j], $scope.gameToday[i]);
              }
            }
          }
        }

        $scope.loading = false;

      }).error(function (err) {
        console.log(err);
      });


    };

    $scope.loadTodayVotes = function () {

      Vote.getTodayVotesByUser().success(function (data) {
        $scope.todayVoteList = data;
      })
        .error(function (err) {
          console.log(err);
        });
    };

    $scope.loadVotesByUser = function () {

      Vote.getVoteByUser().success(function (data) {
        $scope.voteList = data;
      })
        .error(function (err) {
          console.log(err);
        });
    };

    $scope.loadactiveVotesByUser = function () {

      Vote.getActiveVotesByUser().success(function (data) {
        $scope.activeVotes = data;
      })
        .error(function (err) {
          console.log(err);
        });
    };

    $scope.loadUserData = function (roler) {
      $scope.loadingUserData = true;
      UserService.getUser().success(function (data) {
        $scope.user = data;
        $scope.loadingUserData = false;
        if (roler) {
          $scope.user.favoriteTeam = teamRoler;
          $scope.user.avatar = avatarRoler;
        }

      })
        .error(function (err) {
          console.log(err);

          $ionicPopup.alert({
            title: '¡Fallo de Red!',
            template: 'Existe insetabilidad en su conexión por favor vuelva a intentarlo.'
          });
        });

    };

    $scope.loadRankingPosition = function () {

      RankinService.getRankingPosition().success(function (data) {
        $scope.rankingPosition = data.pos;
        $scope.points = data.points;
      })
        .error(function (err) {
          console.log(err);
        });

    };

    $scope.editFAvoriteTeam = function (team, enroler) {

      $http({
        method: 'PUT',
        url: urlApi + 'editFavoriteTeam',
        headers: {
          'Authorization': 'Bearer ' + StorageService.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: {
          "team": team
        }
      }).success(function (response) {

        if (enroler) {
          StorageService.setItem('showRolerWizard', false);
          teamRoler = team;
          $scope.voteList = [];
          StorageService.setItem('registred', true);
          $scope.loadUserData(true);
          $scope.loadVotesByUser();
          $scope.loadRankingPosition();
          $scope.closeModalRoler();
          $scope.loadactiveVotesByUser();
          $scope.loadTodayVotes();

        } else {
          $scope.user.favoriteTeam = team;
          $scope.modal.hide();
        }

      })
        .error(function (err) {
          console.log(err);
        });

    };

    $scope.editAvatar = function (avatar, enroler) {

      $http({
        method: 'PUT',
        url: urlApi + 'editAvatar',
        headers: {
          'Authorization': 'Bearer ' + StorageService.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: {
          "avatar": avatar
        }
      }).success(function (response) {

        if (enroler) {
          $scope.enroler = 'team';
          $scope.modalEnrolerTitle = 'Seleccione su Equipo Favorito';
          avatarRoler = avatar;
        } else {
          $scope.user.avatar = avatar;
          $scope.modalAvatar.hide();
        }

      })
        .error(function (err) {
          console.log(err);
        });

    };

    $scope.editName = function () {
      $scope.loading = true;
      if (!EsNuloVacio($scope.data.newName) && !EsNuloVacio($scope.data.newEmail) && $scope.data.terminosLeidos) {
        $http({
          method: 'PUT',
          url: urlApi + 'editName',
          data: {
            "user": $scope.data.newName,
            "email": $scope.data.newEmail,
            "uuid": StorageService.getItem('password')
          }
        }).success(function (response) {
          if (response.message) {
            $ionicPopup.alert({
              title: '¡Error!',
              template: returnApiCodes[response.message]
            });
            $scope.loading = false;
          } else {
            $http.post(urlApi + 'authenticate', {
              "user": $scope.data.newName,
              "pass": StorageService.getItem('password')
            })
              .success(function (response) {
                $scope.loading = false;
                StorageService.setItem('token', response.token);
                StorageService.setItem('user', $scope.data.newName);
                $scope.teamList = [];
                $scope.loadTeamsAll();
                $scope.enroler = 'avatar';
                $scope.modalEnrolerTitle = 'Seleccione su Avatar';

              })
              .error(function (err) {
                console.log(err);
              });
          }
        }).error(function (err) {
          $scope.loading = false;
          console.log(err);
        });
      } else {

        $scope.loading = false;
        $ionicPopup.alert({
          title: '¡Error!',
          template: 'Para continuar con el registro por favor rellene todos los campos y acepte los Términos y Condiciones de Uso.'
        });
      }

    };

    $scope.actualizarEmail = function () {

      if (EsNuloVacio($scope.data.newActivationEmail)) {

        $ionicPopup.alert({
          title: '¡Error!',
          template: 'Por favor inserte su nuevo email.'
        });

      } else {
        UserService.editEmail($scope.data.newActivationEmail).success(function (data) {
          if (data.message) {
            $ionicPopup.alert({
              title: '¡Error!',
              template: returnApiCodes[data.message]
            });
          } else {

            $scope.hideNewEmail = true;

            $ionicPopup.alert({
              title: '¡Enhorabuena!',
              template: 'Su email ha sido actualizado correctamente. Por favor compruébelo para obtener su código de activación.'
            });

          }
        }).error(function (err) {
          console.log(err);
        })
      }
    };

    $scope.showModalNewEmail = function () {
      $ionicPopup.alert({
        title: '¿Por que un nuevo email?',
        template: 'Si se ha equivocado ingresando su email puede corregirlo. Ingrese su email correcto y luego active su cuenta.'
      });
    };

    $scope.activateAccount = function () {

      if (!EsNuloVacio($scope.data.activationText)) {
        UserService.activateAccount($scope.data.activationText).success(function (data) {

          if (data == 'ok') {

            $ionicPopup.alert({
              title: '¡Felicidades!',
              template: 'Su cuenta se ha activado correctamente.'
            });

            $scope.voteList = [];
            $scope.todayVoteList = [];
            $scope.loadUserData();
            $scope.loadVotesByUser();
            $scope.loadRankingPosition();
            $scope.loadactiveVotesByUser();
            $scope.loadTodayVotes();
          }

        }).error(function (err) {
          console.log(err);
          if (err == '404') {
            $ionicPopup.alert({
              title: 'Error!',
              template: 'El texto ingresado no coincide con el texto enviado. Por favor verifique.'
            });
          }
        });
      }
      else {
        $ionicPopup.alert({
          title: 'Error!',
          template: 'Por favor rellene el campo Texto de activación.'
        });
      }
    };

    $scope.onSwipeLeft = function () {
      $state.go('tab.pronosticar');
    };

    $scope.comprobarUserName = function () {

      if (EsNuloVacio($scope.data.newName)) {
        $ionicPopup.alert({
          title: '¡Error!',
          template: 'Por favor inserte su nombre para comprobar la disponibilidad del mismo.'
        });
      } else {
        UserService.verificateUserName($scope.data.newName).success(function (data) {

          if (data) {
            $ionicPopup.alert({
              title: '¡Los sentimos!',
              template: 'El usuario ' + $scope.data.newName + ' no está disponible.'
            });
          } else {
            $ionicPopup.alert({
              title: '¡Enhorabuena!',
              template: 'El usuario ' + $scope.data.newName + ' está disponible.'
            });
          }

        }).error(function (err) {
          console.log(err);
        })
      }

    };

    $scope.showInformativePopup = function (value) {

      Text.getTextsByKey(value).success(function (data) {

        $scope.parrafosList = data[0].text.split('<p>');

        $ionicPopup.alert({
          template: '<div><p ng-repeat="p in parrafosList">{{p}}</p></div>',
          title: data[0].title,
          subTitle: '',
          scope: $scope
        });

      }).error(function (err) {
        console.log(err);
      });
    };

    $scope.loadTeamsAll = function () {
      $scope.teamList = [];
      Team.getTeamsAll().success(function (data) {
        $scope.teamList = data;
      }).error(function (err) {
        console.log(err);
      });

    };

    $scope.recoverAccount = function () {

      if (!EsNuloVacio($scope.data.recoveryNum)) {

        $http.post(urlApi + 'recoverAccount', {
          "recoverCode": $scope.data.recoveryNum,
          "pass": (enviroment == 'DEV') ? Math.floor(Date.now()) : $cordovaDevice.getUUID()
        })
          .success(function (response) {

            if (response === '404') {
              $ionicPopup.alert({
                title: 'Ingreso Fallido',
                template: 'El número de recuperación es incorrecto. Por favor intente de nuevo.'
              });
            } else {

              $scope.data = {};
              $scope.data.username = response.user;
              $scope.data.password = response.pass;

              $scope.login();
            }
          })
          .error(function (err) {
            console.log(err);
          });
      }else{
        $ionicPopup.alert({
          title: 'Ingreso Fallido',
          template: 'El número de recuperación no puede estar vacío.'
        });
      }

    };

    $scope.login = function () {

      if (!EsNuloVacio($scope.data.username) && !EsNuloVacio($scope.data.password)) {

        $http.post(urlApi + 'authenticate', {
          "user": $scope.data.username,
          "pass": $scope.data.password
        })
          .success(function (response) {

            if (!response.success) {
              $ionicPopup.alert({
                title: 'Ingreso Fallido',
                template: returnApiCodes[response.message]
              });

            } else {

              StorageService.setItem('token', response.token);
              StorageService.setItem('user', $scope.data.username);
              StorageService.setItem('password', $scope.data.password);
              StorageService.setItem('showRolerWizard', false);

              $scope.voteList = [];
              $scope.todayVoteList = [];
              $scope.teamList = [];
              $scope.closeModalRoler();
              $scope.loadUserData();
              $scope.loadTeamsAll();
              $scope.username = StorageService.getItem('user');
              $scope.loadVotesByUser();
              $scope.loadRankingPosition();
              $scope.loadactiveVotesByUser();
              $scope.loadTodayVotes();

              $ionicHistory.clearHistory();
              $ionicHistory.clearCache();

              $scope.verifyUpdate();
            }
          })
          .error(function (err) {
            console.log(err);
          });
      }
    };

    $scope.$on('$ionicView.enter', function () {
      $scope.showNavBar = true;
      $scope.data = {};
      $scope.activeVotes = 0;

      if (StorageService.getItem('showRolerWizard')) {
        $scope.loading = false;
        $scope.openModalRoler();
        $scope.enroler = 'name';
        $scope.modalEnrolerTitle = 'Bienvenido a Golero';
        $scope.data.terminosLeidos = true;

      } else {
        $scope.voteList = [];
        $scope.todayVoteList = [];
        $scope.teamList = [];
        $scope.loadUserData();
        $scope.loadTeamsAll();
        $scope.username = StorageService.getItem('user');
        $scope.loadVotesByUser();
        $scope.loadRankingPosition();
        $scope.loadactiveVotesByUser();
        $scope.loadTodayVotes();
      }

      $ionicHistory.clearHistory();
      $ionicHistory.clearCache();

      $scope.verifyUpdate();

      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {
          $ionicPopup.confirm({
            title: textConectionLost.title,
            template: textConectionLost.text,
            buttons: [
              {
                text: 'Reintentar', type: 'button-positive', onTap: function (e) {
                $state.go('tab.dash');
              }
              }]
          });
        }
      }
    });

    $scope.verifyUpdate = function () {

      if (ionic.Platform.isIOS()) {

        Configs.getIosVersion().success(function (data) {

          if (iosVersion < data) {

            $ionicPopup.confirm({
              title: '¡Nueva Versión!',
              template: 'Una nueva versión de Golero está disponible. ¿Desea actualizar la aplicación ahora? Tenga en cuenta que de no actualizar la aplicación esta podría tener resultados inesperados.',
              buttons: [
                {
                  text: 'NO', onTap: function (e) {
                }
                }, {
                  text: 'SI', type: 'button-positive', onTap: function (e) {
                    window.open('http://soygolero.com', '_system');
                  }
                }]
            });

          }
        }).error(function (err) {
          console.log(err);
        });

      } else {

        if (ionic.Platform.isAndroid()) {

          Configs.getAndroidVersion().success(function (data) {

            if (androidVersion < data) {

              $ionicPopup.confirm({
                title: '¡Nueva Versión!',
                template: 'Una nueva versión de Golero está disponible. ¿Desea actualizar la aplicación ahora? Tenga en cuenta que de no actualizar la aplicación esta podría tener resultados inesperados.',
                buttons: [
                  {
                    text: 'NO'
                  }, {
                    text: 'SI', type: 'button-positive', onTap: function (e) {
                      window.open('https://play.google.com/store/apps/details?id=com.hectorveitia.golero', '_system');
                    }
                  }]
              });
            }
          }).error(function () {

          });
        }
      }
    };

    $ionicPlatform.on('resume', function () {
      if ($state.current.name != 'news')
        $state.go('tab.dash');
    });

  });
