(function () {

    angular.module('pioneerRoad.Profile')
            .factory('editProfileService', ['$http', '$localStorage', '$rootScope',
                function ($http, $localStorage, $rootScope) {
                    var service = {};

                    service.changeNickName = function (nickname) {

                        return $http.put($rootScope.Api + '/user/' + $localStorage.token.id + '/profile/update/nickname',
                                data = {
                                    nickName: nickname
                                }
                        );
                    };

                    service.getHomeTownSuggestions = function (hometown) {
                        return $http.get($rootScope.Api + '/town/select/' + hometown
                                );
                    };

                    service.setHomeTown = function (hometown) {
                        return $http.put($rootScope.Api + '/user/' + $localStorage.token.id + '/profile/update/hometown',
                                data = {
                                    homeTownId: hometown
                                }
                        );
                    };
                    
                    service.putProfilePic = function(image){
                       var data = {
                           imageFile: image
                       };
                        return $http.put($rootScope.Api + '/user/' + $localStorage.token.id + '/profile/update/photo',data
                        );            
                    };
                    
                    service.putBackgroundPic = function(image){
                       var data = {
                           imageFile: image
                       };
                        return $http.put($rootScope.Api + '/user/' + $localStorage.token.id + '/profile/update/background-photo',data
                        );            
                    };
                    
                    service.setBio = function(data){
                       var body = {
                           bio: data
                       };
                        return $http.put($rootScope.Api + '/user/' + $localStorage.token.id + '/bio',body
                        );            
                    };
                    
                    return service;              
                }
            ]);
}());