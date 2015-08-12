(function() {
      var app = angular.module("pioneerRoad");

      app.config(function($routeProvider) {
            $routeProvider
                  .when("/register", {
                        templateUrl: "app/components/user/userRegister/userRegisterView.html", //redirect to user register page
                        controller: "userRegisterController"
                  })
                   .when("/login", {
                        templateUrl: "app/components/user/userLogin/userLoginView.html", //redirect to user register page
                        controller: "userLoginController"
                  })
                   .when("/home", {
                        templateUrl: "app/components/user/viewProfile/viewProfileView.html", //redirect to user register page
                       
                  })
                  .otherwise({
                        redirectTo: "/login" //redirect 
                  });
      });

}());