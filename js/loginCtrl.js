angular.module('app').controller('loginCtrl', function(fb, $firebaseObject, $interval, $scope, loginSvc, $state, authRef){

//auth data to change login and register to rooms buttons if already logged in
$scope.authData = authRef;

//for getting the username
if($scope.authData) {
  var userRef = new Firebase(fb.url + '/users/' + $scope.authData.uid);
  $scope.userInfo = $firebaseObject(userRef);
}

  //for logout button
$scope.logout = function(){
  loginSvc.logout();
  $state.go('landing');
};

  //hide login on landpage intiially
  $scope.showAddLogin = false;
  $scope.showAdd = function(){
    $scope.showAddLogin = !$scope.showAddLogin;
  };

  //fake userdata
  //faking the userdata
  $scope.fake = 792836;
  var increment = function(){
      $scope.fake ++;
  };
$scope.fakeUsers = $interval(increment, 400);

//register function that will display success or failure message depending on results of $q promises in service
$scope.register = function(){
  $scope.success = false;
  $scope.fail = false;
  loginSvc.createUser($scope.email, $scope.password,  $scope.username)
  .then(function(response, reason){
    $scope.success = response;
  }, function(reason) {
    $scope.fail = reason.code;
  });
  $scope.email = '';
  $scope.password = '';
  $scope.username = '';
};

//login function that will display success or failure message depending on results of $q promises in service
//redirects to lobby on successful login, or displays error if login fails
$scope.login = function(email, password){
  $scope.success = false;
  $scope.fail = false;
  loginSvc.login(email, password)
  .then(function(response, reason){
    $scope.success = response;
    $state.go('rooms');
  }, function(reason) {
    $scope.fail = reason.code;
  });
  $scope.email = '';
  $scope.password = '';
};

});
