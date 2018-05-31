(function() {
	
	function SupplierDetailController( $scope, $routeParams, supplierDB ){
		var ctrl = this;

		ctrl.editMode  = false;
		ctrl.expenseMode = false;

		ctrl.editSupplier = function( supplier ){
			if (supplier != null) {
				ctrl.supplier = supplier;
			}
			ctrl.editMode = true;
		};

		ctrl.update = function( supplier ){
			ctrl.supplier = supplier;
		};

		ctrl.$onInit = function(){
			var supplierId = $routeParams.supplierId;
			if( supplierId != 0){
				ctrl.supplier = supplierDB.getSupplier( supplierId );
			};
			supplierDB.expense_list( supplierId ,function( result_map ){
				ctrl.expenses = result_map;
			});
		}
	}

	angular
	.module('supplierDetail')
	.component('supplierDetail',{
		templateUrl : 'supplier/supplier-detail.template.html',
		controller : ['$scope', '$routeParams', 'supplierDB', SupplierDetailController],
		bindings : {
			supplier : '<',
			onClose  : '&',
			onEdit   : '&'
		}
	})

})();