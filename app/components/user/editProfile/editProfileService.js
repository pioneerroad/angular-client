(function () {

    angular.module('pioneerRoad.Profile')
            .factory('editProfileService', ['$http', '$localStorage',
                function ($http, $localStorage) {
                    var service = {};

                    service.changeNickName = function (nickname) {

                        return $http.put('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/profile/update/nickname',
                                data = {
                                    nickName: nickname
                                }
                        );
                    };

                    service.getHomeTownSuggestions = function (hometown) {
                        return $http.get('http://pioneerroad.com.au:8081/api/v1/town/select/' + hometown
                                );
                    };

                    service.setHomeTown = function (hometown) {
                        return $http.put('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/profile/update/hometown',
                                data = {
                                    homeTownId: hometown
                                }
                        );
                    };
                    
                    service.putProfilePic = function(image){
                       var data = {
                           imageFile: image
                       };
                        return $http.put('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/profile/update/photo',data
                        );            
                    };
                    
                    service.putBackgroundPic = function(image){
                       var data = {
                           imageFile: image
                       };
                        return $http.put('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/profile/update/background-photo',data
                        );            
                    };
                    
                    service.setBio = function(data){
                       var body = {
                           bio: data
                       };
                        return $http.put('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/bio',body
                        );            
                    };
                    
                    return service;              
                }
            ]);
}());