websocketchat.controller(
  'LoginDeviseController',
  [
    '$scope', '$state', '$modal', 'LoginService', 'UserDataService', 'ControllerFactory',
    function($scope, $state, $modal, LoginService, UserDataService, ControllerFactory) {
      ControllerFactory.decorateAlerts($scope);

      $scope.user_credentials = {};

      var dispatcherAddress = window.location.hostname + ':3001/websocket';
      dispatcher = new WebSocketRails(dispatcherAddress);

      //Check if user is not logged in already
      LoginService.getCurrentUser()
        .success(function(response) {
          console.log(response);

          if( response.id != null ) {
            UserDataService.setUser(response.username, 'devise');
            $state.go('app.chat')
          }
        })

      $scope.submit = function() {
        LoginService.login($scope.user_credentials)
          .success(function(response) {
            if( typeof(response.error) != "undefined" ) {
              console.log('Error : ' + response.error);
            } else {
              UserDataService.setUser(response.username, 'devise');
              //window.location.reload();
              $state.go('app.chat')
            }
          })
          .error(function(response) {
            if( typeof(response.error) != "undefined" ) {
              $scope.alerts = [];
              //!!! Here we take response.error ( not errorS )
              $scope.addAlert(response.error, 'danger');
            }
          });
      }
    }
  ]
);
