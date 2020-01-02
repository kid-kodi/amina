(function() {
	
	function CustomerImportController( $scope, customerDB, $routeParams ){
		var ctrl = this;

		ctrl.customObject = [{name : 'first_name', value : ''}, {name : 'last_name', value : ''}, {name : 'name', value : ''}, 
		{name : 'ncc', value : ''}, {name : 'phone', value : ''}, {name : 'email', value : ''}];

		ctrl.excelJsonObject = [];

		ctrl.columns = [];


		ctrl.uploadExcel = function(){

			var file = document.getElementById('file');
			var input = file;

			var reader = new FileReader();
			var rowObject;

			reader.onload = function(){
				var data = reader.result;
				var workbook = XLSX.read( data , {type:'binary'});

				workbook.SheetNames.forEach( function(sheetName){
					rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});

					for (var i = 0; i < rowObject[0].length; i++) {
						console.log( rowObject[0] );
						ctrl.columns.push(rowObject[0][i]);
						$scope.$apply();
					}

					//ctrl.columns = rowObject[0];
					ctrl.excelJsonObject = rowObject;
				});

				// var first_sheet_name = workbook.SheetNames[0];
				// var worksheet = workbook.Sheets[first_sheet_name];
			 //    var cells = Object.keys(worksheet);
				// console.log( cells );
			 //    for (var i = 0; i < Object.keys(cells).length; i++) {
			 //    	console.log( cells[i] );
			 //        if( cells[i].indexOf('1') > -1){
			 //            ctrl.columns.push(worksheet[cells[i]].v);
			 //        }
			 //    }


				// for (var i = 0; i < excelJsonObject.length; i++) {
				// 	var data = excelJsonObject[i];
				// 	console.log( data );
				// }

			};

			reader.readAsBinaryString(input.files[0]);

		}

		ctrl.roorder = function(){
			
		}

		ctrl.close = function(){
			ctrl.onClose();
		}

		ctrl.save = function(){}

		ctrl.$onInit = function(){}
	}

	angular
	.module('customerImport')
	.component('customerImport',{
		templateUrl : 'customer/customer-import.template.html',
		controller : ['$scope', 'customerDB', '$routeParams', CustomerImportController],
		bindings : {
			onClose  : '&',
			onSave   : '&'
		}
	})

})();