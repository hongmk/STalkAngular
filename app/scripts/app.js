'use strict';

/**
 * @ngdoc overview
 * @name angularJsexamApp
 * @description
 * # angularJsexamApp
 *
 * Main module of the application.
 */

//개인프로젝트를 위한 추가

angular
  .module('angularJsexamApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $routeProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('main', {
        url:'/',
        templateUrl:'views/main.html',
        controller:'MainCtrl'
      })
      .state('contents-list',{
        url:'/contents/list',
        templateUrl:'views/contents-list.html',
        controller:'ContentsListCtrl'
      })
      .state('contents-content',{
        url:'/contents/content',
        templateUrl:'views/contents-content.html',
        controller:'ContentsContentCtrl',
        params:{
          row_id:null
        }
      });
    /*$routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });*/
  });