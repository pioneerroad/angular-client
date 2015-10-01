(function () {
    var app = angular.module("pioneerRoad", ["ui.bootstrap.modal", "ngRoute", "ngStorage", "ngTouch", "btford.socket-io", "pioneerRoad.UserRegister", "pioneerRoad.userLogin","pioneerRoad.Profile","pioneerRoad.RelationShips", "pioneerRoad.FriendProfile"]); //ui.bootstrap.modal is used for the interactions between angular and the modals
    app.run(function ($rootScope, friendRequestService) {
        $rootScope.user = {};
        friendRequestService.updateNum();
        $rootScope.numfriendRequest; //used to show number of friend requests
        $rootScope.showNav = false;
        $rootScope.friends = [];
    });
}());