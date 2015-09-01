websocketchat.controller(
  'HomeController',
  [
    '$scope', '$state', '$modal',
    function($scope, $state, $modal) {
      $scope.chatData = [];

      $scope.username = "";

      $modal.open( {
        animation: true,
        templateUrl: '/assets/username_dialog.html',
        controller: 'UsernameDialogController',
        size: 'md',
      })
      .result.then(function(username) {
        $scope.username = username;
      })

      dispatcher = new WebSocketRails(window.location.hostname + ':3000/websocket');

      $scope.sendMessage = function() {
        var sentMessage = {text: $scope.message, user: $scope.username }
        dispatcher.trigger('add_message', sentMessage)
      }

      console.log('Setting bind');
      dispatcher.bind('chat_listener', function(data) {
        console.log('Data arrived : ')
        console.log(data)
        $scope.chatData.push(data);
        $scope.$apply();
      });
    }
  ]
);
