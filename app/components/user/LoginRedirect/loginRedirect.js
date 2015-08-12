(function (module){
    
    var loginRedirect = function($q, $location, $localStorage){
        
        var lastPath = "/";
        
        var responseError = function (response){
            if(response.status == 400 || response.status == 401){
                lastPath = $location.path();
                $location.path("/login");
            }
            return $q.reject(response);
        };
        
        var redirectPostLogin = function(){
            $location.path(lastPath);
            lastPath = "/";
        };
        
        var checkLogin = function(){
          if($localStorage.token){
              return true;
          } 
          else
              return false;
        };
        
        return{
          responseError: responseError,
          redirectPostLogin: redirectPostLogin,
          checkLogin: checkLogin
        };
    };
        
    
    module.factory("loginRedirect", loginRedirect);
    module.config(function ($httpProvider){
       $httpProvider.interceptors.push("loginRedirect"); 
    });
}(angular.module("pioneerRoad")));
