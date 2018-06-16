var translationsEN = {
  HEADLINE: 'What an awesome module!',
  PARAGRAPH: 'Srsly!',
  PASSED_AS_TEXT: 'Hey there! I\'m passed as text value!',
  PASSED_AS_ATTRIBUTE: 'I\'m passed as attribute value, cool ha?',
  PASSED_AS_INTERPOLATION: 'Beginners! I\'m interpolated!',
  VARIABLE_REPLACEMENT: 'Hi {{name}}',
  MISSING_TRANSLATION: 'Oops! I have not been translated into German...',
  BUTTON_LANG_DE: 'German',
  BUTTON_LANG_EN: 'English'
};
 
var translationsFR= {
  HEADLINE: 'Was für ein großartiges Modul!',
  PARAGRAPH: 'Ernsthaft!',
  PASSED_AS_TEXT: 'Hey! Ich wurde als text übergeben!',
  PASSED_AS_ATTRIBUTE: 'Ich wurde als Attribut übergeben, cool oder?',
  PASSED_AS_INTERPOLATION: 'Anfänger! Ich bin interpoliert!',
  VARIABLE_REPLACEMENT: 'Hi {{name}}',
  // MISSING_TRANSLATION is ... missing :)
  BUTTON_LANG_DE: 'Deutsch',
  BUTTON_LANG_EN: 'Englisch'
};


angular.
  module('spa').
  config(['$compileProvider','$locationProvider', '$routeProvider','$translateProvider',
    function config($compileProvider, $locationProvider, $routeProvider ,$translateProvider) {
      //$locationProvider.hashPrefix('!');

      // $translateProvider.useStaticFilesLoader({
      //     prefix: '/i18n/',
      //     suffix: '.json'
      // });
      // add translation table
      // add translation tables
      // $translateProvider.translations('en', translationsEN);
      // $translateProvider.translations('fr', translationsFR);
      // $translateProvider.fallbackLanguage('fr');
      // $translateProvider.preferredLanguage('fr');

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