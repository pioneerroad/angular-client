(function () {
    var app = angular.module("pioneerRoad");

    app.factory('NotificationService', ['socketFactory', '$localStorage', '$rootScope', 'friendRequestService', '$location', function (socketFactory, $localStorage, $rootScope, friendRequestService, $location) {

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


            socket.on('friend request', function () {
                friendRequestService.updateNum();
            });

            socket.on('new message', function (data) {
                var index;
                data = data.fulfillmentValue;
                console.log(data);
                if (("/message/" + data.threadId) === $location.path()) {

                    index = $rootScope.messageNoti.indexOf(data.threadId);
                    if (index > -1) {
                        $rootScope.messageNoti.splice(index, 1);                       
                    } //remove any notifications to do with this thread

                    //add message to the rootscope messages var.
                    if (data.senderId === $localStorage.token.id) {
                        data.class = "msg-container from-me";
                    }
                    else {
                        data.class = "msg-container from-them";
                    }
                    $rootScope.messages.push(data);
                }

                else {
                    //check if threadid is in messageNoti
                    //if it is do nothing
                    //else add to array
                    if ($rootScope.messageNoti.indexOf(data.threadId) === -1) {
                        $rootScope.messageNoti.push(data.threadId);
                    }

                    if ("/messages" === $location.path()) {
                        $rootScope.getThreads();
                    }

                }

                //check route
                // if on other page increase notification count

                //if on thread page, call get threads again :-( (need a better way so threads arnt reloading) increase notification count

                //if the message returned threadid matches that of the message/:uid then appended message (will have to use route scope,not good)


            });
            return socket;
        }]);
}());