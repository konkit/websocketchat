websocketchat.controller(
  'LoginFacebookController',
  [
    '$scope', '$state', '$stateParams', '$modal', 'LoginService', 'UserDataService', 'ControllerFactory',
    function($scope, $state, $stateParams, $modal, LoginService, UserDataService, ControllerFactory) {
      ControllerFactory.decorateAlerts($scope);
      ControllerFactory.initAnimations($scope, $state, $stateParams);

      window.fbAsyncInit = function() {
        FB.init({
          appId  : $('[name=fb_api_key]').val(),
          status : true, // check login status
          version: 'v2.0',
          cookie : true, // enable cookies to allow the server to access the session
          xfbml  : true  // parse XFBML
        });
      };

      (function(d) {
        var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        d.getElementsByTagName('head')[0].appendChild(js);
      }(document));

      $scope.signIn = function() {
        FB.login(function(response) {
          if (response.authResponse) {
            $scope.fbLoginStatus = 'Connected with Facebook, signing in ...';
            $scope.$apply();
            // since we have cookies enabled, this request will allow omniauth to parse
            // out the auth code from the signed request in the fbsr_XXX cookie
            LoginService.loginWithFacebook()
              .success(function(json) {
                UserDataService.setUser(json.username, 'facebook');
                $scope.moveStateDown('app.chat')
              });
          }
        }, { scope: 'email' }); // These are the permissions you are requesting
      };

      $scope.signOut = function() {
        LoginService.logoutWithFacebook()
          .success(function(json) {
            $('#results').html(JSON.stringify(json));
          });
      };

    }
  ]
);
