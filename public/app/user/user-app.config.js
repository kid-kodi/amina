angular.
module('userApp').
config(['$routeProvider',
function config($routeProvider) {
  $routeProvider
    .when( '/user', {
      template: '<user-list></user-list>'
    })
    .when( '/user/:userId', {
      template: '<user-detail></user-detail>'
    });
}
]);