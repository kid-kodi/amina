(function() {
	
	function MessageDetailController( $scope, $routeParams, $location, printer, messageDB ){
		var ctrl = this;

		ctrl.status = [
			{name:'Pending', id:0},
			{name:'Paid', id:1},
			{name:'Cancelled', id:2}
		];

		ctrl.save = function(){
			var messageId = ctrl.message._id;
			delete ctrl.message._id;
			messageDB.validate( messageId, ctrl.message, function( result_map ){
				$location.path('/message');
			});
		};

		ctrl.dismiss = function(){
			var messageId = ctrl.message._id;
			delete ctrl.message._id;
			messageDB.update( messageId, {status:2}, function( result_map ){
				$location.path('/message');
			});
		};

		ctrl.print = function(){
			var 
		        print_obj_map = {};

		        print_obj_map.com = ctrl.message;
		        printer.print('templates/invoice.html', print_obj_map);
		};

		ctrl.$onInit = function(){
			var messageId = $routeParams.messageId;
			if( messageId != 0){
				messageDB.getMessage( messageId, function( message ){
					ctrl.message = message;
				});
			};
		}
	}

	angular
	.module('messageDetail')
	.component('messageDetail',{
		templateUrl : 'message/message-detail.template.html',
		controller : ['$scope', '$routeParams', '$location', 'printer', 'messageDB', MessageDetailController]
	})

})();