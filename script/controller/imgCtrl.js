'use strict';
app.controller('imgCtrl', ['$scope', '$rootScope', '$http', 'CookieService', '$location', '$cookies', '$cookieStore', '$state', ($scope, $rootScope, $http, CookieService, $location, $cookies, $cookieStore, $state) => {
	$http.get('http://192.168.119.178:8088/getPath').then((res) => {
		$scope.urls = res.data
		$scope.paths = []
		for (var i = 0; i < $scope.urls.length; i++) {
			var path = 'http://myinterface.hk1.tunnelfrp.cc/' + $scope.urls[i].url
			$scope.paths.push(path)
		}
		return
	})

	angular.element('#img').change((e) => {
		var imgReader = new FileReader()
		var img = e.target
		imgReader.onload = function() {
			var url = this.result
			angular.element('#result').attr('src', url)
		}
		imgReader.readAsDataURL(img.files[0])
	})

	$scope.toTarget = (index, event) => {
		var url = event.target
		console.log(url.attributes.src.nodeValue)
		$scope.ImageUrl = url.attributes.src.nodeValue
	}

	$scope.next = () => {
		if (angular.element('#mainImage')[0].attributes.src == undefined) {
			$scope.ImageUrl = $scope.paths[0]
		} else {
			if ($scope.paths.indexOf(angular.element('#mainImage')[0].attributes.src.nodeValue) < 0) {
				return
			} else {
				var nextImg = $scope.paths.indexOf(angular.element('#mainImage')[0].attributes.src.nodeValue) + 1
				$scope.ImageUrl = $scope.paths[nextImg]
			}
		}
	}

	$scope.pre = () => {
		if (angular.element('#mainImage')[0].attributes.src == undefined) {
			$scope.ImageUrl = $scope.paths[0]
		} else {
			if ($scope.paths.indexOf(angular.element('#mainImage')[0].attributes.src.nodeValue) < 0) {
				return
			} else {
				var nextImg = $scope.paths.indexOf(angular.element('#mainImage')[0].attributes.src.nodeValue) - 1
				$scope.ImageUrl = $scope.paths[nextImg]
				console.log($scope.ImageUrl)
				// if ($scope.ImageUrl = undefined) {
				// 	alert('已经是第一张了！')
				// 	return
				// }
			}
		}
	}
}])