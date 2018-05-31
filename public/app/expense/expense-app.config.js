angular.
module('expenseApp').
config(['$routeProvider',
function config($routeProvider) {
  $routeProvider
    .when( '/expense', {
      template: '<expense-list></expense-list>'
    })
    .when( '/expense/:expenseId', {
      template: '<expense-detail></expense-detail>'
    });
}
]);