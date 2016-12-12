# Basic Ionic application for beacons

This is a template for ionic-beacon applications (hopefully)

Dashboard controller has an observer, which retrieves user ata from **firebase database** based on user's uid


``` javascript
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

```

##Things to do

1. Refactor code in `auth.controller.js`, so that it does not take any parameters and no values are assigned with email & pass
2. Understand why Profile service works without any use inside of the controller
3. add angularFire services to update user data