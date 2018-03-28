'use strict';
app.controller('writeCtrl', ['$scope','$http','$location','host', ($scope,$http,$location,host) => {
	$scope.submit = () => {
		var title = $scope.title
		var context1 = angular.element("div [id^='taTextElement']").html()
		//处理内容
		var context = context1
			.replace(/&nbsp;/gi, ' ')
			.replace(/&gt/gi, '>')
			.replace(/&lt/gi, '<')
			.replace(/&amp/gi, '')
			.replace(/&/gi, '&amp;')
			.replace(/'/gi, '"')
		$scope.content = context
		// console.log('context1:' + context1)
		console.log('context:' + context)
		$http.post(host.hostname + '/note?title=' + title + '&content=' + $scope.content).then((info) => {
			alert('提交成功！')
			$location.path('/logs')
		})
	}
	//clear content
	$scope.clear = () => {
		$scope.title = ''
		$scope.content = ''
		angular.element("div [id^='taTextElement']").html('')
	}
}])