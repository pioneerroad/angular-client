(function () {
     var app = angular.module("pioneerRoad");
    
            app.controller('userLoginController', ['$scope', '$http', 'userLoginService', function ($scope, $http, userLoginService) {
                    $scope.messageBool = false;

                    $scope.closeError = function () {
                        $scope.messageBool = false;
                    };

                    $scope.authenticate = function () {
                        userLoginService.Login($scope.email, $scope.password)
                                .success(function (response) {
                                    if (response) {
                                        // add to the location storage
                                        console.log("good");
                                    }
                                })
                                .error(function (error) {
                                    console.log(error);
                                });
                    };
                }]);

}());