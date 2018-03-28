'use strict'
app.controller('loginCtrl', ['$scope', '$http', '$location', 'CookieService', '$rootScope', '$cookies', '$cookieStore', 'host', 'recordHost',($scope, $http, $location, CookieServic, $rootScope, $cookies, $cookieStore, host,recordHost) => {
	console.log(host.hostname)
	$scope.login = () => {
		var username = $scope.usr
		var passwd = $scope.pwd
		$http({
			url: host.hostname + '/login?',
			params:{ username:username,passwd:passwd },
			method: 'post',
			dataType:'json'
		}).then((res) => {
			if (res.data) {
				// alert('欢迎！' + res.data)
				var expireDate = new Date()
				expireDate.setDate(expireDate.getDate() + 1)
				$cookies.put('username', username, {
					'expires': expireDate
				})
				$rootScope.user = $cookies.get('username')
				$http.post(recordHost.hostname+'/record?cookies='+$rootScope.user+'&username='+$rootScope.user).then((res)=>{
					console.log(res)
				})
				$location.path('/write')
			} else {
				console.log(res.data)
				alert('此用户不存在！请检查！')
			}
		})
	}
}])