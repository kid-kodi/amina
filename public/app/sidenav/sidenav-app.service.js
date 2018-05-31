angular.
module('sidenavApp').
factory('sidenavDB', [ 'DB', 'AlertService', '$cookies',
  function( db, AlertService, $cookies ) {

    var today = new Date(Date.now()).toISOString()
    .replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

    var user = $cookies.getObject( 'inchallah' ) || {};
    
    var get_permissions = function( callback ){
      console.log( user.role_id);

      db.role.get({id : user.role_id})
      .$promise.then( function( result_map ){
        var permissions = result_map.permissions;
        callback( permissions );
      });
    };


    return {
      user            : user,
      get_permissions : get_permissions
    };
  }
]);