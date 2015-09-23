(function () {
    var app = angular.module("pioneerRoad", ["ui.bootstrap.modal", "ngRoute", "ngStorage", "ngTouch", "btford.socket-io", "pioneerRoad.UserRegister", "pioneerRoad.userLogin","pioneerRoad.Profile","pioneerRoad.RelationShips"]); //ui.bootstrap.modal is used for the interactions between angular and the modals
    app.run(function ($rootScope, $sce) {
        $rootScope.user = {};
        $rootScope.numfriendRequest; //used to show number of friend requests
        $rootScope.areNotifications = false;
        $rootScope.showNav = false;
        if ($rootScope.numfriendRequest > 0) {
            $rootScope.areNotifications = true;
        }
    });
}());