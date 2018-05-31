angular.
module('paymentApp').
config(['$routeProvider',
function config($routeProvider) {
  $routeProvider
    .when( '/payment', {
      template: '<payment-list></payment-list>'
    })
    .when( '/payment/:paymentId', {
      template: '<payment-detail></payment-detail>',
    })
    .when( '/payment/edit/:paymentId', {
      template: '<payment-edit></payment-edit>',
    })
    .when( '/payment/sale/:saleId', {
      template: '<payment-sale-detail></payment-sale-detail>',
    })
    .when( '/payment/expense/:expenseId', {
      template: '<payment-expense-detail></payment-expense-detail>',
    });
}
]);