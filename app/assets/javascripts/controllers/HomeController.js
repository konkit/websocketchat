websocketchat.controller(
  'HomeController',
  [
    '$scope', '$state', '$modal',
    function($scope, $state, $modal) {
      $scope.chatData = [];

      $scope.username = "";

      $modal.open( {
        animation: true,
        templateUrl: 'templates/username_dialog.html',
        controller: 'UsernameDialogController',
        size: 'md',
      })
      .result.then(function(username) {
        $scope.username = username;
      })

      var dispatcherAddress = window.location.hostname
      dispatcherAddress += (window.location.port ? ':'+window.location.port: '') + '/websocket';
      dispatcher = new WebSocketRails(dispatcherAddress);

      $scope.sendMessage = function() {
        var sentMessage = {text: $scope.message, user: $scope.username }
        dispatcher.trigger('add_message', sentMessage)
        $scope.message = '';
      }

      console.log('Setting bind');
      dispatcher.bind('chat_listener', function(data) {
        $scope.chatData.push(data);
        $scope.$apply();
      });
    }
  ]
);
