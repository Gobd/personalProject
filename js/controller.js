angular.module('app').controller('ctrl', function($scope, $firebaseObject, $stateParams, $state, $firebaseArray, svc, roomRef, roomsRef){

// first we get the rooms to fill the rooms sidebar
$scope.rooms = roomsRef;

//this changes the state when we click on a room, and roomRef pulls from the $stateParams to get the room content
$scope.getRoom = function(roomId){
    $state.go('rooms', { roomId: roomId});
};
$scope.room = roomRef;

//this creates a new room
$scope.createRoom = function () {
    $scope.rooms.$add({name: $scope.roomTitle});
    $scope.roomTitle = '';
};

//this adds a chat to the openb room
  $scope.chat = function () {
    $scope.room.$add({text: $scope.chatText,
                      time: Firebase.ServerValue.TIMESTAMP});
    $scope.chatText = '';
  };

  $scope.showAdd = false;

});
