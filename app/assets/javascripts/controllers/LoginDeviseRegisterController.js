websocketchat.controller(
  'LoginDeviseRegisterController',
  [
    '$scope', '$state', '$modal', 'LoginService', 'UserDataService',
    function($scope, $state, $modal, LoginService, UserDataService) {
      $scope.user_credentials = {};

      var dispatcherAddress = window.location.hostname + ':3001/websocket';
      dispatcher = new WebSocketRails(dispatcherAddress);

      $scope.submit = function() {
        LoginService.register($scope.user_credentials)
          .success(function(response) {
            UserDataService.setUser(response.username, 'devise');
            $state.go('app.chat')
          })
          .error(function(response) {
            //$scope.alerts = [];
            //$scope.addAlert(response.error, 'danger');
          });
      }
    }
  ]
);
