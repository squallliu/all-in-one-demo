// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'whcyit-immerse', 'whcyit-open-window', 'whcyit-filter-bar',
  'jett.ionic.scroll.sista', 'ion-alpha-scroll', 'starter.controllers'
]).run(function ($ionicPlatform, $document) {
  document.addEventListener('chcp_updateLoadFailed', function (eventData) {
    var error = eventData.detail.error;
    if (error && error.code == chcp.error.APPLICATION_BUILD_VERSION_TOO_LOW) {
      alert('程序版本太低，请更新到最新版本');
    }
  }, false);

  document.addEventListener('chcp_updateInstalled', function (eventData) {
    alert('程序已更新完成，重启后生效');
  }, false);

  $ionicPlatform.ready(function () {
    if (ionic.Platform.isAndroid()) {
      ionic.Platform.isFullScreen = true;
    }

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  }).state('search-demo-remote', {
    url: '/search-demo-remote',
    templateUrl: 'templates/remote-search.html',
    controller: 'RemoteSearchCtrl'
  }).state('search-demo-local', {
    url: '/search-demo-local',
    templateUrl: 'templates/local-search.html',
    controller: 'LocalSearchCtrl'
  }).state('auto-hide-navbar', {
    url: '/auto-hide-navbar',
    templateUrl: 'templates/ionic-scroll-sista.html',
    controller: 'AutoHideNavbarCtrl'
  }).state('ion-alpha-scroll', {
    url: '/ion-alpha-scroll',
    templateUrl: 'templates/ion-alpha-scroll.html',
    controller: 'IonAlphaScrollCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});
