angular.module('app').service('loginSvc', function(fb, $q){

  var ref = new Firebase(fb.url);

  this.createUser = function(email, password){
   var defered = $q.defer();
   ref.createUser({
     email: email,
     password: password
          }, function(error, userData) {
          if (error) {
             defered.reject(error);
          } else {
              defered.resolve(userData);
            }
          });
          return defered.promise;
      };

  this.login = function(email, password){
    ref.authWithPassword({
      email: email,
      password: password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  };


});
