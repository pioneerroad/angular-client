(function () {
    var app = angular.module("pioneerRoad");
    
    app.controller('messagesController', ['$scope', '$rootScope', '$location', '$sce', function ($scope, $rootScope, $location, $sce) {
            
            
                $rootScope.Title = $sce.trustAsHtml("Messages");
                $rootScope.Link = $sce.trustAsHtml("");
           
        }]);
}());