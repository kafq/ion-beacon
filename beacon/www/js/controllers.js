angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, GetUser) {
  $scope.user = GetUser;
})

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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('AuthController', function($scope, $state, CheckDatabase) {
  $scope.user = {};
 


   $scope.login = function (){
          $scope.user.email = document.getElementById('email').value;
      $scope.user.password = document.getElementById('password').value;

      firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        //TODO: translate messages
        switch (errorCode) {
          case 'auth/wrong-password':
            alert('Väärä salasana.');
            break;
          case 'auth/invalid-email':
            alert('Sähköposti ei kelpaa.');
            break;
          case 'auth/user-disabled':
            alert('Käyttäjätili on poissa käytöstä');
            break;
          case 'auth/user-not-found':
            alert('Käyttäjä ei löytynyt');
            break;
          default :
            alert(errorMessage);
            break;
          }
      });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          $state.go('tab.dash');
        } else {
       // No user is signed in.
        }
      });
    };
  $scope.CheckDatabase = CheckDatabase;
  console.log($scope.CheckDatabase);
})

.controller("ExampleController", function($scope, $rootScope, $ionicPlatform, $cordovaBeacon) {
 
    $scope.beacons = {};
    var currentstatus = $scope.statusNow;
    document.querySelector('.results').innerHTML = currentstatus;
  
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

    
   
});