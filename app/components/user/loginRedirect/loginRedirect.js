(function (module){
    
    var loginRedirect = function($q, $location, $localStorage, $rootScope){
        
        var lastPath = "/home"; //default path when login success
        
        var responseError = function (response){
            if((response.status === 401) && checkLogin()){ //not authorised
                lastPath = $location.path();
                delete $localStorage.token;
                $rootScope.navbar = false;
                $rootScope.user = {};
                $rootScope.locationOff = false;
                $location.path("/login");
            }
            else if (response.status === 401){
                lastPath = $location.path();
                delete $localStorage.token;
                $rootScope.navbar = false;
                $rootScope.user = {};
                $rootScope.locationOff = false;
                $location.path("/login");
            }
            else if(response.status === 400 && checkLogin()){ //bad request
                //work out what to do here, maybe let controllers handle this? or redirect to server error page
            }
             else if(response.status === 118 && checkLogin()){ //bad request
                //work out what to do here, maybe let controllers handle this?
                console.log('cant access server');
            }
            else if(response.status === 403 && checkLogin()){
                lastPath = $location.path();
                delete $localStorage.token;
                $rootScope.navbar = false;
                $rootScope.user = {};
                $rootScope.locationOff = false;
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
            //call check token or someother way to check authentication 
            $rootScope.user = $localStorage.token;
            return true;
            
          } 
          else{
              $rootScope.user = null;
              $rootScope.navbar = false;
              return false;   
          }
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
