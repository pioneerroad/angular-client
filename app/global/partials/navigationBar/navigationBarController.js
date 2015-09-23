(function () {
    var app = angular.module("pioneerRoad");

    app.controller('navigationBarController', ['$scope', '$rootScope', function ($scope, $rootScope) {
            $scope.doMenuAction = function (id) {

                if ($('#' + id).hasClass("is-visible")) {
                    $('#' + id).removeClass("is-visible");
                }
                else {
                    $('#user-menu').removeClass("is-visible");
                    $('#community-menu').removeClass("is-visible");
                    $('#' + id).addClass("is-visible");
                }

            };
            
            $scope.OpenFriend = function () {
                $('#notification-panel').addClass('is-visible');
            };
            $scope.CloseFriend = function () {
                $('#notification-panel').removeClass('is-visible'); 
            };

            $scope.OpenMessages = function () {
                $('#messages-panel').addClass('is-visible');
            };
            $scope.CloseMessages = function () {
                $('#messages-panel').removeClass('is-visible');
            }
            
        }]);
}());