angular.
module('topnavApp').
factory('topnavDB', [ 'DB', 'AlertService', '$cookies',
  function( db, AlertService, $cookies ) {

    var today = new Date(Date.now()).toISOString()
    .replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

    var user = $cookies.getObject( 'inchallah' ) || {};

    var getRole = function( callback ){
      db.role.get({id : user.role_id})
      .$promise.then( function( role ){
        callback( role );
      });
    };

    var setting = function( callback ){
      db.setting.query().$promise
      .then( function( result_map ){
        var setting = result_map[ 0 ];
        callback( setting );
      });
    };
  
    return {
    	getRole : getRole,
    	user    : user,
      setting : setting
    };
  }
]);