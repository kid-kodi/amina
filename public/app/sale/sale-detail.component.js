(function() {
	
	function SaleDetailController( $scope, $routeParams, $location, printer, saleDB ){
		var ctrl = this;

		ctrl.status = [
			{name:'Pending', id:0},
			{name:'Paid', id:1},
			{name:'Cancelled', id:2}
		];

		ctrl.save = function(){
			var saleId = ctrl.sale._id;
			delete ctrl.sale._id;
			saleDB.validate( saleId, ctrl.sale, function( result_map ){
				$location.path('/sale');
			});
		};

		ctrl.dismiss = function(){
			var saleId = ctrl.sale._id;
			delete ctrl.sale._id;
			saleDB.update( saleId, {status:2}, function( result_map ){
				$location.path('/sale');
			});
		};

		ctrl.print = function(){
			var 
		        print_obj_map = {};

		        print_obj_map.com = ctrl.sale;
		        printer.print('templates/invoice.html', print_obj_map);
		};

		ctrl.$onInit = function(){
			var saleId = $routeParams.saleId;
			if( saleId != 0){
				saleDB.getSale( saleId, function( sale ){
					ctrl.sale = sale;
				});
			};
		}
	}

	angular
	.module('saleDetail')
	.component('saleDetail',{
		templateUrl : 'sale/sale-detail.template.html',
		controller : ['$scope', '$routeParams', '$location', 'printer', 'saleDB', SaleDetailController]
	})

})();