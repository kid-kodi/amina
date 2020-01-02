angular.
module('profilApp').
factory('profilDB', [ 'DB', 'AlertService', '$cookies',
  function( db, AlertService, $cookies ) {

    var today = new Date(Date.now()).toISOString()
    .replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

    var user = $cookies.getObject( 'inchallah' ) || {};
    
    var get_profil = function( callback ){
      db.user.get({id:user.id}).$promise
      .then( function( result_map ){
        var profil = result_map;
        profil.role = db.role.get({id:profil.role_id});
        callback( profil );
      });
    };

    var role_list = function( callback ){
      db.role.query().$promise
      .then( function( result_map ){
        callback( result_map );
      });
    };

    var update = function( profilId, profil, callback ){
      profil.updated_at = today;
      db.user.update({ id : profilId }, profil )
      .$promise.then( function( result_map ){
        console.log( result_map );
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('Profil information updated', false);
        }
        callback( result_map );
      });
    };

    return {
      role_list  : role_list,
      get_profil : get_profil,
      update     : update
    };
  }
]);