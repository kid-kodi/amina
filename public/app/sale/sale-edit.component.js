(function() {
	
	function SaleEditController( $scope, saleDB, $routeParams, $location ){
		var ctrl = this;

		ctrl.showAddItem = false;
		ctrl.isAllowed   = false;

		ctrl.status = [
			{name:'Pending', id:0},
			{name:'Paid', id:1},
			{name:'Cancelled', id:2}
		];

		ctrl.setCustomer = function( search_obj ){
			var customer = search_obj.originalObject;
			ctrl.sale.customer_id   = customer._id;
			ctrl.sale.customer_name = customer.name;
		}

		ctrl.close = function(){
			ctrl.onClose();
		};

		ctrl.addItem = function( item ){
            ctrl.sale.items.push({ 
                'item_type'   : item.type, 
                'item_id'     : item._id, 
                'item_name'   : item.name, 
                'description' : item.description, 
                'quantity'    : 1,
                'price'       : item.price,
                'cost'        : item.cost,
                'selected'    : false
            });

			ctrl.showAddItem = false;
            ctrl.search = '';
        };

		ctrl.update_price = function(){
			var total_amount = 0;
			for (var i = 0; i < ctrl.sale.items.length; i++) {
				total_amount = total_amount + parseInt(ctrl.sale.items[i].price) 
				* parseInt(ctrl.sale.items[i].quantity);
			}

			ctrl.sale.amount = total_amount;
			
		}

		ctrl.save = function(){
			if ( ctrl.sale._id ) {
				var saleId = ctrl.sale._id;
				delete ctrl.sale._id;
				saleDB.update( saleId, ctrl.sale, function( result_map ){
					$location.path('/sale/'+saleId);
				});
			}
			else{
				saleDB.create( ctrl.sale, function( result_map ){
					var saleId = result_map.ops[ 0 ]._id;
					$location.path('/sale/'+saleId);
				});
			}

		}

		ctrl.clear_items = function(){
			ctrl.sale.items = [];
		}

		ctrl.$onInit = function(){

			var saleId = $routeParams.saleId;
			if( saleId != 0){
				saleDB.getSale( saleId, function( sale ){
					ctrl.sale = sale;
				});
			};

			if ( saleId == 0 ) {
				ctrl.sale = saleDB.new_sale();
			}

			ctrl.customers = saleDB.customers();
			ctrl.items     = saleDB.items();
		}
    
        ctrl.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach(ctrl.sale.items, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            }); 
            ctrl.sale.items = newDataList;
        };
    
	    ctrl.checkAll = function () {
	        if (!$scope.selectedAll) {
	            $scope.selectedAll = true;
	        } else {
	            $scope.selectedAll = false;
	        }
	        angular.forEach(ctrl.sale.items, function( item ) {
	            item.selected = $scope.selectedAll;
	        });
	    }; 

	}

	angular
	.module('saleEdit')
	.component('saleEdit',{
		templateUrl : 'sale/sale-edit.template.html',
		controller : ['$scope', 'saleDB', '$routeParams', '$location', SaleEditController]
	})

})();