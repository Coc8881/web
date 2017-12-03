'use strict';
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
	$stateProvider.state('main',{
		url:'/main',
		templateUrl:'views/template/main.html',
		controller:'mainCtrl'
	}).state('logs',{
		url:'/logs',
		templateUrl:'views/template/logs.html',
		controller:'logsCtrl'
	}).state('login',{
		url:'/login',
		templateUrl:'views/template/login.html',
		controller:'loginCtrl'
	}).state('img',{
		url:'/img',
		templateUrl:'views/template/img.html',
		controller:'imgCtrl'
	}).state('write',{
		url:'/write',
		templateUrl:'views/template/write.html',
		controller:'writeCtrl'
	}).state('wechat',{
		url:'wechat',
		templateUrl:'views/template/wechat.html'
	});
}])