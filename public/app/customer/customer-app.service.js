angular.
module('customerApp').
factory('customerDB', [ 'DB', 'AlertService', '$cookies',
  function( db, AlertService, $cookies ) {

    var today = new Date(Date.now()).toISOString()
    .replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

    var user = $cookies.getObject( 'inchallah' ) || {};
    
    var get_list = function( list_type, callback ){
      
      db.role.get({id:user.role_id})
      .$promise.then( function( role ){
        var _map = {};

        if( !role.sysadmin ){
          _map = { created_by : user.id };
        }

        db.customer.query( _map )
        .$promise.then( function( result_map ){
          var customers = [];
          angular.forEach( result_map, function(customer, key) {
            customer.sales = db.sale.query({ customer_id:customer._id });
            customers.push( customer );
          });
          callback( customers );
        });
      });
    };

    var create = function( customer, callback ){
      customer.created_at = today;
      //customer.created_by = user.id;
      customer.overdue    = 0;
      db.customer.create( customer )
      .$promise.then( function( result_map ){
        if ( result_map.result.ok == 1 ) {
          AlertService.Success('Customer information saved', false);
        }
        callback( result_map );
      });
    };

    var update = function( customerId, customer, callback ){
      customer.updated_at = today;
      customer.updated_by = user.id;
      db.customer.update({ id : customerId }, customer )
      .$promise.then( function( result_map ){
        console.log( result_map );
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('Customer information updated', false);
        }
        callback( result_map );
      });
    };

    var sale_list = function( customerId, callback ){
      db.sale.query( {customer_id : customerId} )
      .$promise.then( function( result_map ){
        callback( result_map );
      });
    };

    var getCustomer = function( id ){
      if ( id ) {
        return db.customer.get( { id : id } );
      }
    };

    var getSale = function( saleId ){
      return db.sale.get( { id : saleId } );
    };

    var user_list = function(){
      return db.user.query();
    };

    var get_items = function(){
      return db.item.query();
    };

    var new_sale = function( customer ){
      return {
        customer_id   : customer._id,
        customer_name : customer.name,
        items         : [],
        balance       : 0,
        paid          : 0,
        amount        : 0,
        status        : 0
      }
    };

    var createSale = function( sale, callback ){
      new_number( function( number ){
        sale.number     = number;
        sale.balance    = sale.amount;
        sale.created_at = today;
        sale.created_by = user.id;
        db.sale.create( sale )
        .$promise.then( function( result_map ){
          if ( result_map.result.ok == 1 ) {
            AlertService.Success('Sale information saved', true);
          }
          callback( result_map );
        });
      })
    };

    var updateSale = function( saleId, sale, callback ){
      sale.balance    = sale.amount;
      sale.updated_at = today;
      sale.updated_by = user.id;
      db.sale.update({ id : saleId }, sale )
      .$promise.then( function( result_map ){
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('Sale information updated', true);
        }
        callback( result_map );
      });
    };

    var new_number = function( callback ){
      var number = 0;
      db.sale.query().$promise.then(function( result_map ){
        number = result_map.length + 1;
        callback( number );
      });
    }


    var new_customer = function(){
      return {

      }
    }

    return {
      new_customer : new_customer,
      getCustomer  : getCustomer,
      getSale      : getSale,
      createSale   : createSale,
      updateSale   : updateSale,
      user_list    : user_list,
      sale_list    : sale_list,
      get_list     : get_list,
      get_items    : get_items,
      new_sale     : new_sale,
      create       : create,
      update       : update
    };
  }
]);