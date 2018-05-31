angular.module("spa")
.directive("dropdown", function($rootScope) { 
	return { 
		restrict: "E", templateUrl: "_directives/dropdownlist.template.html", 
		scope: { placeholder: "@", list: "=", selected: "=", property: "@" }, 
		link: function(scope) { 
			
			scope.select = function(item) { 
				scope.selected = item; 
			}; 
			scope.reset = function() {
				scope.selected = ''; 
			}; 
			scope.$watch("selected", function(value) {
				if ( scope.selected ) {
					scope.display = scope.selected[scope.property]; 
				}
			}); 

			scope.reset();
		} 
	} 
});