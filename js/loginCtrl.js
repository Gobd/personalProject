angular.module('app').controller('loginCtrl', function($scope, loginSvc){

//register function that will display success or failure message depending on results of $q promises in service
$scope.register = function(){
  $scope.success = false;
  $scope.fail = false;
  loginSvc.createUser($scope.email, $scope.password)
  .then(function(response, reason){
    $scope.success = response;
  }, function(reason) {
    $scope.fail = reason.code;
  });
  $scope.email = '';
  $scope.password = '';
};

//login function that will display success or failure message depending on results of $q promises in service
$scope.login = function(){
  $scope.success = false;
  $scope.fail = false;
  loginSvc.login($scope.email, $scope.password)
  .then(function(response, reason){
    $scope.success = response;
  }, function(reason) {
    $scope.fail = reason.code;
  });
  $scope.email = '';
  $scope.password = '';
};

});
