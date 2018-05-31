angular.
module('settingApp').
config(['$routeProvider',
function config($routeProvider) {
  $routeProvider
    .when( '/setting', {
      template: '<setting-detail></setting-detail>'
    });
}
]);