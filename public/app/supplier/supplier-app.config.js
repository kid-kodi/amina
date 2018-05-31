angular.
module('supplierApp').
config(['$routeProvider',
function config($routeProvider) {
  $routeProvider
    .when( '/supplier', {
      template: '<supplier-list></supplier-list>'
    })
    .when( '/supplier/:supplierId', {
      template: '<supplier-detail></supplier-detail>'
    })
    .when( '/supplier/:supplierId/expense/:expenseId', {
      template: '<supplier-expense></supplier-expense>'
    });
}
]);