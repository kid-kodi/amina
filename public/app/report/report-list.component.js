(function() {
	
	function ReportListController( reportDB ){
		var ctrl = this;
		ctrl.detailMode = false;

		ctrl.incomes     = 0;
		ctrl.net_incomes = 0;
		ctrl.expenses    = 0;

		ctrl.list = reportDB.get_list();

		ctrl.gotoReport = function( report ){
			ctrl.report = report;
			ctrl.detailMode = true;
		};

		ctrl.$onInit = function(){
			ctrl.report   = null;
			ctrl.detailMode = false;

			reportDB.get_data( function( net_incomes, incomes, expenses ){
				ctrl.net_incomes = net_incomes;
				ctrl.incomes     = incomes;
				ctrl.expenses    = expenses;
			});

		}
	}

	angular
	.module('reportList')
	.component('reportList',{
		templateUrl : 'report/report-list.template.html',
		controller : ['reportDB', ReportListController]	
	})

})();