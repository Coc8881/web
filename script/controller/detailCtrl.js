'use strict'
app.controller('detailCtrl', ['$scope','$http', 'getdata',($scope,$http,getdata)=>{
	$http.get('http://192.168.0.139:8800/findlogid?id=21').then((res)=>{
		console.log(res.data)
	})
}])