(function () {
    var app = angular.module("pioneerRoad.logOut", []);

    app.controller('logOutController', ['$scope', 'userLoginService', function ($scope,userLoginService) {

            $scope.logOut = function () {
                userLoginService.Logout();
            };
            
            $scope.logOut();
        }]);
}());