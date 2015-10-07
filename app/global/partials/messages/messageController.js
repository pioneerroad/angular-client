(function () {
    var app = angular.module("pioneerRoad");

    app.controller('messageController', ['$scope', '$rootScope', '$location', '$sce', 'messagesService', 'loginRedirect' , '$routeParams', function ($scope, $rootScope, $location, $sce, messagesService, loginRedirect, $routeParams) {

            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
            }

        }]);
}());