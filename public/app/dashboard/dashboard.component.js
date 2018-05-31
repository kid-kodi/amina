(function() {
	
	function DashboardController( $scope, dashboardDB){
		var ctrl = this;

		ctrl.incomes     = 0;
		ctrl.net_incomes = 0;
		ctrl.expenses    = 0;


		ctrl.$onInit = function(){
			ctrl.user = dashboardDB.user;

			dashboardDB.get_data( function( net_incomes, incomes, expenses ){
				ctrl.net_incomes = net_incomes;
				ctrl.incomes     = incomes;
				ctrl.expenses    = expenses;
			});
		}
	}

	angular
	.module('dashboardApp')
	.component('dashboard',{
		templateUrl : 'dashboard/dashboard.template.html',
		controller : ['$scope', 'dashboardDB', DashboardController]
	})

})();