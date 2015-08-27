(function () {
    var app = angular.module("pioneerRoad");
    app.controller('reEnableLocationController', ['$scope', 'deviceTypeService', function ($scope, deviceTypeService) {
            var test = deviceTypeService.getDevice();
            $scope.instruction = [];
            $scope.instruction.push("Please enable location settings on your device");
            $scope.instruction.push("or call xxx for assistance");

        }]);
}());