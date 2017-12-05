<<<<<<< HEAD
'use strict';
app.controller('imgCtrl', ['$scope','$http', function($scope,$http){
	$http.get('data/url.json').then(function(response){
		$scope.place=response.data.place;
	});
=======
'use strict'
app.controller('imgCtrl', ['$scope', function($scope){
	
>>>>>>> 839b74c0bd67c4b556cf7ab32b5f9af7c58be34b
}]);