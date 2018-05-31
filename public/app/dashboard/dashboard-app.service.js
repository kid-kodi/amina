angular.
module('dashboardApp').
factory('dashboardDB', [ 'DB', 'AlertService', '$cookies',
  function( db, AlertService, $cookies ) {

    var today = new Date(Date.now()).toISOString()
    .replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

    var user = $cookies.getObject( 'inchallah' ) || {};

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

    return {
      user     : user,
      get_data : get_data
    };
  }
]);