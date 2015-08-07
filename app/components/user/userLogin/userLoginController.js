(function () {

    angular.module('pioneerRoad')
            .controller('userLoginController', ['$scope', '$http', 'userLoginService', function ($scope, $http, userLoginService) {
                    $scope.messageBool = false;


                    $scope.closeError = function () {
                        $scope.messageBool = false;
                    };

                    $scope.authenticate = function () {
                        userLoginService.Login($scope.username, $scope.password)
                                .success(function (response) {
                                    if (response.token) {
                                        // add to the location storage
                                        console.log("good");
                                    }
                                })
                                .error(function (error) {
                                    console.log(error);


                                    // $timeout(function() {
                                    //   $scope.messageBool = false;
                                    // }, 2000);
                                    // add a message saying unauthenticated
                                });
                    };
                }]);

}());