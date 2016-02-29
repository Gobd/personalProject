angular.module('app').service('svc', function(fb, $q){

  this.getRooms = function(){
    return new Firebase(fb.url + '/rooms/');
  };

  // this.getUserInfo = function(uid){
  //   var promise = new Firebase(fb.url + '/users/' + uid);
  //   promise.then(function(response){
  //     console.log(response);
  //     return response;
  //   });
  // };

  this.getRoom = function(name) {
    var deferred = $q.defer();
    var ref = new Firebase(fb.url + '/rooms/');
      ref.orderByChild("name").equalTo(name).on("child_added", function(snapshot) {
        deferred.resolve(new Firebase(fb.url + '/rooms/' + snapshot.key()));
    });
    return deferred.promise;
  };

});
