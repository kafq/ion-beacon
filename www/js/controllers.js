angular.module('starter.controllers', ['firebase'])

.controller('DashCtrl', [ '$scope', 'Profile', '$firebaseObject', '$state', function($scope, $firebaseObject, $state) {
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var currentUser = firebase.auth().currentUser;
      var uid = currentUser.uid;
      $scope.user = $firebaseObject(uid);
  
    } else {
      // No user is signed in.
    }
  });

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
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
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

.controller("ExampleController", function($scope, $rootScope, $ionicPlatform, $cordovaBeacon) {
 
    $scope.beacons = {};  
  
    $ionicPlatform.ready(function() {
 
        $cordovaBeacon.requestWhenInUseAuthorization();
 
        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
            var uniqueBeaconKey;
            for(var i = 0; i < pluginResult.beacons.length; i++) {
                uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
                $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
            }
            $scope.$apply();
        });
 
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "B9407F30-F5F8-466E-AFF9-25556B57FE6D"));
 
    });

    console.log('Got this day -- ' + $scope.thisDay);
});