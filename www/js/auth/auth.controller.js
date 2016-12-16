angular.module('starter.auth.controller', []) 
	.controller('AuthController', function($scope, $state, Auth) {

	var ref = firebase.database().ref();	
	$scope.user = {};

	$scope.login = function(){
	
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

	  $scope.register = function(){

	      $scope.message = null;
	      $scope.error = null;

	      Auth.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password, $scope.user.name, $scope.user.department)
	      	.then(function(user) {
	      		$scope.message = "user was created with: "+ user.uid;
	      	}).catch(function(error) {
	      		$scope.error = error;
	      	});


	      firebase.auth().onAuthStateChanged(function(user, uid) {
	        
	        if (user) {
	        // User is signed in.
	          var uid = $scope.user.uid;
	          // Create current user reference
	          var user = firebase.auth().currentUser;
	          var uid = user.uid;

	          firebase.database().ref('users/' + uid).set({
	            email: $scope.user.email,
	            name: $scope.user.name,
	            department: $scope.user.department,
	            todolist: [
	            {text: 'You can create todo items here, just enter your task description and press the plus icon', due: '20:00', isImportant: false}
	            ]
	          });

	          $state.go('tab.dash');
	      } else {
	        // No user is signed in.
	      }
	      
	      });
	  }

	  $scope.logOut = function () {
	    alert('Olit kirjautunut ulos');

	    firebase.auth().signOut().then(function() {
	     // Sign-out successful.
	     $state.go('login');
	    }, function(error) {
	  // An error happened.
	    });

	  }
	  
	 
});
