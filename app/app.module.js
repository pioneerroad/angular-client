(function () {
    var app = angular.module("pioneerRoad", ["ui.bootstrap.modal", "ngRoute", "ngStorage", "ngTouch", "btford.socket-io", "pioneerRoad.UserRegister", "pioneerRoad.userLogin", "pioneerRoad.Profile", "pioneerRoad.RelationShips", "pioneerRoad.FriendProfile"]); //ui.bootstrap.modal is used for the interactions between angular and the modals
    app.run(function ($rootScope, friendRequestService, $localStorage) {
        $rootScope.numfriendRequest = 0;
        $rootScope.messageNum = 0;
        $rootScope.messages = []; // holds messages of current thread, not good but only way to appened message without reloading all of them
        $rootScope.messageNoti = [];
        if ($localStorage.Notification !== undefined) {
            $rootScope.messageNoti = $localStorage.Notification; //will store the thread id's of threads with new messages
        }
      

        $rootScope.user = {};
        $rootScope.showNav = false;
        $rootScope.friends = [];
    });
}());