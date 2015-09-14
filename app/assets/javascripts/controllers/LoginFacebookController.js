websocketchat.config(['FacebookProvider', function(FacebookProvider) {
  var api_key = $('[name=fb_api_key]').val();
  console.log('api_key');
  FacebookProvider.init( api_key );
}]);

websocketchat.controller(
  'LoginFacebookController',
  [
    '$scope', '$state', '$stateParams', '$modal', 'LoginService', 'UserDataService', 'ControllerFactory', 'Facebook',
    function($scope, $state, $stateParams, $modal, LoginService, UserDataService, ControllerFactory, Facebook) {
      ControllerFactory.decorateAlerts($scope);
      ControllerFactory.initAnimations($scope, $state, $stateParams);

      function handleFacebookLogin(response) {
        $scope.fbLoginStatus = 'Connected with Facebook, signing in ...';
        // since we have cookies enabled, this request will allow omniauth to parse
        // out the auth code from the signed request in the fbsr_XXX cookie

        LoginService.loginWithFacebook(response)
          .success(function(json) {
            UserDataService.setUser(json.username, 'facebook');
            $scope.moveStateDown('app.chat')
          })
          .error(function(json) {
            console.log(json);

            $scope.alerts = [];
            $scope.addAlert(json.responseJSON.errors, 'danger');
            $scope.$apply();
          });
      }

      $scope.signIn = function($event) {
        spanElement = document.createElement("span");
        spanElement.className = "glyphicon glyphicon-refresh glyphicon-refresh-animate";
        $event.target.appendChild(spanElement);

        Facebook.login(function(response) {
          if (response.authResponse) {
            handleFacebookLogin(response);
          }
        }, { scope: 'email' }); // These are the permissions you are requesting
      };
    }
  ]
);
