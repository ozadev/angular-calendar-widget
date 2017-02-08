/*
  Main app module run config
  created by Oza / 08-01-2017
*/

(function () {
  'use strict';

  angular.module('App')
    .run([
        '$rootScope',
        '$window',
        '$document',
        function ($rootScope, $window, $document) {

            $rootScope.screenType = ($window.innerWidth < 768) ? 'mobile' :
              ($window.innerWidth < 1200) ? 'tablet' : 'desktop';

            angular.element($window).bind('resize', function() {
                var screenTypeNew = ($window.innerWidth < 768) ? 'mobile' :
                  ($window.innerWidth < 1200) ? 'tablet' : 'desktop';
                if (screenTypeNew !== $rootScope.screenType) {
                    $rootScope.screenType = screenTypeNew;
                    $rootScope.$digest();
                    // console.log($rootScope.screenType);
                }
            });

            $rootScope.isScreenDesktop = function() {
                return $rootScope.screenType === 'desktop';
            };

            $rootScope.isScreenMobile = function() {
                return $rootScope.screenType === 'mobile';
            };

            $rootScope.isScreenTablet = function() {
                return $rootScope.screenType === 'tablet';
            };

            $rootScope.$on('$stateChangeSuccess', function() {
              $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
            });

        }
    ]);

})();