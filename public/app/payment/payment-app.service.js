angular.
module('paymentApp').
factory('paymentDB', [ 'DB', 'AlertService', '$cookies', '$location',
  function( db, AlertService, $cookies, $location ) {

    var today = new Date(Date.now()).toISOString()
    .replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

    var user = $cookies.getObject( 'inchallah' ) || {};
    
    var get_list = function( map, callback ){
      var _map = map;
      db.payment.query( _map ).$promise
      .then( function( result_map ){
        if(callback){
          callback( result_map );
        };
      });
    };

    var create = function( payment, callback ){
      new_number( function( number ){
        payment.number     = number;
        payment.created_at = today;
        payment.created_by = user.id;
        db.payment.create( payment )
        .$promise.then( function( result_map ){
          updateCustomerBalance( payment.customer_id, payment.amount);
          updateSaleBalance( payment.sale_id, payment.amount);
          if ( result_map.result.ok == 1 ) {
            AlertService.Success('Paiement effectué', false);
          }
          callback( result_map );
        });
      })
    };

    var createExpense = function( payment, callback ){
      new_number( function( number ){
        payment.number     = number;
        payment.created_at = today;
        payment.created_by = user.id;
        db.payment.create( payment )
        .$promise.then( function( result_map ){
          updateSupplierBalance( payment.supplier_id, payment.amount);
          updateExenseBalance( payment.expense_id, payment.amount);
          if ( result_map.result.ok == 1 ) {
            AlertService.Success('Expense information saved', false);
          }
          callback( result_map );
        });
      })
    };

    var update = function( paymentId, payment, callback ){
      payment.updated_at = today;
      payment.updated_by = user.id;
      db.payment.update({ id : paymentId }, payment )
      .$promise.then( function( result_map ){
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('Payment information updated', false);
        }
        callback( result_map );
      });
    };

    var updateSupplierBalance = function( supplierId, amount ){
      db.supplier.get({id:supplierId})
      .$promise.then( function( supplier ){
        var overdue = supplier.overdue - amount;
        db.supplier.update({id:supplierId},{overdue:overdue});
      });
    };

    var updateExenseBalance = function( expenseId, amount ){
      db.expense.get({id:expenseId})
      .$promise.then( function( expense ){
        var status = 3;
        var paid = expense.paid + amount;
        var balance = expense.balance - amount;
        if ( balance == 0) {
          status = 1;
          for (var i = 0; i < expense.items.length; i++) {
            item = expense.items[i];
            db.transaction.create({
              type          : 'Expense',
              supplier_id   : item.supplier_id,
              supplier_name : item.supplier_name,
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

            if ( item.item_type == 'produit' ) {
              //update stock
              db.item.get({id:item.item_id}).$promise.then( function( _item ){
                var new_quantity =  _item.quantity + item.quantity;
                db.item.update({id:_item._id}, {quantity : new_quantity});
              });
            }

          }
        }
      db.expense.update({id:expenseId},{balance:balance,paid:paid, status:status});
      });
    };

    var updateCustomerBalance = function( customerId, amount ){
      db.customer.get({id:customerId})
      .$promise.then( function( customer ){
        var overdue = customer.overdue - amount;
        db.customer.update({id:customerId},{overdue:overdue});
      });
    };

    var updateSaleBalance = function( saleId, amount ){
      db.sale.get({id:saleId})
      .$promise.then( function( sale ){
        var status = 3;
        var paid = sale.paid + amount;
        var balance = sale.balance - amount;
        if ( balance == 0) {
          status = 1;
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

            //alert(item.item_type);

            if ( item.item_type == 'produit' ) {
              //update stock
              db.item.get({id:item.item_id}).$promise.then( function( _item ){
                var new_quantity =  _item.quantity - item.quantity;
                db.item.update({id:_item._id}, {quantity : new_quantity});
              });
            }
          }
        }
        db.sale.update({id:saleId},{balance:balance,paid:paid, status:status})
        .$promise.then( function(){
          $location.path('/payment');
        });
      });
    };

    var removeBalance = function( customerId, balance ){
      db.customer.get({id:customerId})
      .$promise.then( function( customer ){
        var overdue = customer.overdue - balance;
        db.customer.update({id:customerId},{overdue:overdue});
      });
    };


    var new_payment = function(){
      return {}
    };

    var new_number = function( callback ){
      var number = 0;
      db.payment.query().$promise.then(function( result_map ){
        number = result_map.length + 1;
        callback( number );
      });
    }

    var customers = function(){
      return db.customer.query();
    }

    var getSalelist = function(){
      return db.sale.query();
    };

    var getPaymentBySale = function( saleId, callback ){
      db.payment.query({ id:saleId })
      .$promise.then( function( payments ){
        callback( payment );
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

    var getPayment = function( paymentId, callback ){
      db.payment.get({ id:paymentId })
      .$promise.then( function( payment ){
        payment.customer = db.customer.get({id:payment.customer_id});
        callback( payment );
      })
    };

    return {
      customers     : customers,
      removeBalance : removeBalance,
      getSalelist   : getSalelist,
      getSale       : getSale,
      getExpense    : getExpense,
      new_payment   : new_payment,
      get_list      : get_list,
      getPayment    : getPayment,
      create        : create,
      createExpense : createExpense,
      update        : update
    };
  }
]);