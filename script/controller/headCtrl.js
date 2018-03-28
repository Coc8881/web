'use strict';
app.controller('headCtrl', ['$scope','$cookies','$location','$rootScope',function($scope,$cookies,$location,$rootScope){
	$scope.show = false
	$scope.showtips = ()=>{
		$scope.show = true
	}
	$scope.hidetips = ()=>{
		$scope.show = false
	}
	$scope.username = $cookies.get('username')
	$scope.logout = ()=>{
		if ($cookies.get('username')) {
			$cookies.remove('username')
			$location.path('/login')
			$scope.username = ''
		}else{
			alert('请先登录！')
		}

	}
}])