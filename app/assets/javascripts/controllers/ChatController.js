websocketchat.controller(
  'ChatController',
  [
    '$scope', '$state', '$stateParams', '$modal', 'LoginService', 'UserDataService', 'ControllerFactory',
    function($scope, $state, $stateParams, $modal, LoginService, UserDataService, ControllerFactory) {
      ControllerFactory.decorateAlerts($scope);
      ControllerFactory.initAnimations($scope, $state, $stateParams);

      $scope.chatData = [];
      $scope.peopleInChat = [];

      $scope.username = UserDataService.user.username

      // If user not set, get back to user select
      if( UserDataService.isSet() == false ) {
        exitFromChatState();
      }

      // Websocket connect
      var dispatcherAddress = window.location.hostname + ':3001/websocket';
      dispatcher = new WebSocketRails(dispatcherAddress);
      dispatcher.trigger('add_user', {user: UserDataService.user} );

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
        dispatcher.trigger('add_message', sentMessage)
        $scope.message = '';
        $('#prompt').focus();
      }

      dispatcher.bind('chat_listener', function(data) {
        $scope.chatData.push(data);
        $scope.$apply();

        var mydiv = $('#js-chat-window');
        mydiv.scrollTop(mydiv.prop('scrollHeight'));
      });

      dispatcher.bind('users_list_listener', function(data) {
        $scope.peopleInChat = data;
        $scope.$apply();
      });

      function exitFromChatState() {
        if( UserDataService.user.authtype == 'devise') {
          $scope.moveStateUp('app.login_devise_user');
        } else if( UserDataService.user.authtype == 'temp' ) {
          $scope.moveStateUp('app.login_temp_username');
        } else if( UserDataService.user.authtype == 'facebook' ) {
          $scope.moveStateUp('app.login_facebook');
        } else {
          $scope.moveStateUp('app.login_temp_username');
        }
      }
    }
  ]
);
