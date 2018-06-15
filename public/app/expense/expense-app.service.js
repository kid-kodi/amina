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

    var createExpense = function( expense, callback ){
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

    var updateExpense = function( expenseId, expense, callback ){
      expense.updated_at = today;
      expense.balance    = expense.amount;
      expense.updated_by = user.id;
      db.expense.update({ id : expenseId }, expense )
      .$promise.then( function( result_map ){
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('Expense information updated', true);
        }
        callback( result_map );
      });
    };


    var getExpense = function( expenseId ){
      return db.expense.get( { id : expenseId } );
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
    };

    var getSupplier = function( supplierId ){
      return db.supplier.get( { id : supplierId } );
    };

    var getExpense = function( expenseId, callback ){
      db.expense.get({ id:expenseId })
      .$promise.then( function( expense ){
        expense.supplier = db.supplier.get({id:expense.supplier_id});
        callback( expense );
      })
    };

    var getItems = function(){
      return db.item.query();
    };

    var newExpense = function( supplier ){
      return {
        supplier_id   : supplier._id,
        supplier_name : supplier.name,
        items         : [],
        balance       : 0,
        amount        : 0,
        status        : 0
      }
    };

    return {
      getItems      : getItems,
      getExpense    : getExpense,
      newExpense    : newExpense,
      getSupplier   : getSupplier,
      suppliers     : suppliers,
      items         : items,
      new_expense   : new_expense,
      get_list      : get_list,
      createExpense : createExpense,
      updateExpense : updateExpense
    };
  }
]);