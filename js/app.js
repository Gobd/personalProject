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
          console.log('from appjs' + svc.finder('tester'));
          return svc.getRoom($stateParams.roomId);
        },
        roomsRef: function(svc) {
          return svc.getRooms();
        }
      }
    });

  });
