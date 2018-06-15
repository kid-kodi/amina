angular.
module('saleApp').
config(['$routeProvider',
function config($routeProvider) {
  $routeProvider
    .when( '/sale', {
      template: '<sale-list></sale-list>'
    })
    .when( '/sale/:saleId', {
      template: '<sale-detail></sale-detail>',
    })
    .when( '/sale/:saleId/customer/:customerId', {
      template: '<sale-edit></sale-edit>',
    });
}
]);