angular.
module('supplierApp').
factory('supplierDB', [ 'DB', 'AlertService', '$cookies',
  function( db, AlertService, $cookies ) {

    var today = new Date(Date.now()).toISOString()
    .replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

    var user = $cookies.getObject( 'inchallah' ) || {};
    
    var get_list = function(){
      return db.supplier.query();
    };

    var create = function( supplier, callback ){
      supplier.created_at = today;
      supplier.created_by = user.id;
      db.supplier.create( supplier )
      .$promise.then( function( result_map ){
        if ( result_map.result.ok == 1 ) {
          AlertService.Success('Supplier information saved', false);
        }
        callback( result_map );
      });
    };

    var update = function( supplierId, supplier, callback ){
      supplier.updated_at = today;
      supplier.updated_by = user.id;
      db.supplier.update({ id : supplierId }, supplier )
      .$promise.then( function( result_map ){
        console.log( result_map );
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('Supplier information updated', false);
        }
        callback( result_map );
      });
    };

    var expense_list = function( supplierId, callback ){
      db.expense.query( {supplier_id : supplierId} )
      .$promise.then( function( result_map ){
        callback( result_map );
      });
    };


    var getSupplier = function( supplierId ){
      return db.supplier.get( { id : supplierId } );
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
      expense.updated_by = user.id;
      db.expense.update({ id : expenseId }, expense )
      .$promise.then( function( result_map ){
        if ( result_map.update_count.ok == 1 ) {
          AlertService.Success('Expense information updated', true);
        }
        callback( result_map );
      });
    };

    var new_number = function( callback ){
      var number = 0;
      db.expense.query().$promise.then(function( result_map ){
        number = result_map.length + 1;
        callback( number );
      });
    };

    var getExpense = function( expenseId ){
      return db.expense.get( { id : expenseId } );
    };


    return {
      createExpense : createExpense,
      updateExpense : updateExpense,
      getSupplier   : getSupplier,
      getExpense    : getExpense,
      getItems      : getItems,
      newExpense    : newExpense,
      expense_list  : expense_list,
      get_list      : get_list,
      create        : create,
      update        : update
    };
  }
]);