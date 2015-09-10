services.factory('ControllerFactory', [function() {
    o = {};

    o.decorateAlerts = function($scope) {
      $scope.alerts = [];

      $scope.addAlert = function(msg, type) {
        $scope.alerts.push({msg: msg, type: type});
      };

      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };
    };

    o.initAnimations = function($scope, $state, $stateParams) {
      console.log('State init, params : ');
      console.log($stateParams);

      var initialClass;
      if( $stateParams.movementType == 'left') {
        initialClass = 'moved-right'
      } else if( $stateParams.movementType == 'right') {
        initialClass = 'moved-left'
      } else if( $stateParams.movementType == 'up') {
        initialClass = 'moved-down'
      } else if( $stateParams.movementType == 'down') {
        initialClass = 'moved-up'
      } else {
        initialClass = 'moved-left'
      }

      console.log("Init class = " + initialClass);

      $('.animation-container').addClass(initialClass);
      setTimeout(
        function() {
          $('.animation-container').removeClass(initialClass);
        }, 300);

      $scope.moveStateLeft = function(targetState) {
        console.log('Started movement left');

        $('.animation-container')
          .bind('otransitionend transitionend webkitTransitionEnd', function() {
            console.log('Animation finished, changing state, target: ' + targetState);
            $state.go(targetState, {movementType: 'left'}, {reload: true})
          })
          .addClass('moved-left')
      }

      $scope.moveStateRight = function(targetState) {
        console.log('Started movement right');

        $('.animation-container')
          .bind('otransitionend transitionend webkitTransitionEnd', function() {
            console.log('Animation finished, changing state, target: ' + targetState);
            $state.go(targetState, {movementType: 'right'}, {reload: true})
          })
          .addClass('moved-right')
      }

      $scope.moveStateUp = function(targetState) {
        console.log('Started movement up');

        $('.animation-container')
          .bind('otransitionend transitionend webkitTransitionEnd', function() {
            console.log('Animation finished, changing state, target: ' + targetState);
            $state.go(targetState, {movementType: 'up'}, {reload: true})
          })
          .addClass('moved-up')
      }

      $scope.moveStateDown = function(targetState) {
        console.log('Started movement down');

        $('.animation-container')
          .bind('otransitionend transitionend webkitTransitionEnd', function() {
            console.log('Animation finished, changing state, target: ' + targetState);
            $state.go(targetState, {movementType: 'down'}, {reload: true})
          })
          .addClass('moved-down')
      }
    }

    return o;
  },
]);
