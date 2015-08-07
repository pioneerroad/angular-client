(function () {
    var app = angular.module('pioneerRoad');
    var userLoginService = function ($scope, $http, $cookies) {

        var login = function (username, password) {
            var data = {
                username: username,
                password: password
            };
            
            $http.post("http://pioneerroad.com.au:8081/api/v1/user/login", data)
                    .success(function (response, status, headers, config) {
                        console.log("got in");

                    }).error(function (response, status, headers, config) {
                         console.log("nope");

            });
        };

        return{
            login: login
        };
    };
    app.factory('userLoginService', userLoginService, ['$scope', '$http', '$cookies']);
}());