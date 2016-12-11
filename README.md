# Basic Ionic application for beacons

I believe it will never work, if it works, I'm going to be surprised.


```
// factory for getting user profile from firebase based on uid

.factory("Profile", ["$firebaseObject",
  function($firebaseObject) {
    return function(uid) {
      // create a reference to the database node where we will store our data
      var ref = firebase.database().ref("users");
      var profileRef = ref.child(uid);

      // return it as a synchronized object
      return $firebaseObject(profileRef);
    }
  }
])


```
```
// retrieving uid, 'cannot read property uid of null' -- sometimes

$scope.user = Profile(firebase.auth().currentUser.uid);

```