websocketchat.controller(
  'LoginTempUsernameController',
  [
    '$scope', '$state', '$stateParams', '$modal', 'LoginService', 'UserDataService', 'ControllerFactory',
    function($scope, $state, $stateParams, $modal, LoginService, UserDataService, ControllerFactory) {
      ControllerFactory.decorateAlerts($scope);
      ControllerFactory.initAnimations($scope, $state, $stateParams);

      $scope.user_credentials;

      $scope.submit = function() {
        UserDataService.setUser($scope.username_prompt, 'temp');
        $scope.moveStateUp('app.chat')
      }

      $scope.logout = function() {
        LoginService.logout()
          .success(function(response) {
            console.log(response);
          })
          .error(function(response) {
            console.log(response);
          });
      }
    }
  ]
);
