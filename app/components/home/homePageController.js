(function(){
     var app = angular.module("pioneerRoad.Profile");

    app.controller('homePageController', ['$scope' ,'$rootScope', '$sce', function ($scope,$rootScope, $sce) {
            
            $rootScope.Title = $sce.trustAsHtml("Home");
            $rootScope.Link = $sce.trustAsHtml("");
            $scope.width = '90%';
    }]);
}());