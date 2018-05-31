(function() {
	
	function ExpenseDetailController( $scope, $routeParams, $location, printer, expenseDB ){
		var ctrl = this;

		ctrl.status = [
			{name:'Pending', id:0},
			{name:'Paid', id:1},
			{name:'Cancelled', id:2}
		];

		ctrl.save = function(){
			var expenseId = ctrl.expense._id;
			delete ctrl.expense._id;
			expenseDB.validate( expenseId, ctrl.expense, function( result_map ){
				console.log( result_map );
				$location.path('/expense');
			});
		};

		ctrl.dismiss = function(){
			var expenseId = ctrl.expense._id;
			delete ctrl.expense._id;
			expenseDB.update( expenseId, {status:2}, function( result_map ){
				$location.path('/expense');
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
				expenseDB.getExpense( expenseId, function( expense ){
					ctrl.expense = expense;
				});
			};
		}
	}

	angular
	.module('expenseDetail')
	.component('expenseDetail',{
		templateUrl : 'expense/expense-detail.template.html',
		controller : ['$scope', '$routeParams', '$location', 'printer', 'expenseDB', ExpenseDetailController]
	})

})();