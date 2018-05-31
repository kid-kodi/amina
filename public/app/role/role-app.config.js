angular.
module('roleApp').
config(['$routeProvider',
function config($routeProvider) {
  $routeProvider
    .when( '/role', {
      template: '<role-list></role-list>'
    });
}
]);