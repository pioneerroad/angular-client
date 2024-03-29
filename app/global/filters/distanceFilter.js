(function () {

    angular.module('pioneerRoad').filter('distanceFilter', function () {
        return function (input) {
            if (input < 1) {
                input = Math.round(input * 1000);
                input = "Nearby";
                return input;
            }
            else {
                input = Math.round(input);
                if (input === 1) {
                    input = "Nearby";
                    return input;
                }
                else {
                    input += " km";
                    return input;
                }
            }
        };
    });

}());