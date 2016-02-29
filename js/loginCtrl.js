angular.module('app').controller('loginCtrl', function($scope, loginSvc, $state){

  //hide login on landpage intiially
  $scope.showAddLogin = false;

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
