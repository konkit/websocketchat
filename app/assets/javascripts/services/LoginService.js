services.factory('LoginService', ['$http', function ($http) {
    o = {
      grades: []
    };

    o.register = function( user ) {
      return $http.post( 'users.json', {user: user} )
    }

    o.login = function( user ) {
      return $http.post( 'users/sign_in.json', { user: user } );
    }

    o.getCurrentUser = function() {
      return $http.get( 'home/get_current_user.json', {} )
    }

    o.logout = function() {
      return $http.delete( 'users/sign_out.json', {})
    }

    o.changePassword = function(user_data) {
      return $http.put( 'users.json/', { user: user_data })
    }

    o.loginWithFacebook = function(data) {
      return $.getJSON('users/auth/facebook/callback')
    }

    o.logoutWithFacebook= function(data) {
      return $.getJSON('/auth/facebook/signout')
    }

    return o;
}]);
