(function () {
    var app = angular.module("pioneerRoad");

    app.controller('navigationBarController', ['$scope', '$rootScope', function ($scope, $rootScope) {
            $scope.doMenuAction = function (id) {

                if ($('#' + id).hasClass("is-visible")) {
                    $('#' + id).removeClass("is-visible");
                }
                else {
                    $('#user-menu').removeClass("is-visible");
                    $('#community-menu').removeClass("is-visible");
                    $('#' + id).addClass("is-visible");
                }

            };
        }]);
}());