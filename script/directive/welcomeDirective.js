'use strict'
app.directive('welCome',()=>{
	return{
		restrict:'E',
		templateUrl:'views/template/welcome.html',
		replace:true
	}
})