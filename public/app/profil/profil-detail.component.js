(function() {
	
	function ProfilDetailController( $scope, profilDB ){
		var ctrl = this;

		ctrl.editMode = false;

		ctrl.save = function(){
			var profilId = ctrl.profil._id;
			delete ctrl.profil._id;
			profilDB.update( profilId, ctrl.profil, function( result_map ){
				ctrl.profil._id = profilId;
				ctrl.profil = ctrl.profil;
				$scope.form.$setPristine();
				$scope.form.$setUntouched();
				ctrl.close();
			});
			ctrl.editMode = false;
		};

		ctrl.$onInit = function(){
			profilDB.get_profil( function( profil_map ){
				ctrl.profil = profil_map;
			});

			profilDB.role_list( function( role_list ){
				ctrl.roles = role_list;
			});
		}
	}

	angular
	.module('profilDetail')
	.component('profilDetail',{
		templateUrl : 'profil/profil-detail.template.html',
		controller : ['$scope', 'profilDB', ProfilDetailController]
	})

})();