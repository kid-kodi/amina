(function() {
	
	function WelcomeController( $scope, db ){
		var ctrl = this;

		ctrl.$onInit = function(){
			
		}
	}

	angular
	.module('welcome')
	.component('welcome',{
		templateUrl : 'welcome/welcome.template.html',
		controller : ['$scope', 'db', WelcomeController]
	})

})();