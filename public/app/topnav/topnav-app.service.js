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
    }
  
    return {
    	getRole : getRole,
    	user    : user
    };
  }
]);