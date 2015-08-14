(function () {

    angular.module('pioneerRoad')
            .factory('viewProfileService', ['$http', 
                function ($http) {
                    var service = {};

                    service.getData = function (uid) {
                        
                        return $http.get('http://pioneerroad.com.au:8081/api/v1/user/'+uid+'/profile/fetch'
                                );
                    };

                    return service;
                }
            ]);
}());