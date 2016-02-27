angular.module('app').controller('loginCtrl', function($scope, loginSvc, $q){

$scope.register = function(){
  loginSvc.createUser($scope.email, $scope.password)
  .then(function(response, reason){
    $scope.success = response;
  }, function(reason) {
    $scope.fail = reason.code;
  });
  $scope.email = '';
  $scope.password = '';
};

});
