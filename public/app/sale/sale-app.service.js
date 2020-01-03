angular.
module('saleApp').
factory('saleDB', [ 'DB', 'AlertService', '$cookies',
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

        db.sale.query( _map )
        .$promise.then( function( result_map ){
          var sales = [];
          angular.forEach( result_map, function(sale, key) {
            sale.customer = db.customer.get({ id:sale.customer_id });
            sales.push( sale );
          });
          if (callback) {
            callback( sales );
          }
        });
      });
      
    };

    var create = function( sale, callback ){
      new_number( function( number ){
        sale.number     = number;
        sale.balance    = sale.amount;
        sale.paid       = 0;
        sale.created_at = today;
        sale.created_by = user.id;
        db.sale.create( sale )
        .$promise.then( function( result_map ){
          updateBalance( sale.customer_id, sale.balance);
          if ( result_map.result.ok == 1 ) {
            AlertService.Success('Sale information saved', false);
          }
          callback( result_map );
        });
      })
    };

    var update = function( saleId, sale, callback ){
      sale.updated_at = today;
      sale.updated_by = user.id;
      db.sale.update({ id : saleId }, sale )
      .$promise.then( function( result_map ){
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('Sale information updated', false);
        }
        callback( result_map );
      });
    };

    var validate = function( saleId, sale, callback ){
      sale.updated_at = today;
      sale.updated_by = user.id;
      db.sale.update({ id : saleId }, {status:1} )
      .$promise.then( function( result_map ){
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('Sale information validated', false);
        }
        if (sale.status == 1) {
          for (var i = 0; i < sale.items.length; i++) {
            item = sale.items[i];
            db.transaction.create({
              type          : 'Sale',
              customer_id   : item.customer_id,
              customer_name : item.customer_name,
              item_type     : item.item_type,
              item_id       : item.item_id,
              item_name     : item.item_name,
              quantity      : item.quantity,
              price         : item.price,
              cost          : item.cost,
              total         : item.quantity * item.price,
              created_at    : today,
              created_by    : user.id,
            });
          }
        }
        callback( result_map );
      });
    };

    var updateBalance = function( customerId, balance ){
      db.customer.get({id:customerId})
      .$promise.then( function( customer ){
        var overdue = customer.overdue + balance;
        db.customer.update({id:customerId},{overdue:overdue});
      });
    };

    var removeBalance = function( customerId, balance ){
      db.customer.get({id:customerId})
      .$promise.then( function( customer ){
        var overdue = customer.overdue - balance;
        db.customer.update({id:customerId},{overdue:overdue});
      });
    };


    var new_sale = function(){
      return {
        customer_id   : '',
        customer_name : '',
        items         : [],
        paid          : 0,
        balance       : 0,
        amount        : 0,
        status        : 0
      }
    };

    var new_number = function( callback ){
      var number = 0;
      db.sale.query().$promise.then(function( result_map ){
        number = result_map.length + 1;
        callback( number );
      });
    }

    var customers = function(){
      return db.customer.query();
    }
    var items     = function(){
      return db.item.query();
    };

    var getSale = function( saleId, callback ){
      db.sale.get({ id:saleId })
      .$promise.then( function( sale ){
        sale.customer = db.customer.get({id:sale.customer_id});
        callback( sale );
      })
    };

    return {
      customers     : customers,
      removeBalance : removeBalance,
      items         : items,
      new_sale     : new_sale,
      get_list      : get_list,
      getSale      : getSale,
      create        : create,
      update        : update,
      validate      : validate
    };
  }
]);