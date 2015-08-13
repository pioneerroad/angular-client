(function () {
    var app = angular.module("pioneerRoad");

    app.controller('viewProfileController', ['$scope', '$http', '$location', 'userLoginService', '$rootScope', '$localStorage', 'loginRedirect', function ($scope, $http, $location, userLoginService, $rootScope, $localStorage, loginRedirect) {

           if(!loginRedirect.checkLogin()){
                $location.path("/login");
                console.log("i'm not logged in");
            }

            $scope.logOut = function () {
                userLoginService.Logout();
            };
        }]);

}());