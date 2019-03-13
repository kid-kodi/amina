(function() {
	
	function MessageListController( messageDB, $routeParams ){
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

		ctrl.editMessage = function( message ){
			ctrl.message = null;
			if ( message != undefined ) {
				ctrl.message = message;
			}
			ctrl.editMode = true;
		};

		ctrl.update = function( message ){
			if ( message._id ) {
				ctrl.list = removeFromArray(ctrl.list, message);
			}
			ctrl.list.unshift( message );
		};

		ctrl.gotoMessage = function( message ){
			ctrl.message = message;
			ctrl.detailMode = true;
		};

		ctrl.$onInit = function(){

			ctrl.message   = null;
			ctrl.editMode   = false;
			ctrl.detailMode = false;

			messageDB.get_list( $routeParams.list, function( result_list ){
				ctrl.list = result_list;
			});

			ctrl.customers = messageDB.customers();
		}
	}

	angular
	.module('messageList')
	.component('messageList',{
		templateUrl : 'message/message-list.template.html',
		controller : ['messageDB', '$routeParams', MessageListController]	
	})

})();