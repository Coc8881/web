'use strict'
app.controller('signupCtrl', ['$scope','$http','$location','host',($scope,$http,$location,host)=>{
	$scope.sigup = ()=>{
	  var username = $scope.usr
	  var passwd = $scope.pwd
		if ($scope.signForm.username.$invalid && $scope.signForm.username.$touched) {
			alert('用户名格式不正确！')
			return
		}

		$http({
			url:host.hostname+'/signup?&username='+username+'&passwd='+passwd,
			method:'post'
		}).then((res)=>{
			if (res.data) {
				alert('注册成功！')
				$location.path('/login');
			}else{
				alert('注册失败！可能用户名已存在')
			}
		})
	}
}])