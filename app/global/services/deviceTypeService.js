(function () {

    angular.module('pioneerRoad')
            .factory('deviceTypeService', [
                function () {
                    var service = {};

                    service.getDevice = function () {
                       
                            var agent = navigator.userAgent;
                            var device; 
                            if(agent.indexOf("iPhone") !== -1){
                                device = "iPhone";
                            }
                            else if(agent.indexOf("Android") !== -1){
                                device = "Android";
                            }
                            else if(agent.indexOf("Nokia") !== -1){
                                device = "Nokia";
                            }
                            else if(agent.indexOf("Linux") !== -1){
                                device = "Linux";
                            }
                            else if(agent.indexOf("Windows") !== -1){
                                device = "Windows";
                            }
                            else{
                                device = "unknown"; 
                            }
                            return device;
                        
                    };

                    return service;
                }
            ]);
}());