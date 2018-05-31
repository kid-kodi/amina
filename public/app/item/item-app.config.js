angular.
module('itemApp').
config(['$routeProvider',
function config($routeProvider) {
  $routeProvider
    .when( '/item', {
      template: '<item-list></item-list>'
    })
    .when( '/item/:itemId', {
      template: '<item-detail></item-detail>'
    });
}
]);