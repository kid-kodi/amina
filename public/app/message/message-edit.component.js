(function() {
	
	function MessageEditController( $scope, messageDB, $routeParams ){
		var ctrl = this;

		ctrl.close = function(){
			ctrl.onClose();
		}

		ctrl.save = function(){
			if ( ctrl.message._id ) {
				var messageId = ctrl.message._id;
				delete ctrl.message._id;
				messageDB.update( messageId, ctrl.message, function( result_map ){
					ctrl.message._id = messageId;
					ctrl.onSave({
						message : ctrl.message
					});
					ctrl.message = ctrl.message;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}
			else{
				messageDB.create( ctrl.message, function( result_map ){
					ctrl.message = result_map.ops[ 0 ];
					ctrl.onSave({
						message : ctrl.message
					});
					ctrl.message = ctrl.message;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}
		}

		ctrl.$onInit = function(){
			// var messageId = $routeParams.messageId;
			// ctrl.message = messageDB.getMessage( messageId );
		}
	}

	angular
	.module('messageEdit')
	.component('messageEdit',{
		templateUrl : 'message/message-edit.template.html',
		controller : ['$scope', 'messageDB', '$routeParams', MessageEditController],
		bindings : {
			message : '<',
			onClose  : '&',
			onSave   : '&'
		}
	})

})();