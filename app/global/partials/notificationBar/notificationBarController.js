(function () {
    var app = angular.module("pioneerRoad");

    app.controller('notificationBarController', ['$scope', '$rootScope', function ($scope, $rootScope) {
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
            };

          /**  $('.friend-actions #new-message').on('tap', function (event) {
                $('#messages-panel').toggleClass('is-visible');
                $('main').toggleClass('no-scroll');
            });

            $('#user-profile-rig-img').on('tap', function (event) {
                $('#user-profile-rig-img-panel').addClass('is-visible');
                $('main').toggleClass('no-scroll');
            }); **/ //implement these once messages has been angularised  
        }]);
}());