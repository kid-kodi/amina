angular.
module('messageApp').
config(['$routeProvider',
function config($routeProvider) {
  $routeProvider
    .when( '/message', {
      template: '<message-list></message-list>'
    })
    .when( '/message/:messageId', {
      template: '<message-detail></message-detail>',
    })
    .when( '/message/edit/:messageId', {
      template: '<message-edit></message-edit>',
    })
    .when( '/message/sale/:saleId', {
      template: '<message-sale-detail></message-sale-detail>',
    })
    .when( '/message/expense/:expenseId', {
      template: '<message-expense-detail></message-expense-detail>',
    });
}
]);