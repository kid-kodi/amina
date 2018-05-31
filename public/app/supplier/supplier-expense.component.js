(function() {
	
	function SupplierExpenseController( $scope, $routeParams, $location, supplierDB ){
		var ctrl = this;

		ctrl.showAddItem = false;

		ctrl.setItem = function( object ){
			if (object) {

				var item = object.originalObject;

				ctrl.expense.items.push({ 
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
            angular.forEach(ctrl.expense.items, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            }); 
            ctrl.expense.items = newDataList;
        };
    
	    ctrl.checkAll = function () {
	        if (!$scope.selectedAll) {
	            $scope.selectedAll = true;
	        } else {
	            $scope.selectedAll = false;
	        }
	        angular.forEach(ctrl.expense.items, function( item ) {
	            item.selected = $scope.selectedAll;
	        });
	    }; 

	    ctrl.clear_items = function(){
			ctrl.expense.items = [];
		};

		ctrl.update_price = function(){
			var total_amount = 0;
			for (var i = 0; i < ctrl.expense.items.length; i++) {
				total_amount = total_amount + parseInt(ctrl.expense.items[i].price) 
				* parseInt(ctrl.expense.items[i].quantity);
			}

			ctrl.expense.amount = total_amount;
			
		}

		ctrl.save = function( attr ){
			if ( ctrl.expense._id ) {
				var expenseId = ctrl.expense._id;
				delete ctrl.expense._id;
				supplierDB.updateExpense( expenseId, ctrl.expense, function( result_map ){
					$location.path('/supplier/'+$routeParams.supplierId);
				});
			}
			else{
				supplierDB.createExpense( ctrl.expense, function( result_map ){
					$location.path('/supplier/'+$routeParams.supplierId);
				});
			}

		}

		ctrl.$onInit = function(){
			var supplierId = $routeParams.supplierId;
			if( supplierId != 0){
				supplierDB.getSupplier( supplierId )
				.$promise.then( function( supplier ){
					ctrl.supplier = supplier;
					var expenseId = $routeParams.expenseId;
					if( expenseId != 0){
						ctrl.expense = supplierDB.getExpense( expenseId );
					}
					else{
						ctrl.expense = supplierDB.newExpense( ctrl.supplier );
					}
				});
			};
			

			ctrl.items = supplierDB.getItems();
		}
	}

	angular
	.module('supplierExpense')
	.component('supplierExpense',{
		templateUrl : 'supplier/supplier-expense.template.html',
		controller : ['$scope', '$routeParams', '$location', 'supplierDB', SupplierExpenseController]
	})

})();