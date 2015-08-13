(function (module){
    
    var loginRedirect = function($q, $location, $localStorage){
        
        var lastPath = "/home"; //default path when login success
        
        var responseError = function (response){
            if((response.status == 400 || response.status == 401) && checkLogin()){ //bad request or not authorised
                lastPath = $location.path();
                delete $localStorage.token;
                $location.path("/login");
            }
            return $q.reject(response);
        };
        
        var redirectPostLogin = function(){ //redirects to where user wanted to go
            $location.path(lastPath);
            lastPath = "/home";
        };
        
        var checkLogin = function(){
          if($localStorage.token){
            //call check token
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
