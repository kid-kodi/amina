angular.
module('customerApp').
config(['$routeProvider',
function config($routeProvider) {
  $routeProvider
    .when( '/customer', {
      template: '<customer-list></customer-list>',
    })
    .when( '/customer/:customerId', {
      template: '<customer-detail></customer-detail>',
    })
    .when( '/customer/:customerId/sale/:saleId', {
      template: '<customer-sale></customer-sale>',
    });
}
]);