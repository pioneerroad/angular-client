(function (module){
    
    var loginRedirect = function($q, $location, $localStorage){
        
        var lastPath = "/home"; //default path when login success
        
        var responseError = function (response){
            if((response.status == 401) && checkLogin()){ //not authorised
                lastPath = $location.path();
                delete $localStorage.token;
                $location.path("/login");
            }
            else if(response.status == 400 && checkLogin()){ //bad request
                //work out what to do here, maybe let controllers handle this?
            }
            return $q.reject(response);
        };
        
        var redirectPostLogin = function(){ //redirects to where user wanted to go
            $location.path(lastPath);
            lastPath = "/home";
        };
        
        var checkLogin = function(){
          if($localStorage.token){
            //call check token or someother way to check authentication 
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
