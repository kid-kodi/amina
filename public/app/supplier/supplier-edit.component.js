(function() {
	
	function SupplierEditController( $scope, supplierDB ){
		var ctrl = this;

		ctrl.close = function(){
			ctrl.onClose();
		}

		ctrl.save = function(){
			if ( ctrl.supplier._id ) {
				var supplierId = ctrl.supplier._id;
				delete ctrl.supplier._id;
				supplierDB.update( supplierId, ctrl.supplier, function( result_map ){
					ctrl.supplier._id = supplierId;
					ctrl.onSave({
						supplier : ctrl.supplier
					});
					ctrl.supplier = ctrl.supplier;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}
			else{
				supplierDB.create( ctrl.supplier, function( result_map ){
					ctrl.supplier = result_map.ops[ 0 ];
					ctrl.onSave({
						supplier : ctrl.supplier
					});
					ctrl.supplier = ctrl.supplier;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}

		}
	}

	angular
	.module('supplierEdit')
	.component('supplierEdit',{
		templateUrl : 'supplier/supplier-edit.template.html',
		controller : ['$scope', 'supplierDB', SupplierEditController],
		bindings : {
			supplier : '<',
			onClose  : '&',
			onSave   : '&'
		}
	})

})();