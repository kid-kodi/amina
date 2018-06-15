(function() {
	
	function PaymentSaleDetailController( $scope, $routeParams, $location, printer, paymentDB ){
		var ctrl = this;

		var today = new Date(Date.now()).toISOString()
    	.replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

		ctrl.status = [
			{name:'Pending', id:0},
			{name:'Paid', id:1},
			{name:'Cancelled', id:2},
			{name:'Partiel', id:3}
		];

		ctrl.save = function(){
			paymentDB.create( ctrl.payment, function( result_map ){
				$location.path('/payment');
			});
		};

		ctrl.print = function(){
			var 
        print_obj_map = {};

        print_obj_map.com = ctrl.sale;
        printer.print('templates/invoice.html', print_obj_map);
		};

		ctrl.$onInit = function(){
			var saleId = $routeParams.saleId;
			if( saleId != 0){
				paymentDB.getSale( saleId, function( sale ){
					ctrl.sale = sale;
					ctrl.payment = {
					  mindate : today,
					  maxdate : today + 1,
					  sale_id : saleId,
		              amount  : sale.balance
		            };
				});
			};

			paymentDB.get_list( { sale_id : saleId }, function( payments ){
				ctrl.payments = payments;
			});
		}
	}

	angular
	.module('paymentSaleDetail')
	.component('paymentSaleDetail',{
		templateUrl : 'payment/payment-sale-detail.template.html',
		controller : ['$scope', '$routeParams', '$location', 'printer', 'paymentDB', PaymentSaleDetailController]
	})

})();