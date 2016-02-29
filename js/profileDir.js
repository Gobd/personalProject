angular.module('app').directive('showTime', function(){
  return {
    restrict: 'E',
    template: "<div id='profileDir' ng-show='show'>HELLO GUY{{info}}</div>",
    scope: {
      info: '@',
      show: '='
    },
    replace: true,
    transclude: true,
    link: function(scope, element, attrs) {
      element.css({
        color: 'black',
        fontWeight: 'bold'
        });
      element.on('mousedown', function(){
        scope.time = new Date();
        scope.$apply();
        });
      var currentTime = new Date();
      scope.time = currentTime;
      scope.gmtTime = currentTime.toGMTString();
    }
  };
});
