(function() {
	
	function ExpenseListController( expenseDB ){
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

		ctrl.list = expenseDB.get_list();

		ctrl.editExpense = function( expense ){
			ctrl.expense = null;
			if ( expense != undefined ) {
				ctrl.expense = expense;
			}
			ctrl.editMode = true;
		};

		ctrl.update = function( expense ){
			if ( expense._id ) {
				ctrl.list = removeFromArray(ctrl.list, expense);
			}
			ctrl.list.unshift( expense );
		};

		ctrl.gotoExpense = function( expense ){
			ctrl.expense = expense;
			ctrl.detailMode = true;
		};

		ctrl.$onInit = function(){
			ctrl.expense   = null;
			ctrl.editMode   = false;
			ctrl.detailMode = false;
		}
	}

	angular
	.module('expenseList')
	.component('expenseList',{
		templateUrl : 'expense/expense-list.template.html',
		controller : ['expenseDB', ExpenseListController]	
	})

})();