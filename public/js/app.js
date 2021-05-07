
var app = angular.module('userApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider 
      .when('/', {
          templateUrl : 'partials/login.html',    // route for the home page
          controller : 'loginCtrl'
      })
	  .when('/home', {
          templateUrl : 'partials/login.html',    // route for the home page
          controller : 'loginCtrl'
      })
      .when('/edit_flavor', {
          templateUrl : 'partials/edit_flavor.html',    // edit a car record
          controller : 'editCtrl'
      })
      .otherwise({
          redirectTo: 'partials/login.html'        // any other URL goes to home
      });
});


          /*   a controller for each page  */
		  
app.controller('loginCtrl', function($scope, $http) {
  
   $scope.login = function() {      
	   
	   var user_credentials = { 
	       username : $scope.username,
	       password : $scope.password    // normally, passwords would be hashed
	   }
	   
	   url = "/login"
	   
	   $http.post(url, user_credentials)      // post user credentials
          .then(function (response) {
			  $scope.status = response.data;   //print status of request
       });   
   };
});		  


app.controller('editCtrl', function($scope, $http) {  // edit miles or price of record
   
   $http.get('/getUser')              // executes when edit page loads
   		.then(function (response) {
			if(response.data == "Not logged in")
			     $scope.status = "Please Log In"
			else {
				info = response.data;
			 	$scope.username = info.username
			 	$scope.preference = info.preference
			 	//console.log(info)
			}
   });
   
   
   $scope.updateFlavor = function() {
	   
	   var info = {
	      username : $scope.username,
	      flavor : $scope.flavor
	  }
	   
	   url = "/updateFlavor";
	   $http.post(url, info)
          .then(function (response) {
			 $scope.status = response.data;
			 if($scope.status == "Flavor updated") {
			      $scope.preference = info.flavor
			 }
      });
	   
   }
   
});

