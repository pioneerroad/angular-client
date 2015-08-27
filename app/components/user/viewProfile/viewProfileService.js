(function () {

    angular.module('pioneerRoad')
            .factory('viewProfileService', ['$http', '$localStorage',
                function ($http, $localStorage) {
                    var service = {};

                    service.getData = function () {
                        
                        return $http.get('http://pioneerroad.com.au:8081/api/v1/user/'+$localStorage.token.id+'/profile/fetch'
                                );
                    };

                    return service;
                }
            ]);
}());