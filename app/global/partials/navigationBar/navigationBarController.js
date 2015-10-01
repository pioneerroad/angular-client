(function () {
    var app = angular.module("pioneerRoad");

    app.controller('navigationBarController', ['$scope', '$rootScope', '$location', '$sce', 'friendRequestService', function ($scope, $rootScope, $location, $sce, friendRequestService) {

            friendRequestService.updateNum();
            $scope.$on('$locationChangeStart', function (event) {
                $('main').removeClass('menu-active');
            });

            //can't use ng click as it breaks the links
            $('#user-menu').on('tap', function (event) {
                $rootScope.Title = $sce.trustAsHtml("User Menu");
                $rootScope.Link = $sce.trustAsHtml("");
            });
            $('#community-menu').on('tap', function (event) {
                $rootScope.Title = $sce.trustAsHtml("Community");
                $rootScope.Link = $sce.trustAsHtml("");
            });


        }]);
}());