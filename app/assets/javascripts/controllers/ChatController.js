websocketchat.controller(
  'ChatController',
  [
    '$scope', '$state', '$modal', 'LoginService', 'UserDataService',
    function($scope, $state, $modal, LoginService, UserDataService) {
      $scope.chatData = [];
      $scope.peopleInChat = [];

      $scope.user = UserDataService.user;
      if( UserDataService.isSet() == false ) {
        $state.go('app.login_temp_username')
      }

      var dispatcherAddress = window.location.hostname + ':3001/websocket';
      dispatcher = new WebSocketRails(dispatcherAddress);
      dispatcher.trigger('add_user', {username: UserDataService.user.username} );

      $scope.logout = function() {
        dispatcher._conn.close();

        LoginService.logout()
          .success(function(response) {
            console.log(response);
            UserDataService.logout();

            if( UserDataService.user.authtype == 'devise') {
              $state.go('app.login_devise_user');
            } else if( UserDataService.user.authtype == 'temp' ) {
              $state.go('app.login_temp_username');
            }
          })
          .error(function(response) {
            console.log(response);
          });
      }

      $scope.sendMessage = function() {
        var sentMessage = {text: $scope.message, user: $scope.user.username }
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
    }
  ]
);
