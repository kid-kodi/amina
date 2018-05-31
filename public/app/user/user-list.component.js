(function() {
	
	function UserListController( userDB ){
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

		

		ctrl.editUser = function( user ){
			ctrl.user = null;
			if ( user != undefined ) {
				ctrl.user = user;
			}
			ctrl.editMode = true;
		};

		ctrl.update = function( user ){
			if ( user._id ) {
				ctrl.list = removeFromArray(ctrl.list, user);
			}
			ctrl.list.push( user );
		};

		ctrl.gotoUser = function( user ){
			ctrl.user = user;
			ctrl.detailMode = true;
		};

		ctrl.$onInit = function(){
			ctrl.user   = null;
			ctrl.editMode   = false;
			ctrl.detailMode = false;

			userDB.get_list( function( users ){
				ctrl.list = users;
			});
		}
	}

	angular
	.module('userList')
	.component('userList',{
		templateUrl : 'user/user-list.template.html',
		controller : ['userDB', UserListController]	
	})

})();