(function() {
	
	function MessageSaleDetailController( $scope, $routeParams, $location, printer, messageDB ){
		var ctrl = this;

		var today = new Date(Date.now()).toISOString()
    	.replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

		ctrl.status = [
			{name:'Pending', id:0},
			{name:'Paid', id:1},
			{name:'Cancelled', id:2},
			{name:'Partiel', id:3}
		];

		ctrl.save = function(){
			messageDB.create( ctrl.message, function( result_map ){
				$location.path('/message');
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
				messageDB.getSale( saleId, function( sale ){
					ctrl.sale = sale;
					ctrl.message = {
					  mindate : today,
					  maxdate : today + 1,
					  sale_id : saleId,
		              amount  : sale.balance
		            };
				});
			};

			messageDB.get_list( { sale_id : saleId }, function( messages ){
				ctrl.messages = messages;
			});
		}
	}

	angular
	.module('messageSaleDetail')
	.component('messageSaleDetail',{
		templateUrl : 'message/message-inbox-detail.template.html',
		controller : ['$scope', '$routeParams', '$location', 'printer', 'messageDB', MessageSaleDetailController]
	})

})();