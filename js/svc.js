angular.module('app').service('svc', function(fb, $q){

  this.getRooms = function(){
    return new Firebase(fb.url + '/rooms/');
  };

  this.getRoom = function(name) {
    var deferred = $q.defer();
    var ref = new Firebase(fb.url + '/rooms/');
      ref.orderByChild("name").equalTo(name).on("child_added", function(snapshot) {
        deferred.resolve(new Firebase(fb.url + '/rooms/' + snapshot.key()));
    });
    return deferred.promise;
  };

  this.onlineUsers = function(){
    var userOnRef = new Firebase(fb.url + '/presence/');
    return userOnRef;
  };

});
