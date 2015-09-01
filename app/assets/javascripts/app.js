websocketchat = angular.module('websocketchat',[
  'ui.router',
  'templates',
  'websocketchat.controllers',
  'websocketchat.services',
  'ui.bootstrap',
]);

websocketchat.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/');

    $stateProvider.state('app', {
      url: '/',
      templateUrl: '/assets/home.html',
      controller: 'HomeController',
    })
  }
]);
