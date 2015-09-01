websocketchat.controller(
  'HomeController',
  [
    '$scope', '$state',
    function($scope, $state) {
      $scope.chatData = [];

      dispatcher = new WebSocketRails(window.location.hostname + ':3000/websocket');

      $scope.sendMessage = function() {
        dispatcher.trigger('add_message', $scope.message )
      }

      dispatcher.bind('chat_listener', function(data) {
        console.log('Received response : ' + data);
        $scope.chatData.push(data);
        console.log($scope.chatData);
        $scope.$apply();
      });
    }
  ]
);
