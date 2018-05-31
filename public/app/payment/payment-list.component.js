(function() {
	
	function PaymentListController( paymentDB, $routeParams, $scope, $http, $compile ){
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

		ctrl.list = paymentDB.getSalelist();

		ctrl.editPayment = function( payment ){
			ctrl.payment = null;
			if ( payment != undefined ) {
				ctrl.payment = payment;
			}
			ctrl.editMode = true;
		};

		ctrl.update = function( payment ){
			if ( payment._id ) {
				ctrl.list = removeFromArray(ctrl.list, payment);
			}
			ctrl.list.unshift( payment );
		};

		ctrl.gotoPayment = function( payment ){
			ctrl.payment = payment;
			ctrl.detailMode = true;
		};

		ctrl.$onInit = function(){
			ctrl.payment   = null;
			ctrl.editMode   = false;
			ctrl.detailMode = false;

			var route = $routeParams.list;

			paymentDB.get_list( route, function( result_list ){
				ctrl.list = result_list;
			});
		}
	}

	angular
	.module('paymentList')
	.component('paymentList',{
		templateUrl : 'payment/payment-list.template.html',
		controller : ['paymentDB', '$routeParams', '$scope', '$http', '$compile', PaymentListController]	
	})

})();