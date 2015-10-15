(function () {
    var app = angular.module("pioneerRoad", ["ui.bootstrap.modal", "ngRoute", "ngStorage", "ngTouch", "btford.socket-io", "pioneerRoad.UserRegister", "pioneerRoad.userLogin", "pioneerRoad.Profile", "pioneerRoad.RelationShips", "pioneerRoad.FriendProfile", "pioneerRoad.Places", "luegg.directives"]); //ui.bootstrap.modal is used for the interactions between angular and the modals
    app.run(function ($rootScope, $localStorage) {
        $rootScope.Api = "http://pioneerroad.com.au:8081/api/v1";
        $rootScope.numfriendRequest = 0;
        $rootScope.messages = []; // holds messages of current thread, not good but only way to appened message without reloading all of them
        $rootScope.messageNoti = [];
        $rootScope.user = {};
        $rootScope.showNav = false;
        $rootScope.friends = [];

    });
}());