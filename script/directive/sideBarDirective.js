'use strict'
app.directive('sideBar',()=>{
	return{
		restrict:'E',
		templateUrl:'views/template/left_side_bar.html',
		// replace:true
	}
})