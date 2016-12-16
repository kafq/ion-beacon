angular.module('starter.controllers', ['firebase'])

.controller('DashCtrl', [ '$scope', 'Profile', '$firebaseObject', '$firebaseArray', '$state', function($scope, $firebaseObject, $firebaseArray, $state) {
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var currentUser = firebase.auth().currentUser;
      var uid = currentUser.uid;
      $scope.uid = currentUser.uid;
      $scope.user = $firebaseObject(uid);
      var itemsRef = firebase.database().ref('users/' + uid + '/todolist/');
      $scope.todos = $firebaseArray(itemsRef); 
  
    } else {
      // No user is signed in.
    }
  });


$scope.saveTodo = function(newTodoItem) {

    var ref = firebase.database().ref().child("users").child($scope.uid).child("todolist");
    ref.push().set({
      text: newTodoItem.text,
      due: newTodoItem.due
    });
  };

}])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  var chatRef = firebase.database().ref();
  var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));
  
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // If the user is logged in, set them as the Firechat user
          chat.setUser(user.uid, user.name);
        } 
      });
  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $state, Proximiio) { 
$scope.entered = "Discovering..."; 
$scope.output = "Waiting..."; 
$scope.inputType = "Discovering..."; 
$scope.inputObject = "Discovering..."; 
$scope.lastPositionLatitude = "Discovering..."; 
$scope.lastPositionLongitude = "Discovering..."; 

ionic.Platform.ready(function() { 

var outputTriggerCallback = function(output) { 
$scope.output = output; 
$scope.$apply() 
}; 

var inputTriggerCallback = function(entered, geofence) { 
$scope.entered = entered; 
$scope.inputType = geofence.name; 
$scope.lastPositionLatitude = geofence.area.lat; 
$scope.lastPositionLongitude = geofence.area.lon; 
$scope.inputObject = geofence; 
$scope.$apply(); 
}; 

var positionChangeCallback = function(coords) { 
$scope.lastPositionLatitude = coords.coordinates.lat; 
$scope.lastPositionLongitude = coords.coordinates.lon; 
$scope.$apply(); 
}; 

Proximiio.init(outputTriggerCallback, inputTriggerCallback, positionChangeCallback); 
}); 

})

.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {

// Triggered on a button click, or some other target
$scope.showPopup = function() {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input ng-model="data.wifi">',
    title: 'Enter the proper reason for absence',
    subTitle: 'Please be ready to provide evidence',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Send</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters reason
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });

  
 };

 
})

.controller('SupportCtrl',function($scope, $ionicPopup, $timeout) {

// Triggered on a button click, or some other target
$scope.showPopup = function() {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input ng-model="data.wifi">',
    title: 'Please describe the problem',
    subTitle: 'We will contact you if necessary',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Send</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters reason
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });

  
 };

 
});


