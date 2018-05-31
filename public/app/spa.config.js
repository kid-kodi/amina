angular.
  module('spa').
  config(['$compileProvider','$locationProvider', '$routeProvider',
    function config($compileProvider, $locationProvider, $routeProvider) {
      //$locationProvider.hashPrefix('!');

      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|data|blob):/);

      $routeProvider.
        when( '/dashboard', {
          template: '<dashboard></dashboard>'
        })
        .otherwise('/dashboard');

    }
  ])
  .run( [
    '$route', '$rootScope' , '$location' , '$window' , '$http' , 'amMoment', '$cookies', 'socket', '$locale',
    function run( $route, $rootScope, $location, $window, $http, amMoment, $cookies, socket, $locale ) {

        angular.element(document).on("click", function(e) { 
          $rootScope.$broadcast("documentClicked", angular.element(e.target)); 
        }); 

        $locale.NUMBER_FORMATS.GROUP_SEP = ' ';
        amMoment.changeLocale( 'fr' );

        $rootScope._user = $cookies.getObject( 'inchallah' ) || {};

        if ($rootScope._user.id == undefined || $rootScope._user.id == null)  {
          $window.location.href = '/';
        }

        var io = socket;
        io.emit('adduser', { name : $rootScope._user.name });

        $route.reload();
        
    }

  ]);