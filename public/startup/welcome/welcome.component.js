(function() {
	
	function WelcomeController( $scope, $window, db ){
		var ctrl = this;

		var ctrl = this;
        
    //Model
    ctrl.currentStep = 1;
    ctrl.steps = [
      {
        step: 1,
        name: "First step",
        template: "welcome/step1.html"
      },
      {
        step: 2,
        name: "Second step",
        template: "welcome/step2.html"
      }           
    ];
    ctrl.user    = {};
    ctrl.setting = {};
    
    //Functions
    ctrl.gotoStep = function(newStep) {
      ctrl.currentStep = newStep;
      ctrl.pourcentage = (newStep/ctrl.steps.length) * 100 + "%";
    }
    
    ctrl.getStepTemplate = function(){
      for (var i = 0; i < ctrl.steps.length; i++) {
        if (ctrl.currentStep == ctrl.steps[i].step) {
            return ctrl.steps[i].template;
        }
      }
    }
    
    ctrl.save = function() {
      db.user.create( ctrl.user ).$promise.then( function(){});
      db.setting.create( ctrl.setting ).$promise.then( function(){});
      $window.location.href = '/login';
    }

    var setPermissions = function( list, role, callback ){
      db.permission.query().$promise.then( function( response ){
        if (response.length == 0 ) {
          angular.forEach( list, function( permission, key) {
            db.permission.create( permission ).$promise.then( function( response ){
              role.permissions.push( response.ops[ 0 ]);
            });
          });
          callback( role );
        }
      });
    };

    var setRole = function( role ){
      db.role.query().$promise.then( function( roles ){
        if (roles.length == 0 ) {
          db.role.create( role ).$promise.then( function( response ){
            console.log( response );
            ctrl.roles.push( response.ops[0] );
          });
        }
      });
    };

    ctrl.$onInit = function(){

      var permissions = [
        {
          "name" : "Clients", 
          "sequence" : 2, 
          "url" : "#/customer"
        },
        {
          "name" : "Ventes", 
          "sequence" : 3, 
          "url" : "#/sale"
        },
        {
          "name" : "Achats", 
          "sequence" : 4, 
          "url" : "#/expense"
        },
        {
          "name" : "Dashboard", 
          "sequence" : 1, 
          "url" : "#/dashboard"
        },
        {
          "name" : "Produits et services", 
          "sequence" : 6, 
          "url" : "#/item"
        },
        {
          "name" : "Fournisseurs", 
          "sequence" : 7, 
          "url" : "#/supplier"
        },
        {
          "name" : "Paiements", 
          "sequence" : 5, 
          "url" : "#/payment"
        },
        {
          "name" : "Rapports", 
          "sequence" : 8, 
          "url" : "#/report"
        }
      ];

      var role = {  
        "name" : "Administrateur", 
        "created_at" : "2018-05-13", 
        "permissions" : [], 
        "updated_at" : "2018-05-27", 
        "updated_by" : "5aeb16b2064c3d659bffd4f7", 
        "sysadmin" : true
      };


      //permissions
      setPermissions( permissions, role, function( role ){
        setRole( role );
      });

      ctrl.roles = db.role.query();


			ctrl.pourcentage = '25%';
		}
	}

	angular
	.module('welcome')
	.component('welcome',{
		templateUrl : 'welcome/welcome.template.html',
		controller : ['$scope', '$window', 'db', WelcomeController]
	})

})();