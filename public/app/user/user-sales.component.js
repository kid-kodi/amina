(function() {
	
	function UserSalesController( $scope, $routeParams, userDB ){
		var ctrl = this;

		ctrl.$onInit = function(){
			var userId = $routeParams.userId;

			ctrl.list = userDB.getUserSales( userId );
		}
	}

	angular
	.module('userSales')
	.component('userSales',{
		templateUrl : 'user/user-sales.template.html',
		controller : ['$scope', '$routeParams', 'userDB', UserSalesController],
		bindings : {
			user : '<',
			onClose  : '&',
			onEdit   : '&'
		}
	})

})();