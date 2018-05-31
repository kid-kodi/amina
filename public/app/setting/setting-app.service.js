angular.
module('settingApp').
factory('settingDB', [ 'DB', 'AlertService',
  function( db, AlertService ) {

    var today = new Date(Date.now()).toISOString()
    .replace(/T/, ' ').replace(/\..+/, '').slice(0,10);
    
    var get_setting = function( callback ){
      db.setting.query().$promise
      .then( function( result_map ){
        var setting = result_map[ 0 ];
        callback( setting );
      });
    };

    var create = function( setting, callback ){
      setting.created_at = today;
      db.setting.create( setting )
      .$promise.then( function( result_map ){
        if ( result_map.result.ok == 1 ) {
          AlertService.Success('Setting information saved', false);
        }
        callback( result_map );
      });
    };

    var update = function( settingId, setting, callback ){
      setting.updated_at = today;
      db.setting.update({ id : settingId }, setting )
      .$promise.then( function( result_map ){
        console.log( result_map );
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('Setting information updated', false);
        }
        callback( result_map );
      });
    };

    return {
      get_setting : get_setting,
      update      : update
    };
  }
]);