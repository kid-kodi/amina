angular.
module('itemApp').
factory('itemDB', [ 'DB', 'AlertService', '$cookies',
  function( db, AlertService, $cookies ) {

    var today = new Date(Date.now()).toISOString()
    .replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

    var user = $cookies.getObject( 'inchallah' ) || {};
    
    var get_list = function(){
      return db.item.query();
    };

    var create = function( item, callback ){
      item.created_at = today;
      item.created_by = user.id;
      db.item.create( item )
      .$promise.then( function( result_map ){
        if ( result_map.result.ok == 1 ) {
          AlertService.Success('Item information saved', false);
        }
        callback( result_map );
      });
    };

    var update = function( itemId, item, callback ){
      item.updated_at = today;
      item.created_by = user.id;
      db.item.update({ id : itemId }, item )
      .$promise.then( function( result_map ){
        console.log( result_map );
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('Item information updated', false);
        }
        callback( result_map );
      });
    };

    var getItem = function( itemId ){
      return db.item.get( { id : itemId } );
    };

    var getTransactions = function( itemId, callback ){
      db.transaction.query( {item_id : itemId} )
      .$promise.then( function( result_map ){
        callback( result_map );
      });
    };

    return {
      get_list        : get_list,
      getTransactions : getTransactions,
      getItem         : getItem,
      create          : create,
      update          : update
    };
  }
]);