(function() {
	
	function ExpenseSuppliersController( $scope, expenseDB, $routeParams ){
		var ctrl = this;

		ctrl.editMode   = false;

		ctrl.close = function(){
			ctrl.onClose();
		}

		ctrl.$onInit = function(){
			// var supplierId = $routeParams.supplierId;
			ctrl.list = expenseDB.suppliers();
		}
	}

	angular
	.module('expenseSuppliers')
	.component('expenseSuppliers',{
		templateUrl : 'expense/expense-suppliers.template.html',
		controller : ['$scope', 'expenseDB', '$routeParams', ExpenseSuppliersController],
		bindings : { onClose  : '&'}
	})

})();