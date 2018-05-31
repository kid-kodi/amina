(function() {
	
	function PaymentEditController( $scope, paymentDB, $routeParams, $location ){
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
			ctrl.payment.customer_id   = customer._id;
			ctrl.payment.customer_name = customer.name;
		}

		ctrl.close = function(){
			ctrl.onClose();
		};

		ctrl.addItem = function( item ){
            ctrl.payment.items.push({ 
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
			for (var i = 0; i < ctrl.payment.items.length; i++) {
				total_amount = total_amount + parseInt(ctrl.payment.items[i].price) 
				* parseInt(ctrl.payment.items[i].quantity);
			}

			ctrl.payment.amount = total_amount;
			
		}

		ctrl.save = function(){
			if ( ctrl.payment._id ) {
				var paymentId = ctrl.payment._id;
				delete ctrl.payment._id;
				paymentDB.update( paymentId, ctrl.payment, function( result_map ){
					$location.path('/payment/'+paymentId);
				});
			}
			else{
				paymentDB.create( ctrl.payment, function( result_map ){
					var paymentId = result_map.ops[ 0 ]._id;
					$location.path('/payment/'+paymentId);
				});
			}

		}

		ctrl.clear_items = function(){
			ctrl.payment.items = [];
		}

		ctrl.$onInit = function(){

			var paymentId = $routeParams.paymentId;
			if( paymentId != 0){
				paymentDB.getPayment( paymentId, function( payment ){
					ctrl.payment = payment;
				});
			};

			if ( paymentId == 0 ) {
				ctrl.payment = paymentDB.new_payment();
			}

			ctrl.customers = paymentDB.customers();
			ctrl.items     = paymentDB.items();
		}
    
        ctrl.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach(ctrl.payment.items, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            }); 
            ctrl.payment.items = newDataList;
        };
    
	    ctrl.checkAll = function () {
	        if (!$scope.selectedAll) {
	            $scope.selectedAll = true;
	        } else {
	            $scope.selectedAll = false;
	        }
	        angular.forEach(ctrl.payment.items, function( item ) {
	            item.selected = $scope.selectedAll;
	        });
	    }; 

	}

	angular
	.module('paymentEdit')
	.component('paymentEdit',{
		templateUrl : 'payment/payment-edit.template.html',
		controller : ['$scope', 'paymentDB', '$routeParams', '$location', PaymentEditController]
	})

})();