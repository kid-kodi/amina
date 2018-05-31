(function() {
	
	function RoleDetailController( $scope, roleDB ){
		var ctrl = this;

		ctrl.editMode = false;

		ctrl.editExpense = function( expense ){
			if (expense != null) {
				ctrl.expense = expense;
			}
			ctrl.editMode = true;
		};

		ctrl.close = function(){
			ctrl.role  = null;
			ctrl.users = [];
			ctrl.onClose();
		}

		ctrl.editRole = function(){
			ctrl.onEdit({ role : ctrl.role });
		}

		ctrl.$onInit = function(){
			roleDB.user_list( ctrl.role.name ,function( result_map ){
				ctrl.users = result_map;
			});
		}
	}

	angular
	.module('roleDetail')
	.component('roleDetail',{
		templateUrl : 'role/role-detail.template.html',
		controller : ['$scope', 'roleDB', RoleDetailController],
		bindings : {
			role : '<',
			onClose  : '&',
			onEdit   : '&'
		}
	})

})();