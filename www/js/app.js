// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// basicinfo
// ppeassess
// ctrlmethod1
// ctrlmethod2
// ctrlmethod3
// ctrlmethod4
//
//app.config(function($stateProvider, $urlRouterProvider) {
//    $stateProvider
//        .state('basicinfo', {
//            url: "/basicinfo",
//            templateUrl: "BasicInfoModel.html",
//            controller:


app.controller('ModalCtrl', function($scope, $ionicModal) {
    $scope.blank = {};
    $scope.master = {};
    
    $ionicModal.fromTemplateUrl('./templates/BasicInfoModal.html', {
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: true
    }).then(function(modal) {
      $scope.modal = modal;
    });
    
    $scope.submitData = function(user) {
        $scope.master = angular.copy($scope.user);
    }
    
    $scope.reset = function() {
        $scope.master = angular.copy($scope.blank);
        $scope.user = angular.copy($scope.blank);
    }
    
    $scope.reset();
    
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
});