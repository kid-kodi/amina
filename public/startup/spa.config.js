angular.
  module('spa').
  config(['$compileProvider','$locationProvider', '$routeProvider',
    function config($compileProvider, $locationProvider, $routeProvider) {

      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|data|blob):/);

      $routeProvider.
        when( '/', {
          template: '<welcome></welcome>'
        })
        .when( '/setting', {
          template: '<setting></setting>'
        })
        .when( '/user', {
          template: '<user></user>'
        })
        .otherwise('/');

    }
  ])
  .run( [
    '$route', '$rootScope' , '$location' , '$window' , 'db',
    function run( $route, $rootScope, $location, $window, db ) {
      db.setting.query().$promise.then( function( setting_map ){
        if ( setting_map.length > 0 ) {
          //$window.location.href = '/login';
        }
      });      
    }

  ]);