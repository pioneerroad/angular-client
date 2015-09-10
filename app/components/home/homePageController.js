(function(){
     var app = angular.module("pioneerRoad");

    app.controller('homePageController', ['$scope' ,'$rootScope', function ($scope,$rootScope) {
         $rootScope.startSocket();
    }]);
}());