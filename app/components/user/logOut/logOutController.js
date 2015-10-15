(function () {
    var app = angular.module("pioneerRoad.userLogin");

    app.controller('logOutController', ['$scope', '$rootScope', 'userLoginService', function ($scope, $rootScope, userLoginService) {

            $scope.logOut = function () {
                $rootScope.numfriendRequest = 0;
                $rootScope.messages = []; // holds messages of current thread, not good but only way to appened message without reloading all of them
                $rootScope.messageNoti = [];
                $rootScope.friends = [];


                userLoginService.Logout();
            };

            $scope.logOut();
        }]);
}());