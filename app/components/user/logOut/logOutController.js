(function () {
    var app = angular.module("pioneerRoad.userLogin");

    app.controller('logOutController', ['$scope', 'userLoginService', function ($scope,userLoginService) {

            $scope.logOut = function () {
                $('main').removeClass("menu-active");
                userLoginService.Logout();
            };
            
            $scope.logOut();
        }]);
}());