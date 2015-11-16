(function () {
    var app = angular.module("pioneerRoad.UserRegister", []);
    var userRegisterController = function ($scope, $http, $localStorage, loginRedirect, $location, $rootScope, userLoginService) { //handels all of the functionality for creating users including error checking 

        if (loginRedirect.checkLogin()) {
            $location.path("/home");
        }

        $scope.check_pwd_match = function () { //checks if both passwords match
            if ($scope.password !== $scope.password2) {
                $scope.passwordvalid = false; //if this is false the form cannot be submitted
            }
            else {
                $scope.passwordvalid = true;
            }
        };

        $scope.goToLogin = function () {
            $scope.closeModal();
            userLoginService.Login($scope.email.toLowerCase(), $scope.password)
                    .success(function (response) {
                        if (response) {
                            // add to the location storage
                            $rootScope.token = response;
                            $localStorage.token = {
                                token: response.token,
                                id: response.user.id,
                                username: response.user.username
                            };
                            console.log("logged in");
                            $rootScope.navbar = true;
                            $location.path("/home");

                        }
                    })
                    .error(function (error) {
                        $location.path("/login");
                    });
        };


        $scope.create_user = function () { //creates the structure in which the form data is loaded and post's it to the server
            $scope.closeModal();
            if ($scope.passwordvalid) { //another check incase people manage to submit an ivalid form

                var data = {//used to store form data
                    username: $scope.email,
                    password: $scope.password,
                    mobile: $scope.mobile
                };
                $http.post($rootScope.Api + '/user/create', data).
                        success(function (response, status, headers, config) {
                            $scope.ShowModal = true; // shows the success modal

                        }).
                        error(function (response, status, headers, config) {
                            $scope.error = response.message; //sets the error message for display in the failedmodal
                            if ($scope.error === "Validation error") {
                                if ("username" === response.errors[0].path) {
                                    $scope.errors.push("The email  already exsits");
                                }
                                else if ("mobile" === response.errors[0].path) {
                                    $scope.errors.push("Mobile number already exsits");
                                }

                                $scope.IncorrectFeilds = true;
                            }
                        });
            }
            else { //should only occur if an invalid form is submitted

            }

        };
        $scope.closeModal = function () { // as data-dismissed stopped working because of the modal element
            // use this function to close modal's
            $scope.ShowModal = false;
            $scope.IncorrectFeilds = false;
            $scope.errors = [];
            $scope.error = "";

        };
        $scope.CheckForError = function () {
            $scope.closeModal();
            if ($scope.usercreate.password.$error.required) {
                $scope.errors.push("You did not enter a password");
                $scope.IncorrectFeilds = true;
            }
            else
            {
                if ($scope.usercreate.password.$error.pattern) {
                    $scope.errors.push("Password must contain at least One number and One uppercase letter");
                    $scope.IncorrectFeilds = true;
                }
                if ($scope.usercreate.password.$error.minlength) {
                    $scope.errors.push("Password too short, must be at least 8 characters");
                    $scope.IncorrectFeilds = true;
                }
                if (!$scope.passwordvalid) {
                    $scope.errors.push("Passwords do not match");
                    $scope.IncorrectFeilds = true;
                }
            }
            if ($scope.usercreate.email.$error.required) {
                $scope.errors.push("You did not enter a email");
                $scope.IncorrectFeilds = true;
            }
            else
            {
                if ($scope.usercreate.email.$error.email) {
                    $scope.errors.push("The email you entered is not valid");
                    $scope.IncorrectFeilds = true;
                }
            }

            if ($scope.usercreate.mobile.$error.required) {
                $scope.errors.push("You did not enter a mobile number");
                $scope.IncorrectFeilds = true;
            }
            else
            {
                if ($scope.usercreate.mobile.$error.pattern) {
                    $scope.errors.push("Mobile number must be a whole number!");
                    $scope.IncorrectFeilds = true;
                }
                if ($scope.usercreate.mobile.$error.minlength) {
                    $scope.errors.push("Mobile number must be at least 10 digits!");
                    $scope.IncorrectFeilds = true;
                }
            }

            if (!$scope.IncorrectFeilds) {
                $scope.create_user();
            }
        };
        //initialising variables
        $scope.passwordvalid = false;

        $scope.ShowModal = false;

        $scope.IncorrectFeilds = false;
        $scope.error = "";
        $scope.errors = [];
    };
    app.controller("userRegisterController", userRegisterController);
    userRegisterController.$inject = ['$scope', '$http', '$localStorage', 'loginRedirect', '$location', '$rootScope', 'userLoginService'];
}());