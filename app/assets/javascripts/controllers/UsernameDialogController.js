websocketchat.controller(
  'UsernameDialogController',
  ['$scope', '$modalInstance',
    function($scope, $modalInstance) {
      $scope.submit = function() {
        $modalInstance.close($scope.username);
      }
    },
  ]
);
