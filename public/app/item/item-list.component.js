(function() {
	
	function ItemListController( itemDB ){
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

		ctrl.list = itemDB.get_list();

		ctrl.editItem = function( item ){
			ctrl.item = null;
			if ( item != undefined ) {
				ctrl.item = item;
			}
			ctrl.editMode = true;
		};

		ctrl.update = function( item ){
			if ( item._id ) {
				ctrl.list = removeFromArray(ctrl.list, item);
			}
			ctrl.list.push( item );
		};

		ctrl.gotoItem = function( item ){
			ctrl.item = item;
			ctrl.detailMode = true;
		};

		ctrl.$onInit = function(){
			ctrl.item   = null;
			ctrl.editMode   = false;
			ctrl.detailMode = false;
		}
	}

	angular
	.module('itemList')
	.component('itemList',{
		templateUrl : 'item/item-list.template.html',
		controller : ['itemDB', ItemListController]	
	})

})();