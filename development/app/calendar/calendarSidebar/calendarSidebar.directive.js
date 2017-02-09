
(function () {
    'use strict';

    angular.module('calendarWidget').directive('calendarSidebar', [
        '$document',
        function ($document) {
            return {
                templateUrl: '/app/calendar/calendarSidebar/calendarSidebar.html',
                restrict: 'AE',
                replace: true,
                scope: {

                },
                link: function (scope, element, attr) {
                    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    var listReserveNum = 10;
                    var listShowNum = 12;
                    var currentDate = new Date();
                    currentDate.setMonth(0);
                    currentDate.setYear(2015);

                    var test = new Date();


                    scope.monthList = monthListInit();

                    element.on("mousewheel DOMMouseScroll", onScroll);

                    // console.log(test);
                    // console.log(test.getMonth()); //FEB === 1

                    //
                    //
                    //
                    function monthListInit() {
                        var monthList = [];
                        var length = listReserveNum * 2 + listShowNum;
                        var start = -parseInt(length/2);

                        var date = new Date(currentDate);
                        date.setDate(start);
                        for(var i = 0; i < length; i++) {
                            var currMonth = date.getMonth();
                            if(currMonth === 0) {
                                monthList.push(date.getFullYear());
                                i++;
                            }
                            monthList.push(currMonth);
                            date.setMonth(currMonth + 1);
                        }

                        console.log(monthList);

                        return monthList;
                    }

                    var currShift = 0;
                    element[0].querySelector('.calendar-month-list').style.top = (currShift * 50 + 25) + 'px';

                    function onScroll(e) {
                        e.preventDefault();
                        // console.log('scroll');
                        // console.log(e);

                        if (e.wheelDeltaY > 0) {
                            currShift++;
                        }
                        else {
                            currShift--;
                        }


                        element[0].querySelector('.calendar-month-list').style.top = (currShift * 50 + 25) + 'px';

                    }
                }
            }
        }]
    );

})();

