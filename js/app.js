angular.module('app', ['firebase', 'ui.router'])

.constant('fb', {url: 'http://personalp.firebaseio.com/'})

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/rooms/");

  $stateProvider
    .state('rooms', {
      url: "/rooms/{roomId}",
      params: {roomId: { value: "home" }},
      templateUrl: "partials/rooms.html",
      controller: 'ctrl',
      resolve: {
        roomRef: function($stateParams, svc) {
          return svc.getRoom($stateParams.roomId);
        },
        roomsRef: function(svc) {
          return svc.getRooms();
        }
      }
    });

  });
