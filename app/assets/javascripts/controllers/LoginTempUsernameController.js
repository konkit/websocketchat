websocketchat.controller(
  'LoginTempUsernameController',
  [
    '$scope', '$state', '$modal', 'LoginService', 'UserDataService',
    function($scope, $state, $modal, LoginService, UserDataService) {
      $scope.user_credentials;

      $scope.submit = function() {
        UserDataService.setUser($scope.username_prompt, 'temp');
        $state.go('app.chat');
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
