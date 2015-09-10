(function () {
    var app = angular.module("pioneerRoad");

    app.controller("socketController", ['$scope', '$localStorage', '$rootScope', function ($scope, $localStorage, $rootScope) {
            $rootScope.startSocket = function () {
                var socket;

                socket = io("http://pioneerroad.com.au:8081");
                socket.on('connect', function () {
                    console.log("socket", socket.connected);
                    socket.emit('authentication', {token: $localStorage.token.token});
                    console.log("trying");
                    socket.on('authenticated', function () {
                        console.log("logged in on server");
                    });
                    
                    socket.on('friend request', function (data) {
                        console.log("got friend");
                    });
                    //socket.emit('setUserId', $scope.uid);

                    //    socket.emit('send notification', $scope.uid);
                    //    socket.on('notification', function (sent_to) {
                    //       console.log(sent_to);
                    //       $scope.messages.push(sent_to);
                    //  });
                });

            };

        }]);
}());