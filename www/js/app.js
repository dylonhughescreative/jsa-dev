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
    
    //function onScreenSizeChange() {
    //    if ($window.innerWidth > $window.innerHeight) {
    //        $state.go('landscape');
    //        //$scope.$apply();
    //    } else {
    //        $state.go('portrait');
    //        //$scope.$apply();
    //    }
    //}
    //angular.element($window).bind('resize', onScreenSizeChange);
    //angular.element($window).bind('load', onScreenSizeChange);
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

app.controller('ModalCtrl', function ($scope, $ionicModal, $state, $window, $ionicPopup) {
    'use strict';
    var blank = {};
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
    var elementsBlank = {
        cb_RespiratorType: 'N/A',
        cb_GlovesType: 'N/A',
        cb_Clothing: 'N/A',
        cb_ChemClothing: 'N/A',
        tb_Other: ''
    };
    $scope.completedElements = {
        BasicInfo: "pending",
        PPEAssess: "pending",
        TaskStep1: "pending",
        TaskStep2: "pending",
        TaskStep3: "pending",
        TaskStep4: "pending"
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
        } else if (form === "BasicInfo") {
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
        if (angular.isUndefined($scope.user.projectname) || $scope.user.projectname === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.user.basicinfodate) || $scope.user.basicinfodate === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.user.subcontractor) || $scope.user.subcontractor === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.user.generalcontractor) || $scope.user.generalcontractor === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.user.crewleader) || $scope.user.crewleader === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.user.sitesuperintendent) || $scope.user.sitesuperintendent === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.user.jobscope) || $scope.user.jobscope === "") {
            return "invalid";
        } else {
            return "valid";
        }
    }
    
    function verifyPPE() {
        if ($scope.elements.cm_EyeProtection === true) {
            return "valid";
        } else if ($scope.elements.cm_ChemGoggles === true) {
            return "valid";
        } else if ($scope.elements.cm_ChemGoggles === true) {
            return "valid";
        } else if ($scope.elements.cm_HardHat === true) {
            return "valid";
        } else if ($scope.elements.cb_RespiratorType !== "N/A") {
            return "valid";
        } else if ($scope.elements.cb_GlovesType !== "N/A") {
            return "valid";
        } else if ($scope.elements.cb_Clothing !== "N/A") {
            return "valid";
        } else if ($scope.elements.cm_ProtectiveToe === true) {
            return "valid";
        } else if ($scope.elements.cm_HearingProtection === true) {
            return "valid";
        } else if ($scope.elements.cm_HarnessLanyard === true) {
            return "valid";
        } else if ($scope.elements.cm_FaceShield === true) {
            return "valid";
        } else if ($scope.elements.tb_Other !== "") {
            return "valid";
        } else {
            return "invalid";
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
        
        if ($scope.completedElements.BasicInfo === "valid" &&
                $scope.completedElements.PPEAssess === "valid") {
            $scope.submitComplete = true;
        }
        else {
            $scope.submitComplete = false;
        }
        $scope.closeModal(form);
    };
    
    $scope.reset = function (form) {
        if (form === "BasicInfo") {
            $scope.user = angular.copy(blank);
        } else if (form === "PPE") {
            $scope.elements = angular.copy(elementsBlank);
        }
    };
    
    $scope.back = function () {
        var so = cordova.plugins.screenorientation;
        so.setOrientation('unlocked');
        $state.go('portrait');
    }
    
    $scope.verify = function () {
        var so = cordova.plugins.screenorientation;
        so.setOrientation('landscape');
        $state.go('landscape');
    }
    
    $scope.cancelModal = function(form) {
        if (form === "BasicInfo") {
            $scope.user = angular.copy($scope.basicinfo);
        } else if (form === "PPE") {
            $scope.elements = angular.copy($scope.ppeinfo);
        }
        $scope.closeModal(form);
    }
    
    $scope.sign = function(sign) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm Signature',
            template: 'Are you sure you want to sign the form? Continuing will reset the app.'
        });
        confirmPopup.then(function(res) {
            if(res) {
                console.log('You are sure');
                $window.location.href = "#/portrait";
                $window.location.reload();
            } else {
                console.log('You are not sure');
            }
        });
    }
    
    $scope.notimplementedPopup = function() {
        var confirmPopup = $ionicPopup.alert({
            title: 'Function Not Implemented',
            template: 'This function is still in development and will be implemented later.'
        });
    }
    
    function refresh() {
        $scope.scrollheight = (1 - (64 / $window.innerHeight)) * 100;
        $scope.ppeinfo = angular.copy($scope.elements);
        $scope.basicinfo = angular.copy($scope.user);
        //$scope.$apply();
    }
    angular.element($window).bind('resize', refresh);
});