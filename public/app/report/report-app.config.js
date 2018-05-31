angular.
module('reportApp').
config(['$routeProvider',
function config($routeProvider) {
  $routeProvider
    .when( '/report', {
      template: '<report-list></report-list>'
    });
}
]);