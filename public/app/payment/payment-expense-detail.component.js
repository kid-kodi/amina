(function() {
	
	function PaymentExpenseDetailController( $scope, $routeParams, $location, printer, paymentDB ){
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
			paymentDB.createExpense( ctrl.payment, function( result_map ){
				alert();
				$location.path('/payment');
			});
		};

		ctrl.print = function(){
			var 
		        print_obj_map = {};

		        print_obj_map.com = ctrl.expense;
		        printer.print('templates/invoice.html', print_obj_map);
		};

		ctrl.$onInit = function(){
			var expenseId = $routeParams.expenseId;
			if( expenseId != 0){
				paymentDB.getExpense( expenseId, function( expense ){
					ctrl.expense = expense;
					ctrl.payment = {
					  mindate : today,
					  maxdate : today + 1,
					  expense_id : expenseId,
		              amount  : expense.balance
		            };
				});
			};

			paymentDB.get_list( { expense_id : expenseId }, function( payments ){
				ctrl.payments = payments;
			});
		}
	}

	angular
	.module('paymentExpenseDetail')
	.component('paymentExpenseDetail',{
		templateUrl : 'payment/payment-expense-detail.template.html',
		controller : ['$scope', '$routeParams', '$location', 'printer', 'paymentDB', PaymentExpenseDetailController]
	})

})();