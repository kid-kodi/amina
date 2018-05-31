(function () {
    'use strict';

    angular
        .module('spa')
        .factory('AlertService', ['$rootScope', '$timeout', Service]);

    function Service( $rootScope, $timeout ) {
        var service = {};

        service.Success = Success;
        service.Error = Error;

        initService();

        return service;

        function clearFlashMessage() {
          var flash = $rootScope.flash;
          if (flash) {
            if (!flash.keepAfterLocationChange) {
                delete $rootScope.flash;
            } else {
                // only keep for a single location change
                flash.keepAfterLocationChange = false;
            }
          }
        }

        function initService() {
            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessage();
            });

            clearFlashMessage();
        }

        function Success(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'success', 
                keepAfterLocationChange: keepAfterLocationChange
            };

            $timeout(function() {
                clearFlashMessage()
            }, 3000);
        }

        function Error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'danger',
                keepAfterLocationChange: keepAfterLocationChange
            };

            $timeout(function() {
                clearFlashMessage()
            }, 3000);
        }
    }

})();