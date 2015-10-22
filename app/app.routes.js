(function () {
    var app = angular.module("pioneerRoad");

    app.config(function ($routeProvider) {
        $routeProvider
                .when("/register", {
                    templateUrl: "app/components/user/userRegister/userRegisterView.html", //redirect to user register page
                    controller: "userRegisterController"
                })
                .when("/login", {
                    templateUrl: "app/components/user/userLogin/userLoginView.html", //redirect to user login page
                    controller: "userLoginController"
                })
                .when("/profile", {
                    templateUrl: "app/components/user/viewProfile/viewProfileView.html", //redirect to user profile page
                    controller: "viewProfileController"

                })
                .when("/friendProfile/:id", {
                    templateUrl: "app/components/relationships/friendsProfile/viewFriendProfileView.html", //redirect to user profile page
                    controller: "viewFriendProfileController"

                })
                .when("/home", {
                    templateUrl: "app/components/home/homepage.html", //redirect to user home page
                    controller: "homePageController"

                })
                .when("/userMenu", {
                    templateUrl: "app/global/partials/navigationBar/userMenu.html" //redirect to logout page

                })
                .when("/editprofile", {
                    templateUrl: "app/components/user/editProfile/editProfileView.html", //redirect to user editprofile page
                    controller: "editProfileController"

                })
                .when("/community", {
                    templateUrl: "app/components/relationships/relationships/relationshipsView.html", //redirect to community page
                    controller: "relationshipsController"

                })
                .when("/addFriend", {
                    templateUrl: "app/components/relationships/relationships/addFriendView.html",
                    controller: "addFriendController"

                })
                .when("/communityMenu", {
                    templateUrl: "app/global/partials/navigationBar/communityMenu.html", //redirect to community page

                })
                .when("/notifications", {
                    templateUrl: "app/global/partials/notificationBar/notificationsView.html",
                    controller: "friendRequestController"
                })
                .when("/messages", {
                  //  templateUrl: "app/global/partials/messages/messagesView.html",
                  templateUrl: "notAvaliable.html"
                    //controller: "messagesController"
                })
                .when("/message/:id", {
                    templateUrl: "app/global/partials/messages/messageView.html",
                    controller: "messageController"
                })
                .when("/places", {
                    //templateUrl: "app/components/user/viewProfile/viewProfileView.html" //redirect to places page
                    templateUrl: "notAvaliable.html",
                    controller: "placesController"

                })
                .when("/logout", {
                    templateUrl: "app/components/user/logOut/viewlogOut.html", //redirect to logout page
                    controller: "logOutController"

                })
                .otherwise({
                    redirectTo: "/login" //redirect 
                });
    });

}());