(function() {
	
	function UserInfoController( $scope, $routeParams, userDB ){
		var ctrl = this;

		ctrl.editMode = false;

		ctrl.save = function(){
			var userId = ctrl.user._id;
			delete ctrl.user._id;
			userDB.update( userId, ctrl.user, function( result_map ){
				ctrl.user._id = userId;
				ctrl.user = ctrl.user;
				$scope.form.$setPristine();
				$scope.form.$setUntouched();
			});
			ctrl.editMode = false;
		};

		ctrl.$onInit = function(){
			var userId = $routeParams.userId;
			ctrl.user  = userDB.getUser( userId );
			ctrl.roles = userDB.getRoles( userId );
		}
	}

	angular
	.module('userInfo')
	.component('userInfo',{
		templateUrl : 'user/user-info.template.html',
		controller : ['$scope', '$routeParams', 'userDB', UserInfoController]
	})

})();