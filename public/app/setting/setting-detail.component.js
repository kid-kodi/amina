(function() {
	
	function SettingDetailController( $scope, settingDB ){
		var ctrl = this;

		ctrl.editMode = false;

		ctrl.editSetting = function(){
			ctrl.onEdit({ setting : ctrl.setting });
		}

		ctrl.save = function(){
			if ( ctrl.setting._id ) {
				var settingId = ctrl.setting._id;
				delete ctrl.setting._id;
				settingDB.update( settingId, ctrl.setting, function( result_map ){
					ctrl.setting._id = settingId;
					ctrl.setting = ctrl.setting;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}
			else{
				settingDB.create( ctrl.setting, function( result_map ){
					ctrl.setting = result_map.ops[ 0 ];
					ctrl.setting = ctrl.setting;
					$scope.form.$setPristine();
					$scope.form.$setUntouched();
					ctrl.close();
				});
			}
			ctrl.editMode = false;
		};

		ctrl.$onInit = function(){
			settingDB.get_setting( function( setting_map ){
				console.log( setting_map );
				ctrl.setting  = setting_map;
			});
		}
	}

	angular
	.module('settingDetail')
	.component('settingDetail',{
		templateUrl : 'setting/setting-detail.template.html',
		controller : ['$scope', 'settingDB', SettingDetailController]
	})

})();