(function() {
	
	function CustomerDetailController( $scope, $routeParams, customerDB ){
		var ctrl = this;

		ctrl.editMode  = false;
		ctrl.saleMode = false;

		ctrl.editCustomer = function( customer ){
			if (customer != null) {
				ctrl.customer = customer;
			}
			ctrl.editMode = true;
		};

		ctrl.update = function( customer ){
			ctrl.customer = customer;
		};

		ctrl.$onInit = function(){
			var customerId = $routeParams.customerId;
			if( customerId != 0){
				ctrl.customer = customerDB.getCustomer( customerId );
			};
			customerDB.sale_list( customerId ,function( result_map ){
				ctrl.sales = result_map;
			});
		}
	}

	angular
	.module('customerDetail')
	.component('customerDetail',{
		templateUrl : 'customer/customer-detail.template.html',
		controller : ['$scope', '$routeParams', 'customerDB', CustomerDetailController],
		bindings : {
			customer : '<',
			onClose  : '&',
			onEdit   : '&'
		}
	})

})();