(function () {

    angular.module('pioneerRoad')
            .factory('userLoginService', ['$http',
                function ($http) {
                    var service = {};

                    service.Login = function (username, password) {
                        /* Use this for real authentication
                         ----------------------------------------------*/
                        return $http.post('http://pioneerroad.com.au:8081/api/v1/user/login', {
                            username: username,
                            password: password
                        });
                    };

                    return service;
                }
            ]);

}());