# Basic Ionic application for beacons

## Installation 

run the following commands:
  
  `npm install`

  `ionic plugin add https://github.com/proximiio/proximiio-cordova.git`

## Description

The application is a todo application based on the location of the employee in the office. **Beacons** are used to divide the whole space into various departments, allowing users to asign their tasks to them.

## Just a code sample

Retrieving firebase object synchronized with Firebase database

``` javascript
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
```