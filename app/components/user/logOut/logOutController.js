(function () {
    var app = angular.module("pioneerRoad.userLogin");

    app.controller('logOutController', ['$scope', 'userLoginService', function ($scope,userLoginService) {

            $scope.logOut = function () {
                userLoginService.Logout();
            };
            
            $scope.logOut();
        }]);
}());