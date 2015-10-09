(function () {

    angular.module("pioneerRoad.Profile")
            .factory('viewProfileService', ['$http', '$localStorage', '$rootScope',
                function ($http, $localStorage, $rootScope) {
                    var service = {};

                    service.getData = function () {
                        
                        return $http.post($rootScope.Api + '/user/'+$localStorage.token.id+'/profile/fetch'
                                );
                    };

                    return service;
                }
            ]);
}());