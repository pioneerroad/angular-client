(function () {

    angular.module('pioneerRoad').filter('timeFilter', function () {

        return function (date) {
            if (date === undefined) {
                return " ";
            }
            var seconds = Math.floor((new Date() - date) / 1000);

            var interval = Math.floor(seconds / 31536000);

            if (interval >= 1) {
                return interval + " years ago";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
                return interval + " months ago";
            }
            interval = Math.floor(seconds / 86400);
            if (interval >= 2) {
                return interval + " days ago";
            }
            interval = Math.floor(seconds / 3600);
            if (interval >= 1 && interval < 24) {
                return interval + " hours ago";
            }
            if (interval >= 24 && interval <= 48) {
                return "Yesterday";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 5) {
                interval = (5 * Math.ceil(interval / 5));

                return interval + " minutes ago";
            }
            return "Just now";
        };
    });

}());