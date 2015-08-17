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
app.config(function($stateProvider, $urlRouterProvider) {

 // Ionic uses AngularUI Router which uses the concept of states
 // Learn more here: https://github.com/angular-ui/ui-router
 // Set up the various states which the app can be in.
 // Each state's controller can be found in controllers.js
 $stateProvider

 // Each tab has its own nav history stack:
.state('entry', {
      url: '/formentry',
      views: {
          landscape: {
              templateUrl: 'landscape.html',
          },
          portrait: {
              templateUrl: 'portrait.html',
          }
      }
   })

 // if none of the above states are matched, use this as the fallback
 $urlRouterProvider.otherwise('/formentry');
});

app.directive("breakpoint", function () {
    return function (scope, element, attrs, ctrl) {
        var breakpoint = attrs.breakpoint;
        var mql = window.matchMedia( breakpoint );
        var mqlHandler = function (mql) {
            scope.matches = mql.matches;
            console.log = "Function Called!";
            if(!scope.$$phase) { //prevents it from unnecessarily calling $scope.$apply when the page first runs
                scope.$apply();
            }
        };
        mql.addListener(mqlHandler);
        mqlHandler(mql);
    };
});

app.controller('ModalCtrl',function($scope, $ionicModal, $state) {
  $scope.blank = {}
  $scope.basicinfo = {}
  $scope.ppeinfo = {}
  $scope.user = {}
  $scope.elements = {
      cb_RespiratorType: 'N/A',
      cb_GlovesType: 'N/A',
      cb_Clothing: 'N/A',
      cb_HearingProtection: 'N/A',
      cb_ChemClothing: 'N/A',
      cm_RespiratorType: false,
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
      if(form == "PPE")
      {
          if($scope.elements.cb_RespiratorType != "N/A") 
              $scope.elements.cm_RespiratorType = true;
          else
              $scope.elements.cm_RespiratorType = false;
          
          if($scope.elements.cb_GlovesType != "N/A") 
              $scope.elements.cm_GlovesType = true;
          else
              $scope.elements.cm_GlovesType = false;
          
          if($scope.elements.cb_Clothing != "N/A") 
              $scope.elements.cm_Clothing = true;
          else
              $scope.elements.cm_Clothing = false;
          
          if($scope.elements.cb_HearingProtection != "N/A") 
              $scope.elements.cm_HearingProtection = true;
          else
              $scope.elements.cm_HearingProtection = false;
          
          if($scope.elements.cb_ChemClothing != "N/A") 
              $scope.elements.cm_ChemClothing = true;
          else
              $scope.elements.cm_ChemClothing = false;
          
          if($scope.elements.tb_Other != "N/A") 
              $scope.elements.cm_Other = true;
          else
              $scope.elements.cm_Other = false;
          $scope.ppeinfo = angular.copy($scope.elements);
      }
      
      //update the master form with the modal elements
      else if (form == "BasicInfo")
      {
          $scope.basicinfo = angular.copy($scope.user);
      }
      $scope.closeModal(form);
  };
    
  $scope.reset = function() {
      $scope.basicinfo = angular.copy($scope.blank);
      $scope.user = angular.copy($scope.blank);
      $scope.ppeinfo = angular.copy($scope.blank);
  };
});