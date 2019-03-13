(function() {
	
	function MessageExpenseListcontroller( expenseDB, $routeParams, $scope, $http, $compile ){
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

			var route = $routeParams.list;

			expenseDB.get_list( route, function( result_list ){
				ctrl.list = result_list;
			});
		}
	}

	angular
	.module('messageExpenseList')
	.component('messageExpenseList',{
		templateUrl : 'message/message-sent-list.template.html',
		controller : ['expenseDB', '$routeParams', '$scope', '$http', '$compile', MessageExpenseListcontroller]	
	})

})();