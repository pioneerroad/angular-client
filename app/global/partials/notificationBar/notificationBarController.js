(function () {
    var app = angular.module("pioneerRoad");

    app.controller('notificationBarController', ['$scope', '$rootScope', 'NotificationService', 'messagesService', '$sce', '$location', function ($scope, $rootScope, NotificationService, messagesService, $sce, $location) {
            $scope.showHideNav = function () {
                $('main').toggleClass('menu-active');
            };
            if($location.path() === "/notifications")
                $rootScope.Title = $sce.trustAsHtml("Notifications");
            
            var getMessageNotif = function () {
                messagesService.getThread()
                        .success(function (response) {
                            for (i = 0; i < response.length; i++) { // for each request
                                if (response[i].unread_messages) {
                                    $rootScope.messageNoti.push(response[i].threadId);
                                }
                            }
                        })
                        .error(function (error) {
                            console.log(error);
                        });
            };
            getMessageNotif();
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