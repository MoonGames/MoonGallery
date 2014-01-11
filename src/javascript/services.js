angular.module('moonGalleryServices', [], function($provide) {

    $provide.factory('moonGalleryServices', ["$http", function($http) {
            var listeners = {};
            var loggedIn = null;

            return {
                load: function(service, arguments) {
                    var components = "service=" + encodeURIComponent(service);

                    if (arguments) {
                        for (var key in arguments) {
                            components += "&" + key + "=" + encodeURIComponent(arguments[key]);
                        }
                    }

                    return $http.get("service.php?" + components).success(function(data) {
                        testLogin(data);
                    });
                },
                addListener: function(event, listener) {
                    if (listeners[event] == null) {
                        listeners[event] = [];
                    }
                    if (listeners[event].indexOf(listener) == -1) {
                        listeners[event].push(listener);
                    }
                }
            };

            function testLogin(data) {
                var loggedInLocal = data.loggedIn;

                if (loggedIn != null || loggedInLocal != null) {
                    if (loggedIn == null || loggedInLocal == null || loggedIn.email != loggedInLocal.email) {
                        triggerEvent("loginChange", loggedInLocal);
                    }
                }
                
                loggedIn = loggedInLocal;
            }
            
            function triggerEvent(event, data) {
                var listenersToInform = listeners[event] != null ? listeners[event] : [];
                listenersToInform.forEach(function(listener) {
                    listener(data);
                });
            }
        }]);
});