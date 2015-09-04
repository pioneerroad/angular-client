(function () {
    var app = angular.module("pioneerRoad", ["ui.bootstrap.modal", "ngRoute", "ngStorage", "ngTouch"]); //ui.bootstrap.modal is used for the interactions between angular and the modals
    app.run(function ($rootScope) {
        
        $rootScope.navbar = true;
        $rootScope.numfriendRequest; //used to show number of friend requests
        $rootScope.areNotifications = false;
        if($rootScope.numfriendRequest > 0){
            $rootScope.areNotifications = true;
        }
    });


}());