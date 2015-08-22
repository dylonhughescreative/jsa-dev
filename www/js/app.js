// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var angular;
var app = angular.module('starter', ['ionic']);

app.run(function ($ionicPlatform, $state, $window) {
    'use strict';
    var cordova, StatusBar;
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.hide();
        }
    });
    
    function onScreenSizeChange() {
        if ($window.innerWidth > $window.innerHeight) {
            $state.go('landscape');
            $scope.$apply();
        } else {
            $state.go('portrait');
            $scope.$apply();
        }
    }
    angular.element($window).bind('resize', onScreenSizeChange);
    angular.element($window).bind('load', onScreenSizeChange);
});

app.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    'use strict';
    $stateProvider
    
        //Each tab has its own nav history stack:
        .state('portrait', {
            url: '/portrait',
            templateUrl: 'templates/Portrait.html'
            //controller: 'ModalCtrl'
        })
        .state('landscape', {
            url: '/landscape',
            templateUrl: 'templates/Landscape.html'
            //controller: 'ModalCtrl'
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/portrait');
});

app.controller('ModalCtrl', function ($scope, $ionicModal, $state, $window) {
    'use strict';
    $scope.blank = {};
    $scope.basicinfo = {};
    $scope.ppeinfo = {};
    $scope.user = {};
    $scope.elements = {
        cb_RespiratorType: 'N/A',
        cb_GlovesType: 'N/A',
        cb_Clothing: 'N/A',
        cb_ChemClothing: 'N/A',
        tb_Other: ''
    };
    $scope.completedElements = {
        BasicInfo: false,
        PPEAssess: false,
        TaskStep1: false,
        TaskStep2: false,
        TaskStep3: false,
        TaskStep4: false
    };
    $scope.submitComplete = false;
    
    $ionicModal.fromTemplateUrl('./templates/PPEModal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        backdropClickToClose: false
    }).then(function (modal) {
        $scope.PPEmodal = modal;
    });
    
    $ionicModal.fromTemplateUrl('./templates/BasicInfoModal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        backdropClickToClose: false
    }).then(function (modal) {
        $scope.BasicInfomodal = modal;
    });
    
    $ionicModal.fromTemplateUrl('./templates/Task1Modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        backdropClickToClose: false
    }).then(function (modal) {
        $scope.Task1modal = modal;
    });
    $scope.openModal = function (form) {
        if (form === "PPE") {
            $scope.PPEmodal.show();
            var so = cordova.plugins.screenorientation;
            so.setOrientation(so.Orientation.landscape);
        } else if (form === "BasicInfo") {
            var so = cordova.plugins.screenorientation;
            so.setOrientation(so.Orientation.LANDSCAPE);
            $scope.BasicInfomodal.show();
        } else if (form === "Task1") {
            $scope.Task1modal.show();
        }
    };
    $scope.closeModal = function (form) {
        if (form === "PPE") {
            $scope.PPEmodal.hide();
        } else if (form === "BasicInfo") {
            $scope.BasicInfomodal.hide();
        } else if (form === "Task1") {
            $scope.Task1modal.hide();
        }
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.PPEmodal.remove();
        $scope.BasicInfomodal.remove();
        $scope.Task1modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      // Execute action
    });
    
    //--------------Custom Modal Methods-----------------//
    
    var fontStyle, scrollheight;
    function verifyBasicInfo() {
        if ($scope.user.projectname === "") {
            return false;
        } else if (angular.isUndefined($scope.user.basicinfodate)) {
            return false;
        } else if ($scope.user.subcontractor === "") {
            return false;
        } else if ($scope.user.generalcontractor === "") {
            return false;
        } else if ($scope.user.crewleader === "") {
            return false;
        } else if ($scope.user.sitesuperintendent === "") {
            return false;
        } else if ($scope.user.jobscop === "") {
            return false;
        } else {
            return true;
        }
    }
    
    function verifyPPE() {
        if ($scope.elements.cm_EyeProtection === true) {
            return true;
        } else if ($scope.elements.cm_ChemGoggles === true) {
            return true;
        } else if ($scope.elements.cm_ChemGoggles === true) {
            return true;
        } else if ($scope.elements.cm_HardHat === true) {
            return true;
        } else if ($scope.elements.cb_RespiratorType !== "N/A") {
            return true;
        } else if ($scope.elements.cb_GlovesType !== "N/A") {
            return true;
        } else if ($scope.elements.cb_Clothing !== "N/A") {
            return true;
        } else if ($scope.elements.cm_ProtectiveToe === true) {
            return true;
        } else if ($scope.elements.cm_HearingProtection === true) {
            return true;
        } else if ($scope.elements.cm_HarnessLanyard === true) {
            return true;
        } else if ($scope.elements.cm_FaceShield === true) {
            return true;
        } else if ($scope.elements.tb_Other !== "") {
            return true;
        } else {
            return false;
        }
    }
    function formatPPE() {
        if ($scope.elements.cb_RespiratorType !== "N/A") {
            $scope.elements.cm_RespiratorType = true;
        } else {
            $scope.elements.cm_RespiratorType = false;
        }
        
        if ($scope.elements.cb_GlovesType !== "N/A") {
            $scope.elements.cm_GlovesType = true;
        } else {
            $scope.elements.cm_GlovesType = false;
        }
        
        if ($scope.elements.cb_Clothing !== "N/A") {
            $scope.elements.cm_Clothing = true;
        } else {
            $scope.elements.cm_Clothing = false;
        }
        
        if ($scope.elements.cb_ChemClothing !== "N/A") {
            $scope.elements.cm_ChemClothing = true;
        } else {
            $scope.elements.cm_ChemClothing = false;
        }
        
        if ($scope.elements.tb_Other !== "") {
            $scope.elements.cm_Other = true;
        } else {
            $scope.elements.cm_Other = false;
        }
        
        $scope.ppeinfo = angular.copy($scope.elements);
    }
    
    $scope.submitModal = function (form) {
        if (form === "PPE") {
            $scope.completedElements.PPEAssess = verifyPPE();
            formatPPE();
        } else if (form === "BasicInfo") {
            $scope.completedElements.BasicInfo = verifyBasicInfo();
            $scope.basicinfo = angular.copy($scope.user);
        }
        
        if ($scope.completedElements.BasicInfo &&
                $scope.completedElements.PPEAssess) {
            $scope.submitComplete = true;
        }
        $scope.closeModal(form);
    };
    
    $scope.reset = function () {
        $scope.basicinfo = angular.copy($scope.blank);
        $scope.user = angular.copy($scope.blank);
        $scope.ppeinfo = angular.copy($scope.blank);
    };
    
    function refresh() {
        $scope.scrollheight = (1 - (64 / $window.innerHeight)) * 100;
        $scope.ppeinfo = angular.copy($scope.elements);
        $scope.basicinfo = angular.copy($scope.user);
        //$scope.$apply();
    }
    angular.element($window).bind('resize', refresh);
});