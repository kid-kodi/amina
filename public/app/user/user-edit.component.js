(function() {
	
	function UserEditController( $scope, userDB ){
		var ctrl = this;

		ctrl.roles = userDB.role_list();

		ctrl.close = function(){
			ctrl.onClose();
		}

		ctrl.save = function(){
			if ( ctrl.user._id ) {
				var userId = ctrl.user._id;
				delete ctrl.user._id;
				userDB.update( userId, ctrl.user, function( result_map ){
					ctrl.user._id = userId;
					ctrl.onSave({
						user : ctrl.user
					});
					ctrl.user = ctrl.user;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}
			else{
				userDB.create( ctrl.user, function( result_map ){
					ctrl.user = result_map.ops[ 0 ];
					ctrl.onSave({
						user : ctrl.user
					});
					ctrl.user = ctrl.user;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}

		}
	}

	angular
	.module('userEdit')
	.component('userEdit',{
		templateUrl : 'user/user-edit.template.html',
		controller : ['$scope', 'userDB', UserEditController],
		bindings : {
			user : '<',
			onClose  : '&',
			onSave   : '&'
		}
	})

})();