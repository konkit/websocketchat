websocketchat.controller(
  'LoginDeviseController',
  [
    '$scope', '$state', '$stateParams', '$modal', 'LoginService', 'UserDataService', 'ControllerFactory',
    function($scope, $state, $stateParams, $modal, LoginService, UserDataService, ControllerFactory) {
      ControllerFactory.decorateAlerts($scope);
      ControllerFactory.initAnimations($scope, $state, $stateParams);

      $scope.user_credentials = {};

      var dispatcherAddress = window.location.hostname + ':3001/websocket';
      dispatcher = new WebSocketRails(dispatcherAddress);

      //Check if user is not logged in already
      LoginService.getCurrentUser()
        .success(function(response) {
          console.log(response);

          if( response.id != null ) {
            UserDataService.setUser(response.username, 'devise');
            $scope.moveStateDown('app.chat')
          }
        })

      $scope.submit = function() {
        LoginService.login($scope.user_credentials)
          .success(function(response) {
            if( typeof(response.error) != "undefined" ) {
              $scope.alerts = [];
              $scope.addAlert(response.error, 'danger');
            } else {
              UserDataService.setUser(response.username, 'devise');
              $scope.moveStateDown('app.chat')
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
