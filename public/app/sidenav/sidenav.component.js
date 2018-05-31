(function() {
	
	function SidenavController( $scope, $location, sidenavDB){
		var ctrl = this;

		ctrl.activeItem = null;

		function setActive() {
            var path = $location.path().split('/')[1];

            angular.forEach(ctrl.permissions, function (permission) {
        	var hashpath = '#/'+path;
                
                if (permission.url == hashpath) {
                    ctrl.activeItem = permission._id;
                }
            });
        };

		ctrl.$onInit = function(){
			sidenavDB.get_permissions( function( permissions ){
				ctrl.permissions = permissions;
				setActive();
			});
			ctrl.user = sidenavDB.user;
		};

		$scope.$on('$locationChangeSuccess', setActive);
	}

	angular
	.module('sidenavApp')
	.component('sidenav',{
		templateUrl : 'sidenav/sidenav.template.html',
		controller : ['$scope', '$location', 'sidenavDB', SidenavController]
	})

})();