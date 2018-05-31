(function() {
	
	function ExpenseEditController( $scope, expenseDB ){
		var ctrl = this;

		ctrl.showAddItem = false;

		ctrl.status = [
			{name:'Pending', id:0},
			{name:'Paid', id:1},
			{name:'Cancelled', id:2}
		];

		ctrl.close = function(){
			ctrl.onClose();
		};

		ctrl.addItem = function( item ){
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
            ctrl.search = '';
        };

        ctrl.addSupplier = function( supplier ){
            ctrl.expense.supplier_id   = supplier._id;
            ctrl.expense.supplier_name = supplier.name;
            ctrl.supplier_search = '';
        };

		ctrl.update_cost = function(){
			var total_amount = 0;
			for (var i = 0; i < ctrl.expense.items.length; i++) {
				total_amount = total_amount + parseInt(ctrl.expense.items[i].cost) 
				* parseInt(ctrl.expense.items[i].quantity);
			}

			ctrl.expense.amount = total_amount;
			
		}

		ctrl.save = function(){
			if ( ctrl.expense._id ) {
				var expenseId = ctrl.expense._id;
				delete ctrl.expense._id;
				expenseDB.update( expenseId, ctrl.expense, function( result_map ){
					ctrl.expense._id = expenseId;
					ctrl.onSave({
						expense : ctrl.expense
					});
					ctrl.expense = ctrl.expense;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}
			else{
				expenseDB.create( ctrl.expense, function( result_map ){
					ctrl.expense = result_map.ops[ 0 ];
					ctrl.onSave({
						expense : ctrl.expense
					});
					ctrl.expense = ctrl.expense;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}

		}

		ctrl.clear_items = function(){
			ctrl.expense.items = [];
		}

		ctrl.$onInit = function(){
			if ( ctrl.expense == null ) {
				ctrl.expense = expenseDB.new_expense();
			}

			if ( ctrl.addSupplier != null ) {
				ctrl.addSupplier( ctrl.supplier );
			}

			ctrl.suppliers = expenseDB.suppliers();
			ctrl.items     = expenseDB.items();
		}
    
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

	}

	angular
	.module('expenseEdit')
	.component('expenseEdit',{
		templateUrl : 'expense/expense-edit.template.html',
		controller : ['$scope', 'expenseDB', ExpenseEditController],
		bindings : {
			supplier : '<',
			expense  : '<',
			onClose  : '&',
			onSave   : '&'
		}
	})

})();