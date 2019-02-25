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
 
var translationsDE= {
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
  module('spa')
  .config( [ '$locationProvider', '$routeProvider', '$translateProvider',
    function config( $locationProvider, $routeProvider, $translateProvider ) {
      //$locationProvider.hashPrefix( '!' );

      // add translation table
      // add translation tables
      $translateProvider.translations('en', translationsEN);
      $translateProvider.translations('de', translationsDE);
      $translateProvider.fallbackLanguage('en');
      $translateProvider.preferredLanguage('en');

      $routeProvider.
        when( '/', {
          template: '<signin-name></signin-name>'
        })
        .when( '/pass', {
          template: '<signin-pass></signin-pass>'
        })
        .otherwise( '/' );
    }
  ] )
  .run( [
    '$rootScope' , '$location' , '$window'      , '$http' , 
    'amMoment'   , '$cookieStore' , 'APP_CONFIG', 'db',
    function run( $rootScope, $location, $window, $http, amMoment, $cookieStore, APP_CONFIG, db  ) {

      db.setting.query().$promise.then( function( setting_map ){
        if ( setting_map.length == 0 ) {
          $window.location.href = '/startup';
        }
      });  

        amMoment.changeLocale( 'fr' );
        // keep user logged in after page refresh
        $rootScope._user = $cookieStore.get( APP_CONFIG.TOKEN ) || null;

        $rootScope.$on( "$routeChangeStart", function ( event, next, current ) {
          var _user = $rootScope._user;
            if( _user == undefined || _user == null){
              $window.location.href = APP_CONFIG.SLIDE_ONE;
            }

            /*if (next && next.$$route && next.$$route.secure) {
                if (current_user == null || current_user == undefined) {
                    $rootScope.$evalAsync(function () {
                        $window.location.href = '/';
                    } );
                }
                else{}
            }*/
        } );
    }

  ])
  .controller('MainController', ['$translate', '$scope', function ($translate, $scope) {
 
    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };
  }]);;