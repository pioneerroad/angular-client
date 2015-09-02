(function () {

    angular.module('pioneerRoad').filter('distanceFilter', function () {
        return function (input) {
            if (input < 1) {
                input = Math.round(input * 1000);
                input += " m";
                return input;
            }
            else {
                input = Math.round(input);
                input += " km";
                return input;
            }
        };
    });

}());