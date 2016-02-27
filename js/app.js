angular.module('app', ['firebase', 'ui.router'])

.constant('fb', {url: 'http://personalp.firebaseio.com/'})

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/rooms/Lobby");

  $stateProvider
    .state('rooms', {
      url: "/rooms/{roomName}",
      params: {roomName: { value: "Lobby" }},
      templateUrl: "partials/rooms.html",
      controller: 'ctrl',
      resolve: {
        roomRef: function($stateParams, svc, loginSvc) {
          return svc.getRoom($stateParams.roomName);
        },
        roomsRef: function(svc) {
          return svc.getRooms();
        },
        authRef: function(loginSvc) {
          return loginSvc.authData();
        }
      }
    })
    .state('login', {
      url: "/login",
      templateUrl: "partials/login.html",
      controller: 'loginCtrl',
    })
    .state('register', {
      url: "/register",
      templateUrl: "partials/register.html",
      controller: 'loginCtrl',
    });

  });
