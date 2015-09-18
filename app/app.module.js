(function () {
    var app = angular.module("pioneerRoad", ["ui.bootstrap.modal", "ngRoute", "ngStorage", "ngTouch", "btford.socket-io", "pioneerRoad.UserRegister", "pioneerRoad.userLogin","pioneerRoad.Profile","pioneerRoad.RelationShips"]); //ui.bootstrap.modal is used for the interactions between angular and the modals
    app.run(function ($rootScope) {
        $rootScope.user = {};
        $rootScope.numfriendRequest; //used to show number of friend requests
        $rootScope.areNotifications = false;
        if ($rootScope.numfriendRequest > 0) {
            $rootScope.areNotifications = true;
        }
    }).factory('chatSocket', function (socketFactory, $localStorage, $rootScope) {

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
            console.log("got friend");
            $rootScope.getFriendRequests();
        });
        return socket;

        /*var socket;
         var service = {};
         service.startSocket = function () {
         var mysocket = io("http://pioneerroad.com.au:8081");
         socket = socketFactory({
         ioSocket: mysocket
         });
         socket.on('connect', function () {
         console.log("socket", socket.connected);
         socket.emit('authentication', {token: $localStorage.token.token});
         console.log("trying");
         socket.on('authenticated', function () {
         console.log("logged in on server");
         });
         });
         };
         
         socket.forward('connect');
         return service; */
    });


}());