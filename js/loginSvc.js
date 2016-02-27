angular.module('app').service('loginSvc', function(fb, $q){

  var ref = new Firebase(fb.url);

//create user, $q promise ensures both success and failure messsages get sent back to controller to show to user
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

//retrieves authdata so we know if a user is logged in or not, which we will resolve in most states
  this.authData = function(){
    return ref.getAuth();
  };

  // this.authData();

// var date = new Date();
// moment(date).isAfter(moment.unix(1456681385));

});
