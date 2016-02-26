angular.module('app').service('svc', function(fb, $firebaseObject, $firebaseArray, $q){

  this.getRooms = function(){
    var roomsRef = new Firebase(fb.url + '/rooms');
    var rooms = $firebaseArray(roomsRef);
    var defered = $q.defer();
    rooms.$loaded().then(function(response){
      defered.resolve(response);
    });
    return defered.promise;
  };

  this.getRoom = function(roomId){
    var roomRef = new Firebase(fb.url + '/rooms/' + roomId);
    var room = $firebaseArray(roomRef);
    var defered = $q.defer();
    room.$loaded().then(function(response){
      defered.resolve(response);
    });
    return defered.promise;
  };

});
