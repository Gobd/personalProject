angular.module('app').controller('ctrl', function($scope, $state, $firebaseArray, svc, roomRef, roomsRef){

  // animated fadeInLeft add to class sidebar on hamburger click

//easy way to add date to posts, firebase timestamp wouldn't work with moment and livestamp
var date = new Date().toISOString();

// first we get the rooms and possible room content to fill the rooms sidebar
$scope.rooms = $firebaseArray(roomsRef);
$scope.room = $firebaseArray(roomRef);

//this changes the state when we click on a room, and roomRef pulls from the $stateParams to get the room content
$scope.getRoom = function(name){
    $state.go('rooms', {roomName: name});
};

//makes array of current room names so people can't overwrite existing rooms
var roomsList = [];
  $scope.rooms.$loaded().then(function(rooms){
    rooms.forEach(function(a){
        roomsList.push(a.name);
    });
  });

//this creates a new room
$scope.createRoom = function() {
    $scope.rooms.$add({name: this.roomTitle});
    this.roomTitle = '';
    $scope.showAdd = false;
};

//this adds a chat to the openb room
  $scope.chat = function () {
    $scope.room.$add({text: $scope.chatText,
                      time: date});
        $scope.chatText = '';
  };

//initially hide the add channel input
$scope.showAdd = false;

//disable channel input box if channel already exists or if someone tries to input symbols
  $scope.exist = false;
  $scope.channelStat = false;
  $scope.channelSymbols = false;
  $scope.channelChecker = function(){
   var that = this;
    that.channelStat = false;
    that.channelSymbols = /[^A-Za-z0-9\s]/g.test(that.roomTitle);
    roomsList.forEach(function(a){
      if (a === that.roomTitle) {
        that.channelStat = true;
        that.exist = true;
      }
      });
  };

  //animating
  $scope.changeClass = function(){
    if ($scope.class === "showNav")
      $scope.class = "hideNav";
    else
      $scope.class = "showNav";
  };

});
