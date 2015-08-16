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

app.controller('ModalCtrl',function($scope, $ionicModal) {
  $scope.master = {
  }
  $scope.elements = {
  }
    
  $ionicModal.fromTemplateUrl('./templates/PPEModal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    backdropClickToClose: true,
  }).then(function(modal) {
    $scope.PPEmodal = modal;
  });
    
  $ionicModal.fromTemplateUrl('./templates/BasicInfoModal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    backdropClickToClose: true,
  }).then(function(modal) {
    $scope.BasicInfomodal = modal;
  });
    
  $ionicModal.fromTemplateUrl('./templates/Task1Modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    backdropClickToClose: true,
  }).then(function(modal) {
    $scope.Task1modal = modal;
  });       
    
  $scope.openModal = function(form) {
    if(form == "PPE") $scope.PPEmodal.show();
    else if(form == "BasicInfo") $scope.BasicInfomodal.show();
    else if(form == "Task1") $scope.Task1modal.show();
  };
  $scope.closeModal = function(form) {
    if(form == "PPE") $scope.PPEmodal.hide();
    else if(form == "BasicInfo") $scope.BasicInfomodal.hide();
    else if(form == "Task1") $scope.Task1modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.PPEmodal.remove();
    $scope.BasicInfomodal.remove();
    $scope.Task1modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
    
  //--------------Custom Modal Methods-----------------//
  $scope.submitModal = function(form){
      //update the master form with the modal elements
      $scope.master = $scope.elements;
      $scope.closeModal(form)
  };
});

//app.controller('