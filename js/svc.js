angular.module('app').service('svc', function(fb, $q){

  this.getRooms = function(){
    return new Firebase(fb.url + '/rooms/');
  };

  this.getRoom = function(roomId){
    return new Firebase(fb.url + '/rooms/' + roomId);
  };

  // this.finder = function(name) {
  //   console.log(name);
  //   var deferred = $q.defer();
  //   var ref = new Firebase(fb.url + '/rooms/');
  //     ref.orderByChild("name").equalTo(name).on("child_added", function(snapshot) {
  //       var key = snapshot.key();
  //       console.log(key);
  //       deferred.resolve(snapshot.key());
  //     // return new Firebase(fb.url + '/rooms/' + snapshot.key());
  //   });
  //   return deferred.promise;
  // };

  // this.finder('Lobby');

  // -KBU--3L_-uvYk1eOKCi


});
