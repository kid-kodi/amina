(function() {
	
	function CustomerEditController( $scope, customerDB ){
		var ctrl = this;

		ctrl.close = function(){
			ctrl.onClose();
		}

		ctrl.save = function(){
			if ( ctrl.customer._id ) {
				var customerId = ctrl.customer._id;
				delete ctrl.customer._id;
				customerDB.update( customerId, ctrl.customer, function( result_map ){
					ctrl.customer._id = customerId;
					ctrl.onSave({
						customer : ctrl.customer
					});
					ctrl.customer = ctrl.customer;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}
			else{
				customerDB.create( ctrl.customer, function( result_map ){
					ctrl.customer = result_map.ops[ 0 ];
					ctrl.onSave({
						customer : ctrl.customer
					});
					ctrl.customer = ctrl.customer;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}
		}

		ctrl.$onInit = function(){
			ctrl.users = customerDB.user_list();
		}
	}

	angular
	.module('customerEdit')
	.component('customerEdit',{
		templateUrl : 'customer/customer-edit.template.html',
		controller : ['$scope', 'customerDB', CustomerEditController],
		bindings : {
			customer : '<',
			onClose  : '&',
			onSave   : '&'
		}
	})

})();