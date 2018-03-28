'use strict';
app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
	$stateProvider
		.state('main', {
			url: '/main',
			templateUrl: 'views/template/main.html',
			controller: 'mainCtrl'
		}).state('logs', {
			url: '/logs',
			templateUrl: 'views/template/logs.html',
			controller: 'logsCtrl'
		}).state('login', {
			url: '/login',
			templateUrl: 'views/template/login.html',
			controller: 'loginCtrl'
		}).state('img', {
			url: '/img',
			templateUrl: 'views/template/img.html',
			controller: 'imgCtrl'
		}).state('write', {
			url: '/write',
			templateUrl: 'views/template/write.html',
			controller: 'writeCtrl'
		}).state('wechat', {
			url: '/wechat',
			controller: 'writeCtrl',
			templateUrl: 'views/template/wechat.html'
		}).state('sign', {
			url: '/sign',
			templateUrl: 'views/template/signup.html'
		}).state('resut', {
			url: '/result',
			templateUrl: 'views/template/test.html'
		}).state('detail', {
			url: '/detail',
			templateUrl: 'views/template/logdetail.html'
		}).state('record', {
			url: '/record',
			templateUrl: 'views/template/record.html'
		}).state('test', {
			url: '/test',
			templateUrl: 'sasa.html'
		})
	// $urlRouterProvider.otherwise('/login');
}])

app.run(['$rootScope', '$state', '$cookies', '$cookieStore', ($rootScope, $state, $cookies, $cookieStore) => {
	$rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
		if (toState.name == 'login' || toState.name == 'sign')
			return
		var user = $cookies.get('username')
		if (!user) {
			alert('你还没登录哦！请先登录')
			event.preventDefault()
			console.log(toState.name)
			$state.go("login", {
				from: fromState.name,
				w: 'notLogin'
			})
		}
	})
}])