angular.module('app').service('svc', function(fb, $q, $http){

  //gif service
this.searchG = function(query){
            return  $http({
              url: 'http://api.giphy.com/v1/gifs/search?q=' + query,
              method: "GET",
              params: {'api_key': 'dc6zaTOxFJmzC'}
              }).then(function(response) {
                var ret = response.data.data;
                var rand = Math.floor(Math.random()*ret.length);
                return ret[rand].images.downsized.url;
            });
          };

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
