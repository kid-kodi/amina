(function() {
	
	function MessageSaleListcontroller( saleDB, $routeParams, $scope, $http, $compile ){
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

		ctrl.list = saleDB.get_list();

		ctrl.editSale = function( sale ){
			ctrl.sale = null;
			if ( sale != undefined ) {
				ctrl.sale = sale;
			}
			ctrl.editMode = true;
		};

		ctrl.update = function( sale ){
			if ( sale._id ) {
				ctrl.list = removeFromArray(ctrl.list, sale);
			}
			ctrl.list.unshift( sale );
		};

		ctrl.gotoSale = function( sale ){
			ctrl.sale = sale;
			ctrl.detailMode = true;
		};

		ctrl.$onInit = function(){
			ctrl.sale   = null;
			ctrl.editMode   = false;
			ctrl.detailMode = false;

			var route = $routeParams.list;

			saleDB.get_list( route, function( result_list ){
				ctrl.list = result_list;
			});
		}
	}

	angular
	.module('messageSaleList')
	.component('messageSaleList',{
		templateUrl : 'message/message-inbox-list.template.html',
		controller : ['saleDB', '$routeParams', '$scope', '$http', '$compile', MessageSaleListcontroller]	
	})

})();