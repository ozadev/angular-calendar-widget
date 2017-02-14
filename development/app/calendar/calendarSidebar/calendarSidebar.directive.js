
(function () {
    'use strict';

    angular.module('calendarWidget').directive('calendarSidebar', [
        '$document',
        '$timeout',
        function ($document, $timeout) {
            return {
                templateUrl: '/app/calendar/calendarSidebar/calendarSidebar.html',
                restrict: 'AE',
                replace: true,
                scope: {

                },
                link: function (scope, element, attr) {
                    var listConfigSideReserve = 20;
                    var listConfigShowLength = 12;
                    var listConfigItemHeight = 50;
                    var baseMonth = new Date();
                    var selectedIndex = listConfigSideReserve;
                    var scrollDebounceValue = 2;
                    var scrollCount = 0;
                    var listOutLimit;
                    var listOutLimitCount = 0;
                    var listOutLimitMax = 5;
                    var listElement = angular.element(element[0].querySelector(".calendar-month-list"));

                    scope.getMonthName = getMonthName;

                    // initialization

                    //new Date(year, month, date, hours, minutes, seconds, ms)
                    // baseMonth.setFullYear(2016);
                    // baseMonth.setMonth(9);
                    console.log(baseMonth);

                    listGenerate();
                    monthListOffset();
                    console.table(scope.monthList);
                    console.log(selectedIndex);

                    element.on("mousewheel DOMMouseScroll", onScroll);

                    //
                    //
                    //
                    function listGenerate() {
                        var list = [];
                        var decLength = Math.floor(listConfigShowLength / 2) + listConfigSideReserve;
                        var incLength = Math.ceil(listConfigShowLength / 2) + listConfigSideReserve;

                        var date = new Date(baseMonth);
                        var year = date.getFullYear();
                        date.setMonth(date.getMonth() - 1);

                        for(var i = decLength - 1; i >= 0; i--) {
                            if(date.getFullYear() !== year) {
                                list[i] = {
                                    key: year,
                                    date: date.toISOString()
                                };
                                year = date.getFullYear();
                                continue;
                            }
                            list[i] = {
                                key: date.getMonth(),
                                date: date.toISOString()
                            };
                            date.setMonth(date.getMonth() - 1);
                        }

                        date = new Date(baseMonth);
                        year = date.getFullYear();

                        for(i = decLength; i < decLength + incLength; i++) {
                            if(date.getFullYear() !== year) {
                                list[i] = {
                                    key: date.getFullYear(),
                                    date: date.toISOString()
                                };
                                year = date.getFullYear();
                                continue;
                            }
                            list[i] = {
                                key: date.getMonth(),
                                date: date.toISOString()
                            };
                            date.setMonth(date.getMonth() + 1);
                        }

                        scope.monthList = list;
                        selectedIndex = decLength;

                    }

                    function monthListOffset() {
                        var listOffset = Math.floor(listConfigShowLength / 2) - selectedIndex;
                        var listOffsetPixels = listOffset * listConfigItemHeight - listConfigItemHeight / 2;
                        listElement.css('top', listOffsetPixels + 'px');
                    }

                    listElement.on("transitionend", function(event) {
                        if(listOutLimit) {
                            listOutLimit = false;
                            listOutLimitCount = 0;
                            listElement.css('transition', 'none');
                            scope.$apply(listGenerate());
                            scope.$apply(monthListOffset());
                        }
                    });

                    function onScroll(e) {
                        var scrollDirectionTop = e.wheelDeltaY > 0;

                        e.preventDefault();

                        scrollCount++;

                        if(scrollCount >= scrollDebounceValue) {
                            scrollCount = 0;

                            if (scrollDirectionTop) {
                                if(listOutLimitCount < listOutLimitMax)
                                    selectedIndex--;

                                if (selectedIndex < Math.ceil(listConfigShowLength)) {
                                    baseMonth = new Date(scope.monthList[selectedIndex].date);
                                    listOutLimit = true;
                                    listOutLimitCount++;
                                }
                            }
                            else {
                                if(listOutLimitCount < listOutLimitMax)
                                    selectedIndex++;

                                if (selectedIndex > listConfigShowLength + 2 * listConfigSideReserve - Math.floor(listConfigShowLength)) {
                                    baseMonth = new Date(scope.monthList[selectedIndex].date);
                                    listOutLimit = true;
                                    listOutLimitCount++;
                                }
                            }
                            console.log(baseMonth);

                            monthListOffset();
                        }

                    }

                    function getMonthName(key, isLastItem) {
                        if(isLastItem) {
                            $timeout(function() {
                                listElement.css('transition', '');
                            }, 0);
                        }

                        return key;

                        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        if(key < months.length) {
                            return months[key];
                        }
                        else {
                            return key;
                        }
                    }

                    scope.test = function() {
                        console.log('test');
                    }

                }
            }
        }]
    );

})();

