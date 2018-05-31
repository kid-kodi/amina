angular.
module('userApp').
factory('userDB', [ 'DB', 'AlertService', '$cookies',
  function( db, AlertService, $cookies ) {

    var today = new Date(Date.now()).toISOString()
    .replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

    var user = $cookies.getObject( 'inchallah' ) || {};
    
    var get_list = function( callback ){
      db.user.query().$promise.then( function( users ){
        var user_list = [];
        angular.forEach( users, function( user, key ){
          user.role = db.role.get({id:user.role_id});
          user_list.push( user );
        });
        callback( user_list );
      });
    };

    var role_list = function(){
      return db.role.query();
    };

    var create = function( user, callback ){
      user.created_at = today;
      user.created_by = user.id;
      db.user.create( user )
      .$promise.then( function( result_map ){
        if ( result_map.result.ok == 1 ) {
          AlertService.Success('User information saved', false);
        }
        callback( result_map );
      });
    };

    var update = function( userId, user, callback ){
      user.updated_at = today;
      user.updated_by = user.id;
      db.user.update({ id : userId }, user )
      .$promise.then( function( result_map ){
        console.log( result_map );
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('User information updated', false);
        }
        callback( result_map );
      });
    };

    var getUserSales = function( userId ){
      return db.sale.query({created_by:userId});
    };

    var getUserExpenses = function( userId ){
      return db.expense.query({created_by:userId});
    };

    var getRoles = function( userId ){
      return db.role.query();
    };

    var getUser = function( userId ){
      return db.user.get( { id : userId } );
    };

    return {
      getUserSales    : getUserSales,
      getUserExpenses : getUserExpenses,
      getRoles        : getRoles,
      role_list       : role_list,
      get_list        : get_list,
      getUser         : getUser,
      create          : create,
      update          : update
    };
  }
]);