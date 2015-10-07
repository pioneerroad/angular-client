(function () {
    var app = angular.module("pioneerRoad");

    app.controller('messagesController', ['$scope', '$rootScope', '$location', '$sce', 'messagesService', 'loginRedirect', function ($scope, $rootScope, $location, $sce, messagesService, loginRedirect) {

            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
            }

            $rootScope.Title = $sce.trustAsHtml("Messages");
            $rootScope.Link = $sce.trustAsHtml("");
            
            var thread = {};
            $scope.threads = [];

            var getThreads = function () {
                messagesService.getThread()
                        .success(function (response) {
                            console.log(response);
                            for (i = 0; i < response.length; i++) { // for each request
                               thread = response[i];
                               console.log(thread);
                                if (response[i].profilePhoto === null) {
                                    thread.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/user-profile-default-img.svg";
                                }
                                else {
                                    thread.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/user-photos/" + response[i].subscriberid + "/profile-photo/" + response[i].photo.medium;
                                }

                                $scope.threads.push(thread);
                                thread = {};
                            }
                        })
                        .error(function (error) {
                            console.log(error);
                            threads = [];
                        });
            };
            getThreads();
        }]);
}());