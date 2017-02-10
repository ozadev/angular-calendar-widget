
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
                    var listItemHeight = 50;
                    var currentDate = new Date();
                    var currShift = listReserveNum;
                    var count = 0;
                    var yearInsertOffset = 0;

                    // initialization

                    //new Date(year, month, date, hours, minutes, seconds, ms)
                    currentDate.setFullYear(2016);
                    currentDate.setMonth(9);
                    console.log(currentDate);

                    scope.monthList = monthListInit();
                    monthListOffset();

                    element.on("mousewheel DOMMouseScroll", onScroll);

                    // console.log(test.getMonth()); //FEB === 1

                    //
                    //
                    //
                    function monthListInit() {
                        var monthList = [];
                        var length = listReserveNum * 2 + listShowNum;
                        var middle = parseInt(length/2);

                        var date = new Date(currentDate);

                        date.setMonth(currentDate.getMonth() - middle);

                        for(var i = 0; i < length; i++) {
                            var currMonth = date.getMonth();
                            if(currMonth === 0) {
                                monthList.push(date.getFullYear());
                                if(i <= middle) {
                                    yearInsertOffset++;
                                }
                                i++;
                            }
                            monthList.push(currMonth);
                            date.setMonth(currMonth + 1);
                        }

                        console.log(monthList);

                        return monthList;
                    }

                    function monthListOffset() {
                        console.log(listReserveNum);
                        console.log(yearInsertOffset);
                        currShift = listReserveNum + yearInsertOffset;
                        element[0].querySelector('.calendar-month-list').style.top = (-currShift * listItemHeight - listItemHeight / 2) + 'px';
                    }


                    function onScroll(e) {
                        e.preventDefault();

                        count++;

                        if(count >= 2) {
                            count = 0;
                            if (e.wheelDeltaY > 0) {
                                currShift--;
                                currentDate.setMonth(currentDate.getMonth() - 1);
                                if (currShift < parseInt((listReserveNum * 2 + listShowNum)/2 - listShowNum / 2)) {
                                    scope.monthList = monthListInit();
                                    monthListOffset();
                                }
                            }
                            else {
                                currShift++;
                                currentDate.setMonth(currentDate.getMonth() + 1);
                                if (currShift > parseInt((listReserveNum * 2 + listShowNum)/2 + listShowNum / 2)) {
                                    scope.monthList = monthListInit();
                                    monthListOffset();
                                }
                            }
                            console.log(currentDate);
                        }

                        element[0].querySelector('.calendar-month-list').style.top = (-currShift * listItemHeight - listItemHeight / 2) + 'px';

                    }

                    // function clickTest() {
                    //     scope.monthList = scope.monthList.slice(1);
                    // }
                }
            }
        }]
    );

})();

