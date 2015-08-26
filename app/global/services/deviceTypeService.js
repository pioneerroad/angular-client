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
                            else if(agent.indexOf("Blackberry") !== -1){
                                device = "Blackberry";
                            }
                            console.log(device);
                            return device;
                        
                    };

                    return service;
                }
            ]);
}());