angular.
module('reportApp').
factory('reportDB', [ 'DB', 'AlertService',
  function( db, AlertService ) {

    var today = new Date(Date.now()).toISOString()
    .replace(/T/, ' ').replace(/\..+/, '').slice(0,10);
    
    var get_items = function(){
      return db.item.query();
    };

    var get_users = function(){
      return db.user.query();
    };

    var get_list = function(){
      return db.report.query();
    };

    var get_setting = function( callback ){
      db.setting.query().$promise
      .then( function( result_map ){
        var setting = result_map[ 0 ];
        callback( setting );
      });
    };

    var get_data = function( callback ){
      db.transaction.query().$promise
      .then( function( result_map ){
        var _net_incomes = 0;
        var _incomes = 0;
        var _expenses = 0;
        for (var i = 0; i < result_map.length; i++) {
          if (result_map[i].type == 'Sale') {
            _incomes = _incomes + result_map[i].total;
          }
          if (result_map[i].type == 'Expense') {
            _expenses = _expenses + result_map[i].total;
          }
        }
        _net_incomes = _incomes - _expenses;
        callback( _net_incomes, _incomes, _expenses );
      });
    };

    var profit_lost = function( min_date, max_date, callback ){
      console.log( min_date );
      console.log( max_date );
      var list = [];
      db.transaction.query().$promise
      .then( function( result_map ){
        console.log( result_map );
        angular.forEach( result_map, function( transaction, key ){
          var updated_date = new Date( transaction.created_at );
          var compared_date_to = new Date( max_date );
          var compared_date_from = new Date( min_date );

          if( compared_date_from <= updated_date && updated_date <= compared_date_to ){
            list.push( transaction );
          }
        });


        callback( list );
      });
    };


    return {
      get_users   : get_users,
      get_setting : get_setting,
      get_items   : get_items,
      get_list    : get_list,
      get_data    : get_data,
      profit_lost : profit_lost
    };
  }
]);