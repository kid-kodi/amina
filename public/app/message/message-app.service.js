angular.
module('messageApp').
factory('messageDB', [ 'DB', 'AlertService', '$cookies',
  function( db, AlertService, $cookies ) {

    var today = new Date(Date.now()).toISOString()
    .replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

    var user = $cookies.getObject( 'inchallah' ) || {};
    
    var get_list = function( map, callback ){
      var _map = map;
      db.message.query( _map ).$promise
      .then( function( result_map ){
        if(callback){
          callback( result_map );
        };
      });
    };

    var create = function( message, callback ){
      new_number( function( number ){
        message.number     = number;
        message.created_at = today;
        message.status = 0;
        message.created_by = user.id;
        db.message.create( message )
        .$promise.then( function( result_map ){
          if ( result_map.result.ok == 1 ) {
            AlertService.Success('Message information saved', false);
          }
          callback( result_map );
        });
      })
    };


    var update = function( messageId, message, callback ){
      message.updated_at = today;
      message.updated_by = user.id;
      db.message.update({ id : messageId }, message )
      .$promise.then( function( result_map ){
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('Message information updated', false);
        }
        callback( result_map );
      });
    };


    var new_message = function(){
      return {}
    };

    var new_number = function( callback ){
      var number = 0;
      db.message.query().$promise.then(function( result_map ){
        number = result_map.length + 1;
        callback( number );
      });
    }

    var customers = function(){
      return db.customer.query();
    };

    var getMessageBySale = function( saleId, callback ){
      db.message.query({ id:saleId })
      .$promise.then( function( messages ){
        callback( message );
      })
    };

    var getSale = function( saleId, callback ){
      db.sale.get({ id:saleId })
      .$promise.then( function( sale ){
        sale.customer = db.customer.get({id:sale.customer_id});
        callback( sale );
      })
    };

    var getExpense = function( expenseId, callback ){
      db.expense.get({ id:expenseId })
      .$promise.then( function( expense ){
        expense.supplier = db.supplier.get({id:expense.supplier_id});
        callback( expense );
      })
    };

    var getMessage = function( messageId, callback ){
      db.message.get({ id:messageId })
      .$promise.then( function( message ){
        message.customer = db.customer.get({id:message.customer_id});
        callback( message );
      })
    };

    return {
      customers     : customers,
      new_message   : new_message,
      get_list      : get_list,
      getMessage    : getMessage,
      create        : create,
      update        : update
    };
  }
]);