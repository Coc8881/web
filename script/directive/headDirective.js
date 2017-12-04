'use strict';
app.directive('uiHead',function(){
	return{
		restrict:'E',
		templateUrl:'views/template/head.html',
		replace:true
	}
});