'use strict';
app.controller('logsCtrl', ['$scope','$http', function($scope,$http){
	$http.get('data/logs.json').then(function (response) {
		$scope.logs = response.data.logs;
	});
}]);