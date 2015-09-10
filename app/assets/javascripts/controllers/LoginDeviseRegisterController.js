websocketchat.controller(
  'LoginDeviseRegisterController',
  [
    '$scope', '$state', '$stateParams', '$modal', 'LoginService', 'UserDataService', 'ControllerFactory',
    function($scope, $state, $stateParams, $modal, LoginService, UserDataService, ControllerFactory) {
      ControllerFactory.decorateAlerts($scope);
      ControllerFactory.initAnimations($scope, $state, $stateParams);

      $scope.user_credentials = {};

      var dispatcherAddress = window.location.hostname + ':3001/websocket';
      dispatcher = new WebSocketRails(dispatcherAddress);

      $scope.submit = function() {
        LoginService.register($scope.user_credentials)
          .success(function(response) {
            if( typeof(response.errors) != "undefined" ) {
              $scope.alerts = [];
              angular.forEach(response.errors, function(value, key) {
                $scope.addAlert(value, 'danger');
              });
            } else {
              UserDataService.setUser(response.username, 'devise');
              $scope.moveStateDown('app.chat')
            }
          })
          .error(function(response) {
            $scope.alerts = [];
            $scope.addAlert(response.errors, 'danger');
          });
      }
    }
  ]
);
