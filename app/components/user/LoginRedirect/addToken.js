(function(module){
    var addToken = function($localStorage, loginRedirect, $q){
        
      var request = function (config){
          if(loginRedirect.checkLogin()){
              config.headers['x-access-token'] = $localStorage.token.token;
          }
          return $q.when(config);
      };
      
      return {
          request: request
      };
    };
    
    module.factory("addToken", addToken);
    module.config(function ($httpProvider){
        $httpProvider.interceptors.push("addToken");
    });
}(angular.module("pioneerRoad")));