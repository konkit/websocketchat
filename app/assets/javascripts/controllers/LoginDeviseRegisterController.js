websocketchat.controller(
  'LoginDeviseRegisterController',
  [
    '$scope', '$state', '$modal', 'LoginService',
    function($scope, $state, $modal, LoginService) {
      $scope.chatData = [];
      $scope.peopleInChat = [];

      $scope.username = "";
      $scope.user_credentials;

      $('.chat-window').addClass('chat-window-moved');

      var dispatcherAddress = window.location.hostname + ':3001/websocket';
      dispatcher = new WebSocketRails(dispatcherAddress);

      function initChat() {
        $scope.username = $scope.username_prompt;
        dispatcher.trigger('add_user', {username: $scope.username} );

        $('.username-prompt').addClass('username-prompt-moved');
        $('.chat-window').removeClass('chat-window-moved');
      }

      $scope.submit = function() {
        LoginService.register($scope.user_credentials)
          .success(function(response) {
            console.log(response);
            initChat();
          })
          .error(function(response) {
            //$scope.alerts = [];
            //$scope.addAlert(response.error, 'danger');
          });
      }



      $scope.sendMessage = function() {
        var sentMessage = {text: $scope.message, user: $scope.username }
        dispatcher.trigger('add_message', sentMessage)
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
