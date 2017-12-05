'use strict';
app.controller('logsCtrl', ['$scope','$http', function($scope,$http){
<<<<<<< HEAD
	$http.get('data/logs.json').then(function (response) {
		$scope.logs = response.data.logs;
	});
=======
	$http.get('data/logs.json').then(function (response) {$scope.logs = response.data.logs;});
>>>>>>> 839b74c0bd67c4b556cf7ab32b5f9af7c58be34b
}]);