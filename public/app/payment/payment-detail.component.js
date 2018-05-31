(function() {
	
	function PaymentDetailController( $scope, $routeParams, $location, printer, paymentDB ){
		var ctrl = this;

		ctrl.status = [
			{name:'Pending', id:0},
			{name:'Paid', id:1},
			{name:'Cancelled', id:2}
		];

		ctrl.save = function(){
			var paymentId = ctrl.payment._id;
			delete ctrl.payment._id;
			paymentDB.validate( paymentId, ctrl.payment, function( result_map ){
				$location.path('/payment');
			});
		};

		ctrl.dismiss = function(){
			var paymentId = ctrl.payment._id;
			delete ctrl.payment._id;
			paymentDB.update( paymentId, {status:2}, function( result_map ){
				$location.path('/payment');
			});
		};

		ctrl.print = function(){
			var 
		        print_obj_map = {};

		        print_obj_map.com = ctrl.payment;
		        printer.print('templates/invoice.html', print_obj_map);
		};

		ctrl.$onInit = function(){
			var paymentId = $routeParams.paymentId;
			if( paymentId != 0){
				paymentDB.getPayment( paymentId, function( payment ){
					ctrl.payment = payment;
				});
			};
		}
	}

	angular
	.module('paymentDetail')
	.component('paymentDetail',{
		templateUrl : 'payment/payment-detail.template.html',
		controller : ['$scope', '$routeParams', '$location', 'printer', 'paymentDB', PaymentDetailController]
	})

})();