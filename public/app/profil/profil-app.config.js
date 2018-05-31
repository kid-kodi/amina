angular.
module('profilApp').
config(['$routeProvider',
function config($routeProvider) {
  $routeProvider
    .when( '/profil', {
      template: '<profil-detail></profil-detail>'
    });
}
]);