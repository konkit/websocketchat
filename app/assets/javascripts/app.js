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
      templateUrl: 'templates/login_temp_username.html',
      controller: 'LoginTempUsernameController',
    })
    .state('app.login_devise_user', {
      url: '/login_devise/',
      templateUrl: 'templates/login_devise_user.html',
      controller: 'LoginDeviseController',
    })
    .state('app.login_devise_register_user', {
      url: '/login_devise_register/',
      templateUrl: 'templates/login_devise_register_user.html',
      controller: 'LoginDeviseRegisterController',
    })
    .state('app.login_facebook', {
      url: '/login_facebook/',
      templateUrl: 'templates/login_facebook.html',
      controller: 'HomeController',
    })
    .state('app.chat', {
      url: '/chat/',
      templateUrl: 'templates/chat_window.html',
      controller: 'ChatController',
    })
  }
]);
