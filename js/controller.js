angular.module('app').controller('ctrl', function($scope, $state, $firebaseArray, svc, roomRef, authRef, roomsRef, $stateParams, loginSvc){

//random bool function for the sometimes y removal
  function randBool(){
 return Math.floor(Math.random()*2);
}

//hide modal normally, click name to toggle modal
$scope.modalShown = false;
$scope.modalShow = function(chat){
  if($scope.modalShown) {
    $scope.modalShown = false;
  } else {
    $scope.modalInfo = chat;
    $scope.modalShown = true;
  }
};

//function that removes vowels and even sometimes y
function deVowel(str) {
  var ret = '';
  if (!str) {return true;}
  else {
  for (var i=0; i<str.length; i++) {
    if ((/y/i.test(str[i]) && randBool()) || /[aeiou]/i.test(str[i])) {
      ret[i] += '';
    } else {
      ret += str[i];
    }
  }
  return ret;
}
}

//disable chat input if there are only vowels
$scope.noChat = false;
$scope.chatVowelChecker = function (){
  if ($scope.chatText) {
    if (deVowel($scope.chatText).length === 0) {
      $scope.noChat = true;
    } else {
      $scope.noChat = false;
    }
  } else if (!$scope.chatText) {
    $scope.noChat = false;
  }
};

//authData for ng-ifs on chat page
$scope.authData = authRef;

// first we get the rooms and room content to fill the rooms sidebar
$scope.rooms = $firebaseArray(roomsRef);
$scope.room = $firebaseArray(roomRef);

//makes array of current room names so people can't overwrite existing rooms
var roomsList = [];
  $scope.rooms.$loaded().then(function(rooms){
    rooms.forEach(function(a){
        roomsList.push(a.name);
    });
  });

//this creates a new room
    $scope.createRoom = function() {
    var room = deVowel(this.roomTitle);
    $scope.rooms.$add({name: room});
    this.roomTitle = '';
    $scope.showAdd = false;
};

//this adds a chat to the open room with a fancy firebase timestamp, we add roomcheck from the channelchecker function because of sometimes y
  $scope.chat = function () {
    var newestText = deVowel($scope.chatText);
    $scope.room.$add({text: newestText,
                      time: Firebase.ServerValue.TIMESTAMP,
                      name: $scope.authData.password.email,
                      profileImg: $scope.authData.password.profileImageURL});
        $scope.chatText = '';
  };

//initially hide the add channel input
$scope.showAdd = false;

//disable channel input box if channel already exists or if someone tries to input symbols
  $scope.exist = false;
  $scope.channelStat = false;
  $scope.channelSymbols = false;
  $scope.vowels = false;
  $scope.channelChecker = function(){
   var that = this;
   var roomCheck = deVowel(that.roomTitle);
    that.channelStat = false;
    that.vowels = false;
    that.channelSymbols = /[^A-Za-z0-9\s]/g.test(roomCheck);
    roomsList.forEach(function(a){
      if (a === roomCheck) {
        that.channelStat = true;
        that.exist = true;
      } else if (!roomCheck) {
        that.vowels = true;
      }
      });
  };

  //animting sidebar for small screens
  $scope.class = "hideNav";
  $scope.changeClass = function(){
    if ($scope.class === "showNav")
      $scope.class = "hideNav";
    else
      $scope.class = "showNav";
  };

//lets us put the current room in the top bar
  $scope.currentRoom = $stateParams.roomName;

  //for logout button
$scope.logout = function(){
  loginSvc.logout();
  $state.go('landing');
};

//let users know why they can't add channels or chat
$scope.loginToChat = false;
$scope.loginToAdd = false;

});
