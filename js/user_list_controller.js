(function() {
    var app = angular.module("pioneerRoad");

    var UserListController = function($scope, $http) { //controls creating the user list

        var getUsers = function() { // gets user list from server

            $http.get('http://pioneerroad.com.au:8081/api/v1/admin/user/account/list')
                    .success(function(data) {
                        $scope.users = data.data;
                    })
                    .error(function(data) {
                        $scope.ShowErrorModal = true;
                        $scope.error = "Unable to get user list from server";
                        console.log(data);
                    });
        };

        $scope.Delete = function() { //used to do the final delete, called when save changes is pressed
            $http.delete('http://pioneerroad.com.au:8081/api/v1/admin/user/' + $scope.uid_to_delete.id + '/account/delete')
                    .success(function(response) {
                        console.log("delete happened on user " + $scope.uid_to_delete.id);
                        getUsers();
                    }).error(function(response) {
                        console.log(response);
            });
        };
        
        $scope.Setdelete = function(uid) { //used to select the user to be deleted
            $scope.uid_to_delete = uid; //stores the user object to be deleted from the server
        };

        $scope.closeModal = function() { //same as in user_create_controller, should be moved to a validate_controller.js
            $scope.ShowErrorModal = false;
        };
        $scope.changeSort = function(p) { // handles the display order of users by their id

            if (p === 'true') {
                $scope.user_sort_order = 'id';
            }
            else {
                $scope.user_sort_order = '-id';
            }
        };

        //initialising vars
        $scope.users = [];
        $scope.ShowErrorModal = false;
        $scope.uid_to_delete;
        $scope.user_sort_order = 'id';
        getUsers();
    };

    app.controller("UserListController", UserListController);
}());


