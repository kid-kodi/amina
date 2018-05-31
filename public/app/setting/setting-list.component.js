(function() {
	
	function SettingListController( settingDB ){
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

		ctrl.list = settingDB.get_list();

		ctrl.editSetting = function( setting ){
			ctrl.setting = null;
			if ( setting != undefined ) {
				ctrl.setting = setting;
			}
			ctrl.editMode = true;
		};

		ctrl.update = function( setting ){
			if ( setting._id ) {
				ctrl.list = removeFromArray(ctrl.list, setting);
			}
			ctrl.list.push( setting );
		};

		ctrl.gotoSetting = function( setting ){
			ctrl.setting = setting;
			ctrl.detailMode = true;
		};

		ctrl.$onInit = function(){
			ctrl.setting   = null;
			ctrl.editMode   = false;
			ctrl.detailMode = false;
		}
	}

	angular
	.module('settingList')
	.component('settingList',{
		templateUrl : 'setting/setting-list.template.html',
		controller : ['settingDB', SettingListController]	
	})

})();