(function() {
	
	function CustomerSaleController( $scope, $routeParams, $location, customerDB ){
		var ctrl = this;

		ctrl.showAddItem = false;

		ctrl.setItem = function( object ){
			if (object) {

				var item = object.originalObject;

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
				$scope.$broadcast('angucomplete-alt:clearInput', 'ex2');
			}
		};

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

	    ctrl.clear_items = function(){
			ctrl.sale.items = [];
		};

		ctrl.update_price = function(){
			var total_amount = 0;
			for (var i = 0; i < ctrl.sale.items.length; i++) {
				total_amount = total_amount + parseInt(ctrl.sale.items[i].price) 
				* parseInt(ctrl.sale.items[i].quantity);
			}

			ctrl.sale.amount = total_amount;
			
		}

		ctrl.save = function( attr ){
			if ( ctrl.sale._id ) {
				var saleId = ctrl.sale._id;
				delete ctrl.sale._id;
				customerDB.updateSale( saleId, ctrl.sale, function( result_map ){
					$location.path('/customer/'+$routeParams.customerId);
				});
			}
			else{
				customerDB.createSale( ctrl.sale, function( result_map ){
					$location.path('/customer/'+$routeParams.customerId);
				});
			}

		}

		ctrl.$onInit = function(){
			var customerId = $routeParams.customerId;
			if( customerId != 0){
				customerDB.getCustomer( customerId )
				.$promise.then( function( customer ){
					ctrl.customer = customer;
					var saleId = $routeParams.saleId;
					if( saleId != 0){
						ctrl.sale = customerDB.getSale( saleId );
					}
					else{
						ctrl.sale = customerDB.new_sale( ctrl.customer );
					}
				});
			};
			

			ctrl.items = customerDB.get_items();
		}
	}

	angular
	.module('customerSale')
	.component('customerSale',{
		templateUrl : 'customer/customer-sale.template.html',
		controller : ['$scope', '$routeParams', '$location', 'customerDB', CustomerSaleController]
	})

})();