(function() {
	
	function UserExpensesController( $scope, $routeParams, userDB ){
		var ctrl = this;

		ctrl.$onInit = function(){
			var userId = $routeParams.userId;

			ctrl.list = userDB.getUserExpenses( userId );
		}
	}

	angular
	.module('userExpenses')
	.component('userExpenses',{
		templateUrl : 'user/user-expenses.template.html',
		controller : ['$scope', '$routeParams', 'userDB', UserExpensesController],
		bindings : {
			user : '<',
			onClose  : '&',
			onEdit   : '&'
		}
	})

})();