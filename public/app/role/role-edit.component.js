(function() {
	
	function RoleEditController( $scope, roleDB ){
		var ctrl = this;

		ctrl.close = function(){
			ctrl.onClose();
		}

		ctrl.save = function(){
			if ( ctrl.role._id ) {
				var roleId = ctrl.role._id;
				delete ctrl.role._id;
				roleDB.update( roleId, ctrl.role, function( result_map ){
					ctrl.role._id = roleId;
					ctrl.onSave({
						role : ctrl.role
					});
					ctrl.role = ctrl.role;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}
			else{
				roleDB.create( ctrl.role, function( result_map ){
					ctrl.role = result_map.ops[ 0 ];
					ctrl.onSave({
						role : ctrl.role
					});
					ctrl.role = ctrl.role;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}

		};

		ctrl.$onInit = function(){
			if ( ctrl.role == null ) {
				ctrl.role = roleDB.new_role();
			}
			ctrl.permissions = roleDB.permissions();
		}
	}

	angular
	.module('roleEdit')
	.component('roleEdit',{
		templateUrl : 'role/role-edit.template.html',
		controller : ['$scope', 'roleDB', RoleEditController],
		bindings : {
			role : '<',
			onClose  : '&',
			onSave   : '&'
		}
	})

})();