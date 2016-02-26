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
        roomRef: function($stateParams, svc) {
          return svc.getRoom($stateParams.roomName);
        },
        roomsRef: function(svc) {
          return svc.getRooms();
        }
      }
    });

  });
