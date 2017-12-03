app.controller('logsCtrl', ['$scope', function($scope){
	$scope.logs=[{
		"id":"1",
		"title":"javascript闭包",
		"time":"2017-12-03 12:05",
		"status":"待审核"
	},{
		"id":"2",
		"title":"javascript生命钩子",
		"time":"2017-12-05 09:05",
		"status":"已上传"
	}];
}]);