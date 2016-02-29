angular.module('app').service('loginSvc', function(fb, $q, $firebaseAuth){

  var ref = new Firebase(fb.url);

//create user, $q promise ensures both success and failure messsages get sent back to controller to show to user
  this.createUser = function(email, password, username){
   var defered = $q.defer();
   ref.createUser({
     email: email,
     password: password
   }, function(error, userData) {
          if (error) {
             defered.reject(error);
          } else {
            ref.child("users").child(userData.uid).set({
              name: username
            });
              defered.resolve(userData);
            }
          });
          return defered.promise;
      };

//login user, $q promise ensures both success and failure messsages get sent back to controller to show to user
      this.login = function(email, password){
       var defered = $q.defer();
       ref.authWithPassword({
         email: email,
         password: password
              }, function(error, authData) {
              if (error) {
                 defered.reject(error);
              } else {
                  defered.resolve(authData);
                }
              });
              return defered.promise;
          };

//used to persist login, resolve in router with waitForAuth
        this.auth = function(){
          return $firebaseAuth(ref);
        };

//for logout button
        this.logout = function(){
          ref.unauth();
        };

});
