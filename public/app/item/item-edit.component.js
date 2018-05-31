(function() {
	
	function ItemEditController( $scope, itemDB ){
		var ctrl = this;

		ctrl.close = function(){
			ctrl.onClose();
		}

		ctrl.save = function(){
			if ( ctrl.item._id ) {
				var itemId = ctrl.item._id;
				delete ctrl.item._id;
				itemDB.update( itemId, ctrl.item, function( result_map ){
					ctrl.item._id = itemId;
					ctrl.onSave({
						item : ctrl.item
					});
					ctrl.item = ctrl.item;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}
			else{
				itemDB.create( ctrl.item, function( result_map ){
					ctrl.item = result_map.ops[ 0 ];
					ctrl.onSave({
						item : ctrl.item
					});
					ctrl.item = ctrl.item;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}

		}
	}

	angular
	.module('itemEdit')
	.component('itemEdit',{
		templateUrl : 'item/item-edit.template.html',
		controller : ['$scope', 'itemDB', ItemEditController],
		bindings : {
			item : '<',
			onClose  : '&',
			onSave   : '&'
		}
	})

})();