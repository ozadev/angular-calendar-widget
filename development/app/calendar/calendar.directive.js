
(function () {
    'use strict';

    angular.module('calendarWidget').directive('calendarWidget', [
        function () {
            return {
                templateUrl: '/app/calendar/calendar.html',
                restrict: 'AE',
                replace: true,
                scope: {

                },
                link: function (scope, element, attr) {

                }
            }
        }]
    );

})();

