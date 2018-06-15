(function() {
	
	function TopnavController( $scope, $translate, topnavDB){
		var ctrl = this;

		ctrl.setLanguage = function( langKey ){
			$translate.use(langKey);
		}


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
		controller : ['$scope', '$translate', 'topnavDB', TopnavController]
	})

})();