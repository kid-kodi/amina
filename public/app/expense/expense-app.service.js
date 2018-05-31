angular.
module('expenseApp').
factory('expenseDB', [ 'DB', 'AlertService', '$cookies',
  function( db, AlertService, $cookies ) {

    var today = new Date(Date.now()).toISOString()
    .replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

    var user = $cookies.getObject( 'inchallah' ) || {};
    
    var get_list = function(){
      return db.expense.query();
    };

    var create = function( expense, callback ){
      new_number( function( number ){
        expense.number     = number;
        expense.balance    = expense.amount;
        expense.created_at = today;
        expense.created_by = user.id;
        db.expense.create( expense )
        .$promise.then( function( result_map ){
          if ( result_map.result.ok == 1 ) {
            AlertService.Success('Expense information saved', true);
          }
          callback( result_map );
        });
      })
    };

    var update = function( expenseId, expense, callback ){
      expense.updated_at = today;
      expense.updated_by = user.id;
      db.expense.update({ id : expenseId }, expense )
      .$promise.then( function( result_map ){
        console.log( result_map );
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('Expense information updated', true);
        }
        callback( result_map );
      });
    };


    var validate = function( expenseId, expense, callback ){
      expense.updated_at = today;
      expense.updated_by = user.id;
      db.expense.update({ id : expenseId }, 
        { updated_at : today, updated_by : user.id, status : 1 } )
      .$promise.then( function( result_map ){
        console.log( result_map );
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('Expense information updated', true);
        }

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
            total         : item.quantity * item.cost,
            created_at    : today
          });
        }
        callback( result_map );
      });
    };


    var new_expense = function(){
      return {
        supplier_id   : '',
        supplier_name : '',
        items         : [],
        balance       : 0,
        amount        : 0,
        status        : 0
      }
    };

    var new_number = function( callback ){
      var number = 0;
      db.expense.query().$promise.then(function( result_map ){
        number = result_map.length + 1;
        callback( number );
      });
    }

    var suppliers = function(){
      return db.supplier.query();
    }
    var items     = function(){
      return db.item.query();
    }

    var getExpense = function( expenseId, callback ){
      db.expense.get({ id:expenseId })
      .$promise.then( function( expense ){
        expense.supplier = db.supplier.get({id:expense.supplier_id});
        callback( expense );
      })
    };

    return {
      getExpense  : getExpense,
      suppliers   : suppliers,
      validate    : validate,
      items       : items,
      new_expense : new_expense,
      get_list    : get_list,
      create      : create,
      update      : update
    };
  }
]);