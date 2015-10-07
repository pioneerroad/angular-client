(function () {
    var app = angular.module("pioneerRoad");

    app.controller('messagesController', ['$scope', '$rootScope', '$location', '$sce', 'messagesService', 'loginRedirect', function ($scope, $rootScope, $location, $sce, messagesService, loginRedirect) {

            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
            }

            $rootScope.Title = $sce.trustAsHtml("Messages");
            $rootScope.Link = $sce.trustAsHtml("");

            var getThreads = function () {
                messagesService.getThread()
                        .success(function (response) {
                            console.log(response);
                            for (i = 0; i < response.length; i++) { // for each request
                                thread = response;

                                if (response[i].profilePhoto === null) {
                                    friend.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/user-profile-default-img.svg";
                                }
                                else {
                                    friend.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/user-photos/" + response[i].userAccountId + "/profile-photo/" + response[i].profilePhoto.medium;
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