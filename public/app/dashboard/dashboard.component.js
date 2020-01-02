(function() {
	
	function DashboardController( $scope, dashboardDB, saleDB){
		var ctrl = this;

		ctrl.incomes     = 0;
		ctrl.net_incomes = 0;
		ctrl.expenses    = 0;



		ctrl.$onInit = function(){
			dashboardDB.get_profil( function( profil_map ){
				ctrl.user = profil_map;
			});


			saleDB.get_list( null, function( result_list ){
				ctrl.sales = result_list;
			});

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
		controller : ['$scope', 'dashboardDB', 'saleDB', DashboardController]
	})

})();