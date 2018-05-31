angular.
module('roleApp').
factory('roleDB', [ 'DB', 'AlertService', '$cookies',
  function( db, AlertService, $cookies ) {

    var today = new Date(Date.now()).toISOString()
    .replace(/T/, ' ').replace(/\..+/, '').slice(0,10);
    var user = $cookies.getObject( 'inchallah' ) || {};
    
    var get_list = function(){
      return db.role.query();
    };

    var create = function( role, callback ){
      role.created_at = today;
      role.created_by = user.id;
      db.role.create( role )
      .$promise.then( function( result_map ){
        if ( result_map.result.ok == 1 ) {
          AlertService.Success('Role information saved', false);
        }
        callback( result_map );
      });
    };

    var update = function( roleId, role, callback ){
      role.updated_at = today;
      role.updated_by = user.id;
      db.role.update({ id : roleId }, role )
      .$promise.then( function( result_map ){
        console.log( result_map );
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('Role information updated', false);
        }
        callback( result_map );
      });
    };

    var permissions = function(){
      return db.permission.query();
    }

    var new_role = function(){
      return {
        name        : '',
        sysadmin    : false,
        permissions : []
      }
    };

    var user_list = function( roleName, callback ){
      db.user.query( {role_name : roleName} )
      .$promise.then( function( result_map ){
        callback( result_map );
      });
    }

    return {
      new_role    : new_role,
      permissions : permissions,
      get_list    : get_list,
      user_list   : user_list,
      create      : create,
      update      : update
    };
  }
]);