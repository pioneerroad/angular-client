(function () {
    var app = angular.module("pioneerRoad");

    app.factory('NotificationService', ['socketFactory', '$localStorage', '$rootScope', 'friendRequestService', '$location', 'messagesService', function (socketFactory, $localStorage, $rootScope, friendRequestService, $location, messagesService) {

            // var mysocket = io("https://app-server.pioneerroad.com.au:8090");
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
                if ("/notifications" === $location.path()) {
                    $rootScope.getFriendRequests();
                }
            });

            socket.on('new message', function (data) {
                var index;
                data = data.fulfillmentValue;
                console.log(data);
                $rootScope.$broadcast("hi");
                if (("/message/" + data.threadId) === $location.path()) {
                    //call update thread
                    messagesService.threadRead(data.threadId)
                            .success(function (response) {

                            })
                            .error(function (error) {
                                console.log(error);
                            });
                    index = $rootScope.messageNoti.indexOf(data.threadId);
                    if (index > -1) {
                        $rootScope.messageNoti.splice(index, 1);
                    } //remove any notifications to do with this thread

                    //add message to the rootscope messages var.
                    var d = new Date(data.createdAt); //convert to epoch
                    data.time = d.valueOf();
                    if (data.senderId === $localStorage.token.id) {
                        data.class = "msg-container from-me";
                    }
                    else {
                        data.class = "msg-container from-them";
                    }
                    $rootScope.messages.push(data);
                }

                else {
                    if ($rootScope.messageNoti.indexOf(data.threadId) === -1) {
                        $rootScope.messageNoti.push(data.threadId);
                    }
                    if ("/messages" === $location.path()) {
                        $rootScope.getThreads();
                    }
                }
            });
            return socket;
        }]);
}());