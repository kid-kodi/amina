(function() {
	
	function ReportDetailController( $scope, $filter, reportDB, $http, $compile, AlertService ){
		var ctrl = this;

		ctrl.maxdate = new Date(Date.now()).toISOString()
    .replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

		ctrl.mindate = '2018-01-01';

		ctrl.transactions  = [];

		ctrl.close = function(){
			ctrl.report = null;
			ctrl.onClose();
		};

		ctrl.run = function(){
			if ( ctrl.mindate == undefined || ctrl.maxdate == undefined ) {
				AlertService.Success('Date required', false);
				return false;
			}
			var mindate = ctrl.mindate;
			var maxdate = ctrl.maxdate;
			reportDB.profit_lost( mindate, maxdate, function( transactions ){
				ctrl.transactions = transactions;

				var perMonthDatas = PerMonthData( transactions );

				console.log( perMonthDatas ); 

				$http.get( ctrl.report.template_url ).then( function( response ){
			        document.getElementById('exportable').innerHTML = '';
			        $scope.html = $compile( response.data )($scope);
			        var elm = angular.element( document.querySelector('#exportable') );
			        elm.append($scope.html[0]);
			    });

			});
		};

		var PerMonthData = function( data_list ){
			var data_list = data_list;

			perMonthDatas = $filter("orderBy")(data_list, function (p) {return moment(p.created_at);}, true); 

			perMonthDatas = $filter("groupingFilter")(
		        perMonthDatas, 

		        function (p1, p2) {
		            return ((moment(p1.created_at).month() == moment(p2.created_at).month()) && (moment(p1.created_at).year() == moment(p2.created_at).year())); 
		        },

		        function (p) {
		            return moment(p.created_at).startOf("month");
		        }
		    );

		    return perMonthDatas;
		};

		ctrl.exportData = function () {
		    var data = document.getElementById("exportable").innerHTML;
		    var blob = new Blob([data], {
		        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
		    });
		    saveAs(blob, "report.xls");
		  };



		ctrl.$onInit = function(){
			ctrl.items = reportDB.get_items();
			ctrl.users = reportDB.get_users();

			reportDB.get_setting( function( setting_map ){
				console.log( setting_map );
				ctrl.setting  = setting_map;
			});

			ctrl.run();
		};
	}

	angular
	.module('reportDetail')
	.component('reportDetail',{
		templateUrl : 'report/report-detail.template.html',
		controller : ['$scope', '$filter', 'reportDB', '$http', '$compile', 'AlertService', ReportDetailController],
		bindings : {
			report : '<',
			onClose  : '&',
			onEdit   : '&'
		}
	})

})();