(function() {
	
	function MessageExpenseDetailController( $scope, $routeParams, $location, printer, messageDB ){
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
			messageDB.createExpense( ctrl.message, function( result_map ){
				alert();
				$location.path('/message');
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
				messageDB.getExpense( expenseId, function( expense ){
					ctrl.expense = expense;
					ctrl.message = {
					  mindate : today,
					  maxdate : today + 1,
					  expense_id : expenseId,
		              amount  : expense.balance
		            };
				});
			};

			messageDB.get_list( { expense_id : expenseId }, function( messages ){
				ctrl.messages = messages;
			});
		}
	}

	angular
	.module('messageExpenseDetail')
	.component('messageExpenseDetail',{
		templateUrl : 'message/message-sent-detail.template.html',
		controller : ['$scope', '$routeParams', '$location', 'printer', 'messageDB', MessageExpenseDetailController]
	})

})();