(function () {
    var app = angular.module("pioneerRoad");

    app.factory('NotificationService',['socketFactory', '$localStorage', '$rootScope', 'friendRequestService', function (socketFactory, $localStorage, $rootScope, friendRequestService) {

        var mysocket = io("http://pioneerroad.com.au:8081");
        var socket = socketFactory({
            ioSocket: mysocket
        });


        socket.on('connect', function () {
            console.log("socket", mysocket.connected);
            socket.emit('authentication', {token: $localStorage.token.token});
            console.log("trying");
            socket.on('authenticated', function () {
                console.log("logged in on server");
            });
        });

        
        socket.on('friend request', function(){
           friendRequestService.updateNum();
        });
        return socket;
    }]);
}());