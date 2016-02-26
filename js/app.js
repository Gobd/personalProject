angular.module('app', ['firebase', 'ui.router'])

.constant('fb', {url: 'http://personalp.firebaseio.com/'})

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/rooms/Lobby");

  $stateProvider
    .state('rooms', {
      url: "/rooms/{roomId}",
      params: {roomId: { value: "Lobby" }},
      templateUrl: "partials/rooms.html",
      controller: 'ctrl',
      resolve: {
        roomRef: function($stateParams, svc) {
          console.log('room:  ' + svc.getRoom($stateParams.roomId));
          return svc.getRoom($stateParams.roomId);
        },
        roomsRef: function(svc) {
          console.log('rooms:  ' + svc.getRooms());
          return svc.getRooms();
        }
      }
    });

  });
