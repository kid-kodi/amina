(function() {
	
	function CustomerListController( customerDB, $routeParams ){
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

		ctrl.editCustomer = function( customer ){
			ctrl.customer = null;
			if ( customer != undefined ) {
				ctrl.customer = customer;
			}
			ctrl.editMode = true;
		};

		ctrl.update = function( customer ){
			if ( customer._id ) {
				ctrl.list = removeFromArray(ctrl.list, customer);
			}
			ctrl.list.unshift( customer );
		};

		ctrl.gotoCustomer = function( customer ){
			ctrl.customer = customer;
			ctrl.detailMode = true;
		};

		ctrl.$onInit = function(){

			ctrl.customer   = null;
			ctrl.editMode   = false;
			ctrl.detailMode = false;

			customerDB.get_list( $routeParams.list, function( result_list ){
				ctrl.list = result_list;
				console.log( result_list );
			});
		}
	}

	angular
	.module('customerList')
	.component('customerList',{
		templateUrl : 'customer/customer-list.template.html',
		controller : ['customerDB', '$routeParams', CustomerListController]	
	})

})();