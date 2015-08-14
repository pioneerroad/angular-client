(function () {
    var app = angular.module("pioneerRoad", ["ui.bootstrap.modal", "ngRoute", "ngStorage"]); //ui.bootstrap.modal is used for the interactions between angular and the modals
    app.run(function ($rootScope) {
        $rootScope.navbar = false;
    });


}());