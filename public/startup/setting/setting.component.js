(function() {
	
	function SettingController( $scope, AlertService, db ){
		var ctrl = this;

		ctrl.save = function(){
			if ( ctrl.setting._id ) {
				var settingId = ctrl.setting._id;
				delete ctrl.setting._id;
				db.setting.update( {id:settingId}, ctrl.setting, function( result_map ){
					ctrl.setting._id = settingId;
					AlertService.Success('Setting information updated', false);
				});
			}
			else{
				db.setting.create( ctrl.setting, function( result_map ){
					ctrl.setting = result_map.ops[ 0 ];
					AlertService.Success('Setting information saved', false);
				});
			}
		};

		ctrl.$onInit = function(){
			db.setting.query().$promise.then( function( setting_map ){
				ctrl.setting = setting_map[ 0 ];
			})
		}
	}

	angular
	.module('setting')
	.component('setting',{
		templateUrl : 'setting/setting.template.html',
		controller : ['$scope', 'AlertService', 'db', SettingController]
	})

})();