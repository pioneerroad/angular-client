(function () {
    var app = angular.module("pioneerRoad");

    app.controller('logOutController', ['$scope', 'userLoginService', function ($scope,userLoginService) {

            $scope.logOut = function () {
                userLoginService.Logout();
            };
            
            $scope.logOut();
        }]);
}());