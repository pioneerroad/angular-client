(function () {
    var app = angular.module("pioneerRoad");

    app.controller('notificationBarController', ['$scope', '$rootScope', 'NotificationService', function ($scope, $rootScope, NotificationService) {
            $scope.showHideNav = function () {

                if ($rootScope.showNav) {
                    $rootScope.showNav = false;
                }
                else {
                    $rootScope.showNav = true;
                }
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