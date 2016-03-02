angular.module('app', ['firebase', 'ui.router'])

.constant('fb', {url: 'http://personalp.firebaseio.com/'})

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state('rooms', {
      url: "/rooms/:roomName",
      params: {roomName: { value: "Lbb" }},
      templateUrl: "partials/rooms.html",
      controller: 'ctrl',
      resolve: {
        roomRef: function($stateParams, svc) {
          return svc.getRoom($stateParams.roomName);
        },
        roomsRef: function(svc) {
          return svc.getRooms();
        },
        authRef: function(loginSvc) {
          var ref = loginSvc.auth();
          return ref.$waitForAuth();
        }
      }
    })
    .state('login', {
      url: "/login",
      templateUrl: "partials/login.html",
      controller: 'loginCtrl',
      resolve: {
        authRef: function(loginSvc) {
          var ref = loginSvc.auth();
          return ref.$waitForAuth();
        }
      }
    })
    .state('register', {
      url: "/register",
      templateUrl: "partials/register.html",
      controller: 'loginCtrl',
      resolve: {
        authRef: function(loginSvc) {
          var ref = loginSvc.auth();
          return ref.$waitForAuth();
        }
      }
    })
    .state('landing', {
      url: "/landing",
      templateUrl: "partials/landing.html",
      controller: 'loginCtrl',
      resolve: {
        authRef: function(loginSvc) {
          var ref = loginSvc.auth();
          return ref.$waitForAuth();
        }
      }
    });

    $urlRouterProvider.otherwise("/landing");

  });
