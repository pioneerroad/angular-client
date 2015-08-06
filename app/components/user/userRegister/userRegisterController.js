(function() {
    var app = angular.module("pioneerRoad");

    var userRegisterController = function($scope, $http) { //handels all of the functionality for creating users including error checking 

        $scope.check_pwd_match = function() { //checks if both passwords match
            if ($scope.password !== $scope.password2) {
                $scope.passwordvalid = false; //if this is false the form cannot be submitted
                $scope.error = true; //used to show a 'passwords do not match' message in the html (possibly create a custom directive for better resuablitiy)

            }
            else {
                $scope.passwordvalid = true;
                $scope.error = false;
            }
        };

        $scope.create_user = function() { //creates the structure in which the form data is loaded and post's it to the server

            if ($scope.passwordvalid) { //another check incase people manage to submit an ivalid form

                var data = { //used to store form data
                    username: $scope.email,
                    password: $scope.password,
                    mobile: $scope.mobile
                };
                $http.post('http://pioneerroad.com.au:8081/api/v1/user/create', data).
                        success(function(response, status, headers, config) {
                            $scope.ShowModal = true; // shows the success modal
                            
                        }).
                        error(function(response, status, headers, config) {
                            $scope.error = response.message; //sets the error message for display in the failedmodal
                            if($scope.error === "Validation error"){
                                if(response.fields.username === null || response.fields.username.length() === 0)
                                    $scope.error = "The email "+ response.fields.username + " already exsits";
                                else if (response.fields.mobile === null || response.fields.mobile.length() === 0)
                                    $scope.error = "Mobile number already exsits";
                            }
                            console.log(response);
                            $scope.ShowErrorModal = true; //displays failedmodal
                            
                        });
            }
            else { //should only occur if an invalid form is submitted
                $scope.ShowErrorModal = true; //similar as above
                $scope.error = "Passwords do not match";
            }

        };
        $scope.closeModal = function() { // as data-dismissed stopped working because of the modal element
            $scope.ShowErrorModal = false; // use this function to close modal's
            $scope.ShowModal = false;
        };
        
        $scope.CheckForError = function (){
            
            $scope.error = "There are incorrect feilds";
           
            $scope.ShowErrorModal = true;
        };

        //initialising variables
        $scope.passwordvalid = false;
        $scope.error = false;
        $scope.ShowModal = false;
        $scope.ShowErrorModal = false;
        $scope.error = "";

    };


    app.controller("userRegisterController", userRegisterController);
    userRegisterController.$inject = ['$scope', '$http'];
}());