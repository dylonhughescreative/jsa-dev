// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var angular;
var app = angular.module('starter', ['ionic', 'ngCordova']);

app.run(function ($ionicPlatform, $state, $window) {
    'use strict';
    var cordova, StatusBar;
    $ionicPlatform.ready(function () {
        // We do this now in GC or Sub because of a plugins exception I was getting 10/4/15
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        //if (window.cordova && window.cordova.plugins.Keyboard) {
        //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        //    cordova.plugins.Keyboard.disableScroll(true);
        //}
        //if (window.StatusBar) {
        //    StatusBar.hide();
        //}
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

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    'use strict';
    
    $ionicConfigProvider.scrolling.jsScrolling(true);
    $ionicConfigProvider.views.swipeBackEnabled(false);
    
    $stateProvider
        .state('home', {
            url: '/home',
            views: {
                'sideMenu': {
                    //templateUrl: 'templates/sidemenu.html',
                },
                'menuContent': {
                    templateUrl: './LandingPage/LandingPage.html',
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('formWizard', {
            url: '/formWizard',
            views: {
                'sideMenu': {
                    controller: 'FormWizardCtrl',
                    templateUrl: './FormWizard/FormWizard_SideMenu.html'
                },
                'menuContent': {
                    controller: 'FormWizardCtrl',
                    templateUrl: './FormWizard/FormWizard.html'
                }
            } 
        })
        .state('formWizard.GCorSub', {
            url: '/GCorSub',
            templateUrl: './FormWizard/GCorSub/GCorSub.html',
            controller: 'GCorSub',
        })
        .state('formWizard.GCinfo', {
            url: '/GCinfo',
            templateUrl: './FormWizard/GCInfo/GCinfo.html',
            controller: 'GCinfoCtrl'
        })
        .state('formWizard.Subinfo', {
            url: '/Subinfo',
            templateUrl: './FormWizard/SubInfo/Subinfo.html',
            controller: 'SubinfoCtrl'
        })
        .state('formWizard.PPE', {
            url: '/PPE',
            templateUrl: './FormWizard/PPE/PPE.html',
            controller: 'PPECtrl'
        })
        .state('formWizard.JobElements', {
            url: '/JobElements',
            templateUrl: './FormWizard/JobElements/JobElements.html',
            controller: 'JobElementCtrl'
        })
        .state('formWizard.TrainReq', {
            url: '/TrainReq',
            templateUrl: './FormWizard/TrainingReq/TrainingReq.html',
            controller: 'TrainReqCtrl'
        })
        .state('formWizard.LicReq', {
            url: '/LicReq',
            templateUrl: './FormWizard/LicenseReq/LicenseReq.html',
            controller: 'LicReqCtrl'
        })
        .state('formWizard.AreaConcerns', {
            url: '/AreaConcerns',
            templateUrl: './FormWizard/AreaConcerns/AreaConcerns.html',
            controller: 'AreaConcernsCtrl'
        })
        .state('formWizard.AddTraining', {
            url: '/AddTraining',
            templateUrl: './FormWizard/AddTraining/AddTraining.html',
            controller: 'AddTrainingCtrl'
        })
        .state('overview', {
            url: '/overview',
            templateUrl: './FormWizard/Overview.html',
            controller: 'OverviewCtrl'
        })
        .state('verify', {
            url: '/verify',
            templateUrl: './FormWizard/Verify.html',
            controller: 'VerifyCtrl'
        })
        .state('completedForm', {
            url: '/completedForm',
            templateUrl: './CompletedForms/CompletedForms.html',
            controller: 'CompletedFormsCtrl'
        })
        .state('submitForm', {
            url: '/submitForm',
            templateUrl: 'SubmitForm.html',
            controller: 'SubmitFormCtrl'
        })
        .state('signatureList', {
            url: '/signatureList',
            templateUrl: './CompletedForms/SignatureList.html',
            controller: 'SignatureListCtrl',
            cache: false
        })
        .state('signature', {
            url: '/sign',
            templateUrl: './FormWizard/Signature.html',
            controller: 'SigCtrl'
        })
        .state('portrait', {
            url: '/portrait',
            templateUrl: 'templates/Portrait.html'
        })
        .state('landscape', {
            url: '/landscape',
            templateUrl: 'templates/Landscape.html'
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('home');
});

app.factory('formInfo', function () {
    'use strict';
    var basicinfo = {
            gcorsub: ""
        },
        jobelements = [],
        ppeinfo = {
            cm_EyeProtection: false,
            cm_ChemGoggles: false,
            cm_HardHat: false,
            cb_RespiratorType: 'N/A',
            cb_GlovesType: 'N/A',
            cb_Clothing: 'N/A',
            cm_ProtectiveToe: false,
            cm_HearingProtection: false,
            cb_ChemClothing: 'N/A',
            cm_HarnessLanyard: false,
            cm_FaceShield: false,
            tb_Other: ''
        },
        trainReqs = {
            RedTag: false,
            ConfinedSpace: false,
            Scaffold: false,
            FireWatch: false,
            Flagger: false,
            AerialLift: false,
            DriverSafety: false,
            SWP: false,
            SPO: false,
            Rigger: false,
            ForkLift: false,
            cm_Other: false,
            tb_Other: ''
        },
        licReqs = {
            ForkLift: false,
            AerialLift: false,
            cm_Crane: false,
            cb_Crane: 'N/A',
            cm_HeavyEquip: false,
            cb_HeavyEquip: 'N/A',
            cm_Other: true,
            tb_Other: ''
        },
        areaConcerns = {},
        addTraining = {
            AddTraining: [],     
            None: false
        },
        signatures = [],
        completedElements = {
            BasicInfo: "pending",
            PPEAssess: "pending",
            JobElements: "pending",
            TrainReqs: "pending",
            LicReqs:   "pending",
            AreaConcerns: "pending",
            AddTraining: "pending"
        },
        formComplete = false,
        stateController = {
            nextstate: "",
            previousstate: ""
        };
    
    return {
        getBasicInfo: function () {
            return basicinfo;
        },
        setBasicInfo: function (tempbasicinfo) {
            basicinfo = angular.copy(tempbasicinfo);
        },
        getppeinfo: function () {
            return ppeinfo;
        },
        setppeinfo: function (tempPPEinfo) {
            ppeinfo = angular.copy(tempPPEinfo);
        },
        getjobelements: function () {
            return jobelements;
        },
        setjobelements: function (groups) {
            jobelements = angular.copy(groups);
        },
        setjobelementsComplete: function (complete) {
            completedElements.JobElements = complete;
        },
        getcompletedElements: function () {
            return completedElements;
        },
        setBasicInfocomplete: function (complete) {
            completedElements.BasicInfo = complete;
        },
        setPPEcomplete: function (complete) {
            completedElements.PPEAssess = complete;
        },
        getTrainReqs: function () {
            return trainReqs;
        },
        setTrainReqs: function (tempTrainReqs) {
            trainReqs = angular.copy(tempTrainReqs);
        },
        setTrainReqsComplete: function (complete) {
            completedElements.TrainReqs = complete;
        },
        getLicReqs: function () {
            return licReqs;
        },
        setLicReqs: function (tempLicReqs) {
            licReqs = angular.copy(tempLicReqs);
        },
        setLicReqsComplete: function (complete) {
            completedElements.LicReqs = complete;
        },
        getAreaConcerns: function () {
            return areaConcerns;
        },
        setAreaConcerns: function (tempAreaConcerns) {
            areaConcerns = angular.copy(tempAreaConcerns);
        },
        setAreaConcernsComplete: function (complete) {
            completedElements.AreaConcerns = complete;
        },
        getAddTraining: function () {
            return addTraining;
        },
        setAddTraining: function (tempAddTraining) {
            addTraining = angular.copy(tempAddTraining);
        },
        setAddTrainingComplete: function (complete) {
            completedElements.AddTraining = complete;
        },
        getformcomplete: function (complete) {
            formComplete = complete;
        },
        getSignatures: function () {
            return signatures;
        },
        setSignatures: function (tempSignatures) {
            signatures = angular.copy(tempSignatures);
        },
        getStateController: function () {
            return stateController;
        },
        setStateController: function (tempStateController) {
            stateController = angular.copy(tempStateController);
        }
    };
});

app.controller('SubinfoCtrl', function ($scope, formInfo) { 'use strict'; });
app.controller('TaskCtrl', function ($scope, formInfo) { 'use strict'; });

app.controller('ModalCtrl', function ($scope, $ionicModal, $state, $window, $ionicPopup, jsPdfBuilder, $cordovaFileTransfer, $cordovaFile) {
    'use strict';
    //--------------Custom Modal Methods-----------------//
    $scope.reset = function (form) {
        if (form === "BasicInfo") {
            $scope.user = angular.copy(blank);
        } else if (form === "PPE") {
            $scope.elements = angular.copy(elementsBlank);
        }
    };
    
    $scope.cancelModal = function (form) {
        if (form === "BasicInfo") {
            $scope.user = angular.copy($scope.basicinfo);
        } else if (form === "PPE") {
            $scope.elements = angular.copy($scope.ppeinfo);
        }
        $scope.closeModal(form);
    };
    
    $scope.sign = function (sign) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm Signature',
            template: 'Are you sure you want to sign the form? Continuing will reset the app.'
        });
        confirmPopup.then(function (res) {
            if (res) {
                console.log('You are sure');
                $window.location.href = "#/portrait";
                $window.location.reload();
            } else {
                console.log('You are not sure');
            }
        });
    };
    
    $scope.notimplementedPopup = function () {
        //pdfBuilder.createPdf();
        jsPdfBuilder.createPdf();
        
        var confirmPopup = $ionicPopup.alert({
            title: 'Function Not Implemented',
            template: 'This function is still in development and will be implemented later.'
        });
    };
    
    function refresh() {
        $scope.scrollheight = (1 - (64 / $window.innerHeight)) * 100;
        $scope.ppeinfo = angular.copy($scope.elements);
        $scope.basicinfo = angular.copy($scope.user);
        //$scope.$apply();
    }
    angular.element($window).bind('resize', refresh);
});