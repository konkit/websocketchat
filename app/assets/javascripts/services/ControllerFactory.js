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

    return o;
  },
]);
