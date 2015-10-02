(function(){
     var app = angular.module("pioneerRoad.Profile");

    app.controller('homePageController', ['$scope' ,'$rootScope', '$sce','geoLocationService', function ($scope,$rootScope,$sce, geoLocationService) {
            
            $rootScope.Title = $sce.trustAsHtml("Home");
            $rootScope.Link = $sce.trustAsHtml("");
           geoLocationService.begin(); //update location
    }]);
}());