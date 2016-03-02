angular.module('app').controller('ctrl', function(fb, $scope, $state, $firebaseArray, $firebaseObject, svc, roomRef, authRef, roomsRef, $stateParams, loginSvc){

  //authData for ng-ifs on chat page
  $scope.authData = authRef;

  //for getting the username
  if($scope.authData) {
    var userRef = new Firebase(fb.url + '/users/' + $scope.authData.uid);
    $scope.userInfo = $firebaseObject(userRef);
    // for online user detection moved here to avoid errors with users not being logged in
    var userOn = new Firebase(fb.url + '/presence/' + $scope.authData.uid);
  }

//for how many users online, log length of arr to see # of users
var amOnline = new Firebase(fb.url + '/.info/connected');
amOnline.on('value', function(snapshot) {
  if (snapshot.val()) {
    userOn.onDisconnect().remove();
    userOn.set(true);
  }
});
$scope.onlineUsers = $firebaseArray(svc.onlineUsers());
//random bool function for the sometimes y removal
  function randBool(){
 return Math.floor(Math.random()*2);
}

//hide modal normally, click name to toggle modal
$scope.modalShown = false;
$scope.modalShow = function(chat){
  var temp = chat;
    $scope.modalShown = !$scope.modalShown;
    temp.time = new Date(chat.time);
    $scope.modalInfo = temp;
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

// first we get the rooms and room content to fill the rooms sidebar
$scope.rooms = $firebaseArray(roomsRef);
$scope.room = $firebaseArray(roomRef);

//delete chat function
$scope.delete = function(id){
  if (confirm("Delete post?") === true) {
    $scope.room.$remove(id);
  }
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
    var room = deVowel(this.roomTitle);
    $scope.rooms.$add({name: room});
    this.roomTitle = '';
    $scope.showAdd = false;
};

//this adds a chat to the open room with a fancy firebase timestamp, we add roomcheck from the channelchecker function because of sometimes y
//also regex checks for gif(search terms) and if it exists adds it to the post
  $scope.chat = function () {
    var newestText = deVowel($scope.chatText);
    var regex = /(gif\()(\w+( \w+)*)(\))/g;
    var match = regex.exec($scope.chatText);
    if (match) {
      svc.searchG(match[2]).then(function(response){
      $scope.room.$add({text: newestText,
                        time: Firebase.ServerValue.TIMESTAMP,
                        username: $scope.userInfo.name,
                        name: $scope.authData.password.email,
                        profileImg: $scope.authData.password.profileImageURL,
                        gif: response});});
          $scope.chatText = '';
    } else {
    $scope.room.$add({text: newestText,
                      time: Firebase.ServerValue.TIMESTAMP,
                      username: $scope.userInfo.name,
                      name: $scope.authData.password.email,
                      profileImg: $scope.authData.password.profileImageURL});
        $scope.chatText = '';
      }
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
  $state.go('rooms');
};

//let users know why they can't add channels or chat
$scope.loginToChat = false;
$scope.loginToAdd = false;

});
