(function() {
	
	function SupplierListController( supplierDB ){
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

		ctrl.list = supplierDB.get_list();

		ctrl.editSupplier = function( supplier ){
			ctrl.supplier = null;
			if ( supplier != undefined ) {
				ctrl.supplier = supplier;
			}
			ctrl.editMode = true;
		};

		ctrl.update = function( supplier ){
			if ( supplier._id ) {
				ctrl.list = removeFromArray(ctrl.list, supplier);
			}
			ctrl.list.push( supplier );
		};

		ctrl.gotoSupplier = function( supplier ){
			ctrl.supplier = supplier;
			ctrl.detailMode = true;
		};

		ctrl.$onInit = function(){
			ctrl.supplier   = null;
			ctrl.editMode   = false;
			ctrl.detailMode = false;
		}
	}

	angular
	.module('supplierList')
	.component('supplierList',{
		templateUrl : 'supplier/supplier-list.template.html',
		controller : ['supplierDB', SupplierListController]	
	})

})();