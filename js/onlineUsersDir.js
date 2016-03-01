angular.module('app').directive('onlineusersdir', function(){
  return {
    restrict: 'E',
    templateUrl: 'onlinedir.html',
    scope: {
      onlineusers: '=',
    }
  };
});
