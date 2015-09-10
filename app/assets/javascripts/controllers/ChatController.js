websocketchat.controller(
  'ChatController',
  [
    '$scope', '$state', '$modal', 'LoginService', 'UserDataService', 'ControllerFactory',
    function($scope, $state, $modal, LoginService, UserDataService, ControllerFactory) {
      ControllerFactory.decorateAlerts($scope);

      $scope.chatData = [];
      $scope.peopleInChat = [];

      // If user not set, get back to user select
      if( UserDataService.isSet() == false ) {
        exitFromChatState();
      }

      // Websocket connect
      var dispatcherAddress = window.location.hostname + ':3001/websocket';
      dispatcher = new WebSocketRails(dispatcherAddress);
      dispatcher.trigger('add_user', {username: UserDataService.user.username} );


      $scope.logout = function() {
        dispatcher._conn.close();

        LoginService.logout()
          .success(function(response) {
            UserDataService.logout();
            exitFromChatState();
          })
          .error(function(response) {
            console.log(response);
          });
      }

      $scope.sendMessage = function() {
        var sentMessage = {text: $scope.message, user: UserDataService.user.username }
        UserDataService.dispatcher.trigger('add_message', sentMessage)
        $scope.message = '';
      }

      dispatcher.bind('chat_listener', function(data) {
        $scope.chatData.push(data);
        $scope.$apply();
      });

      dispatcher.bind('users_list_listener', function(data) {
        $scope.peopleInChat = data;
        $scope.$apply();
      });

      function exitFromChatState() {
        if( UserDataService.user.authtype == 'devise') {
          $state.go('app.login_devise_user');
        } else if( UserDataService.user.authtype == 'temp' ) {
          $state.go('app.login_temp_username');
        } else {
          $state.go('app.login_temp_username');
        }
      }
    }
  ]
);
