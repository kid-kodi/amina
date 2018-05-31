(function() {
	
	function SettingEditController( $scope, settingDB ){
		var ctrl = this;

		ctrl.editMode = false;

		ctrl.close = function(){
			ctrl.onClose();
		}

		ctrl.save = function(){
			if ( ctrl.setting._id ) {
				var settingId = ctrl.setting._id;
				delete ctrl.setting._id;
				settingDB.update( settingId, ctrl.setting, function( result_map ){
					ctrl.setting._id = settingId;
					ctrl.onSave({
						setting : ctrl.setting
					});
					ctrl.setting = ctrl.setting;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}
			else{
				settingDB.create( ctrl.setting, function( result_map ){
					ctrl.setting = result_map.ops[ 0 ];
					ctrl.onSave({
						setting : ctrl.setting
					});
					ctrl.setting = ctrl.setting;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}

		};

		ctrl.$onInit = function(){
			if ( ctrl.setting == null ) {
				ctrl.setting = settingDB.new_setting();
			}
			ctrl.permissions = settingDB.permissions();
		}
	}

	angular
	.module('settingEdit')
	.component('settingEdit',{
		templateUrl : 'setting/setting-edit.template.html',
		controller : ['$scope', 'settingDB', SettingEditController],
		bindings : {
			setting : '<',
			onClose  : '&',
			onSave   : '&'
		}
	})

})();