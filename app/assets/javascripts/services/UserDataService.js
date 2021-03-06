services.factory('UserDataService', [function () {
    var service = {
      user: {
        ready: false,
        authtype: null,
        username: '',
      },
    };

    service.setUser = function(username, type, image_url) {
      this.user.username = username;
      this.user.ready = true;
      this.user.authtype = type;
      this.user.image_url = image_url;
    }

    service.isSet = function() {
      return this.user.ready;
    }

    service.logout = function() {
      this.user.ready = false;
    }

    return service;
}]);
