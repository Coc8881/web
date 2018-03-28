<<<<<<< HEAD
'use strict'
app.controller('logsCtrl', ['$scope', '$http', 'CookieService', 'host', ($scope, $http, CookieService, host) => {
	var getall = (pageNumStr) => {
		$http.get(host.hostname + '/logslist?pageNum=1').then((res) => {
			$scope.logs = res.data
			console.log($scope.logs)
			return
		})
	}
	var get = () => {
		var title = $scope.findmsg
		$http.post(host.hostname + '/findlogbytitle?title=' + title).then((res) => {
			$scope.logs = res.data
			return
		})
	}

	var todetail = (index, event) => {
		$scope.showeditor = true
		$scope.hidepagination = true
		console.log(index)
		console.log(event.target.innerHTML)
		var id = event.target.innerHTML

		$http.post(host.hostname + '/findlogbyid?id=' + id).then((res) => {
			$scope.details = res.data[0]
			var content1 = res.data[0].content
			var content = content1
				// .replace(/<br>/gi, '\r\n')
				// .replace(/<\/pre>/gi, '')
				// .replace(/<p>/gi, '    ')
				// .replace(/<pre>/gi, '')
				// .replace(/<b>/gi, '')
				// .replace(/<\/b>/gi, '')
				// .replace(/<h*>/gi, '')
				// .replace(/<\/h*>/gi, '')
				// .replace(/<\/p>/gi, '\r\n')
				// .replace(/<!--StartFragment-->/gi, '')
				// .replace(/<!--EndFragment-->/gi, '')
				// .replace(/<strong>/gi, '')
				// .replace(/<\/strong>/gi, '')
				// .replace(/<blockquote>/, '    ')
				// .replace(/<\/blockquote>/, '    ')
				.replace(/<;/gi, '<')
				.replace(/>;/gi, '>')
			$scope.text = content
		})
		return
	}
	var todetailbytitle = (event) => {
		$scope.showeditor = true
		$scope.hidepagination = true
		var title = event.target.innerHTML
		$http.post(host.hostname + '/findlogbytitle?title=' + title).then((res) => {
			$scope.details = res.data[0]
			var content1 = res.data[0].content
			var content = content1
				// .replace(/<br>/gi, '\r\n')
				// .replace(/<\/pre>/gi, '')
				// .replace(/<p>/gi, '    ')
				// .replace(/<pre>/gi, '')
				// .replace(/<b>/gi, '')
				// .replace(/<\/b>/gi, '')
				// .replace(/<h*>/gi, '')
				// .replace(/<\/h*>/gi, '')
				// .replace(/<\/p>/gi, '\r\n')
				// .replace(/<!--StartFragment-->/gi, '')
				// .replace(/<!--EndFragment-->/gi, '')
				// .replace(/<strong>/gi, '')
				// .replace(/<\/strong>/gi, '')
				// .replace(/<blockquote>/, '    ')
				// .replace(/<\/blockquote>/, '    ')
				.replace(/<;/gi, '<')
				.replace(/>;/gi, '>')
			console.log(content)
			$scope.text = content
		})
	}

	var closeeditor = () => {
		$scope.showeditor = false
		$scope.hidepagination = false
		return
	}

	$scope.getchangedtext = () => {
		var newtext = $scope.text
		return
	}

	$scope.updatelog = () => {
		var idstr = $scope.details.id
		var content = $scope.text
		console.log(idstr)
		console.log(content)
		$http.post(host.hostname + '/edit?id=' + idstr + '&content=' + content).then(() => {
			alert('发布成功！')
			$scope.closeeditor()
		})
		return
	}

	$scope.pagenums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	$scope.changepage = (event) => {
		var pageNum = event.target.innerHTML
		$http.get(host.hostname + '/logslist?pageNum=' + pageNum).then((res) => {
			if (res.data.length == 0) {
				alert('没有更多的记录啦！即将返回第一页！')
				getall()
			}
			$scope.logs = res.data
		})
	}

	$scope.isEditable = true
	$scope.Editorenable = () => {
		$scope.isEditable = false
	}

	CookieService.getCookiesUsername()
	CookieService.checkCookiesExist()
	getall()
	$scope.closeeditor = closeeditor
	$scope.todetailbytitle = todetailbytitle
	$scope.find = get
	$scope.findall = getall
	$scope.todetail = todetail
}])
=======
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
>>>>>>> 8cc07d4f3b2eacc9b2e20d345b690e69be08805a
