(function() {
	
	function SaleCustomersController( $scope, customerDB, $routeParams ){
		var ctrl = this;

		ctrl.editMode   = false;

		ctrl.close = function(){
			ctrl.onClose();
		}

		ctrl.$onInit = function(){
			// var customerId = $routeParams.customerId;
			customerDB.get_list( null, function( result_list ){
				ctrl.list = result_list;
				console.log( result_list );
			});
		}
	}

	angular
	.module('saleCustomers')
	.component('saleCustomers',{
		templateUrl : 'sale/sale-customers.template.html',
		controller : ['$scope', 'customerDB', '$routeParams', SaleCustomersController],
		bindings : { onClose  : '&'}
	})

})();