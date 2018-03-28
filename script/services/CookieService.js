'use strict'
//设置全局cookies
app.service('CookieService', ['$cookies','$cookieStore','$location','$rootScope', function($cookies,$cookieStore,$location,$rootScope){
	this.setCookies = (username,passwd)=>{
		$rootScope.user = $cookies.put('username',username)
		$cookies.put('passwd',passwd)
	}
	this.getCookiesUsername = (cookieName)=>{
		var usernameCookies = $cookies.get('username')
		// console.log(usernameCookies)
		if (usernameCookies = undefined) {
			return false
		}else{
			return true
		}
	}
	this.getCookiesPasswd = (cookieName)=>{
		var passwdCookies = $cookies.get('passwd')
		console.log(passwdCookies)
		return passwdCookies
	}
	this.checkCookiesExist = (cookieName)=>{
		var usernameCookies =  $cookies.get('username')
		console.log(usernameCookies)
		if (usernameCookies==undefined) {
			$location.path('/login')
		}else{
			$location.path('/main')
		}
	}
}])