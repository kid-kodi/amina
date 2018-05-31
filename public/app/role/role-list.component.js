(function() {
	
	function RoleListController( roleDB ){
		var ctrl = this;
		ctrl.editMode   = false;
		ctrl.detailMode = false;

		var removeFromArray = function(array, value) {
		    var idx = array.indexOf(value);
		    if (idx !== -1) {
		        array.splice(idx, 1);
		    }
		    return array;
		}

		ctrl.list = roleDB.get_list();

		ctrl.editRole = function( role ){
			ctrl.role = null;
			if ( role != undefined ) {
				ctrl.role = role;
			}
			ctrl.editMode = true;
		};

		ctrl.update = function( role ){
			if ( role._id ) {
				ctrl.list = removeFromArray(ctrl.list, role);
			}
			ctrl.list.push( role );
		};

		ctrl.gotoRole = function( role ){
			ctrl.role = role;
			ctrl.detailMode = true;
		};

		ctrl.$onInit = function(){
			ctrl.role   = null;
			ctrl.editMode   = false;
			ctrl.detailMode = false;
		}
	}

	angular
	.module('roleList')
	.component('roleList',{
		templateUrl : 'role/role-list.template.html',
		controller : ['roleDB', RoleListController]	
	})

})();