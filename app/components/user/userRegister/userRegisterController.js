(function () {
    var app = angular.module("pioneerRoad");
    var userRegisterController = function ($scope, $http) { //handels all of the functionality for creating users including error checking 

        $scope.check_pwd_match = function () { //checks if both passwords match
            if ($scope.password !== $scope.password2) {
                $scope.passwordvalid = false; //if this is false the form cannot be submitted
                $scope.perror = true; //used to show a 'passwords do not match' message in the html (possibly create a custom directive for better resuablitiy)

            }
            else {
                $scope.passwordvalid = true;
                $scope.perror = false;
            }
        };
        $scope.create_user = function () { //creates the structure in which the form data is loaded and post's it to the server

            if ($scope.passwordvalid) { //another check incase people manage to submit an ivalid form

                var data = {//used to store form data
                    username: $scope.email,
                    password: $scope.password,
                    mobile: $scope.mobile
                };
                $http.post('http://pioneerroad.com.au:8081/api/v1/user/create', data).
                        success(function (response, status, headers, config) {
                            $scope.ShowModal = true; // shows the success modal

                        }).
                        error(function (response, status, headers, config) {
                            $scope.error = response.message; //sets the error message for display in the failedmodal
                            if ($scope.error === "Validation error") {
                                if (response.fields.username === null)
                                    $scope.error = "The email " + response.fields.username + " already exsits";
                                else if (response.fields.mobile === null)
                                    $scope.error = "Mobile number already exsits";
                            }
                            console.log(response);
                            $scope.ShowErrorModal = true; //displays failedmodal

                        });
            }
            else { //should only occur if an invalid form is submitted
                
            }

        };
        $scope.closeModal = function () { // as data-dismissed stopped working because of the modal element
            $scope.ShowErrorModal = false; // use this function to close modal's
            $scope.ShowModal = false;
            $scope.IncorrectFeilds = false;
            $scope.errors = [];
            $scope.error = "";
        };
        $scope.CheckForError = function () {

            if ($scope.usercreate.password.$error.required) {
                $scope.errors.push("You did not enter a password");
            }
            else
            {
                if ($scope.usercreate.password.$error.pattern)
                    $scope.errors.push("Password must contain at least One number and One uppercase letter");

                if ($scope.usercreate.password.$error.minlength)
                    $scope.errors.push("Password too short, must be at least 8 characters");
                if(!perror)
                    $scope.errors.push("Passwords do not match");
            }
            if ($scope.usercreate.email.$error.required) {
                $scope.errors.push("You did not enter a email");
            }
            else
            {
                if ($scope.usercreate.email.$error.email)
                    $scope.errors.push("The email you entered is not valid");
            }

            if ($scope.usercreate.mobile.$error.required) {
                $scope.errors.push("You did not enter a mobile number");
            }
            else
            {
                if ($scope.usercreate.mobile.$error.pattern)
                    $scope.errors.push("Mobile number must be a whole number!");

                if ($scope.usercreate.mobile.$error.minlength)
                    $scope.errors.push("Mobile number must be at least 10 digits!");
            }

            $scope.IncorrectFeilds = true;
        };
        //initialising variables
        $scope.passwordvalid = false;
        var perror = false;
        $scope.ShowModal = false;
       
        $scope.IncorrectFeilds = false; 
        $scope.error = "";
        $scope.errors = [];
    };
    app.controller("userRegisterController", userRegisterController);
    userRegisterController.$inject = ['$scope', '$http'];
}());