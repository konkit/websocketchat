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
    $urlRouterProvider.when('/', '/login_temp');

    $stateProvider.state('app', {
      abstract: true,
      templateUrl: 'templates/home.html',
      controller: 'HomeController',
    })
    .state('app.login_temp_username', {
      url: '/login_temp',
      views: {
        'authenticate': {
          templateUrl: 'templates/login_temp_username.html',
          controller: 'HomeController',
        }
      }
    })
    .state('app.login_devise_user', {
      url: '/login_devise/',
      views: {
        'authenticate': {
          templateUrl: 'templates/login_devise_user.html',
          controller: 'HomeController',
        }
      }
    })
    .state('app.login_facebook', {
      url: '/login_facebook/',
      views: {
        'authenticate': {
          templateUrl: 'templates/login_facebook.html',
          controller: 'HomeController',
        }
      }
    })
  }
]);
