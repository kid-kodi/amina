(function() {
	
	function ItemDetailController( $scope, $routeParams, itemDB ){
		var ctrl = this;

		ctrl.editMode  = false;
		ctrl.orderMode = false;

		ctrl.editItem = function( item ){
			if (item != null) {
				ctrl.item = item;
			}
			ctrl.editMode = true;
		};

		ctrl.update = function( item ){
			ctrl.item = item;
		};

		ctrl.$onInit = function(){
			var itemId = $routeParams.itemId;
			if( itemId != 0){
				ctrl.item = itemDB.getItem( itemId );
			};
			itemDB.getTransactions( itemId ,function( result_map ){
				ctrl.transactions = result_map;
			});
		}
	}

	angular
	.module('itemDetail')
	.component('itemDetail',{
		templateUrl : 'item/item-detail.template.html',
		controller : ['$scope', '$routeParams', 'itemDB', ItemDetailController],
		bindings : {
			item : '<',
			onClose  : '&',
			onEdit   : '&'
		}
	})

})();