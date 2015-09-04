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
                   .when("/profile", {
                        templateUrl: "app/components/user/viewProfile/viewProfileView.html", //redirect to user register page
                        controller: "viewProfileController"
                       
                  })
                  .when("/home", {
                        templateUrl: "app/components/home/homepage.html", //redirect to user register page
                        controller: "homePageController"
                       
                  })
                  .when("/editprofile", {
                        templateUrl: "app/components/user/editProfile/editProfileView.html", //redirect to user register page
                        controller: "editProfileController"
                       
                  })
                  .when("/community", {
                        templateUrl: "app/components/relationships/relationships/relationshipsView.html" //redirect to user register page
                        
                       
                  })
                   .when("/places", {
                        templateUrl: "app/components/user/viewProfile/viewProfileView.html" //redirect to user register page
                        
                       
                  })
                  .otherwise({
                        redirectTo: "/login" //redirect 
                  });
      });

}());