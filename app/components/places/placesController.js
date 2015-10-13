(function(){
     var app = angular.module("pioneerRoad.Places", []);

    app.controller('placesController', ['$scope' ,'$rootScope', '$sce', function ($scope,$rootScope,$sce) {
            
            $rootScope.Title = $sce.trustAsHtml("Places");
            $rootScope.Link = $sce.trustAsHtml("");
    }]);
}());