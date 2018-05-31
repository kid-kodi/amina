(function() {
	
	function TopnavController( $scope, topnavDB){
		var ctrl = this;


		ctrl.$onInit = function(){
			ctrl.user = topnavDB.user;
			topnavDB.getRole( function( role ){
				console.log( role.sysadmin );
				ctrl.role = role;
			});
		}
	}

	angular
	.module('topnavApp')
	.component('topnav',{
		templateUrl : 'topnav/topnav.template.html',
		controller : ['$scope', 'topnavDB', TopnavController]
	})

})();