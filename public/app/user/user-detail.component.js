(function() {
	
	function UserDetailController( $scope, $routeParams, userDB ){
		var ctrl = this;

		ctrl.editMode = false;


		ctrl.$onInit = function(){
			var userId = $routeParams.userId;

			ctrl.user  = userDB.getUser( userId );
		}
	}

	angular
	.module('userDetail')
	.component('userDetail',{
		templateUrl : 'user/user-detail.template.html',
		controller : ['$scope', '$routeParams', 'userDB', UserDetailController]
	})

})();