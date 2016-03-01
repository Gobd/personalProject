angular.module('app').directive('showTime', function(){
  return {
    restrict: 'E',
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content'>{{'Email: ' + info.name}}<br>Posted: {{info.time | date:'short'}}<br>Username: {{info.username || 'N/A'}}</div></div></div>",
    scope: {
      info: '=',
      show: '='
    },
    link: function(scope, element, attrs) {
      scope.hideModal = function() {
          scope.show = false;
        };
    }
  };
});
