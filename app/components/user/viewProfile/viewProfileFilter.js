(function () {
    var app = angular.module("pioneerRoad");
    app.filter('checkDistance', function () {
        return function (input) {
            if(input > 1){
                console.log('less than 1 km');
                
            }
        };
    });
}());