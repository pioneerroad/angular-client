(function () {
    var app = angular.module("pioneerRoad");

    app.controller('navigationBarController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {


            $scope.OpenFriend = function () {
                $('#notification-panel').toggleClass('is-visible');
            };

            $scope.OpenMessages = function () {
                $('#messages-panel').toggleClass('is-visible');
            };

            $scope.$on('$locationChangeStart', function (event) {
                $('main').removeClass('menu-active');
            });

        }]);
}());