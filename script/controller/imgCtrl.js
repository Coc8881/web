'use strict';
app.controller('imgCtrl', ['$scope','$http', function($scope,$http){
	$http.get('data/url.json').then(function(response){
		$scope.place=response.data.place;
	});
}]);