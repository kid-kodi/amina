(function() {
	
	function UserController( $scope, AlertService, db ){
		var ctrl = this;

		ctrl.save = function(){
			if ( ctrl.user._id ) {
				alert();
				var userId = ctrl.user._id;
				delete ctrl.user._id;
				db.user.update( {id:userId}, ctrl.user, function( result_map ){
					ctrl.user._id = userId;
					AlertService.Success('User information updated', false);
				});
			}
			else{
				db.user.create( ctrl.user, function( result_map ){
					ctrl.user = result_map.ops[ 0 ];
					AlertService.Success('User information saved', false);
				});
			}
		};

		ctrl.$onInit = function(){
			db.user.query().$promise.then( function( user_map ){
				ctrl.user = user_map[ 0 ];
			})
		}
	}

	angular
	.module('user')
	.component('user',{
		templateUrl : 'user/user.template.html',
		controller : ['$scope', 'AlertService', 'db', UserController]
	})

})();