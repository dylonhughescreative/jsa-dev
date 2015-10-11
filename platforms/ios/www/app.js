// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var angular;
var app = angular.module('starter', ['ionic', 'ngCordova']);

app.run(function ($ionicPlatform, $state, $window) {
    'use strict';
    // Can place $ionicPlatform events here but plugins may not be ready.
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
                    controller: 'HomeCtrl as homeState'
                }
            }
        })
        .state('formWizard', {
            url: '/formWizard',
            views: {
                'sideMenu': {
                    controller: 'FormWizardCtrl as formparentState',
                    templateUrl: './FormWizard/FormWizard_SideMenu.html'
                },
                'menuContent': {
                    controller: 'FormWizardCtrl as formparentState',
                    templateUrl: './FormWizard/FormWizard.html'
                }
            } 
        })
        .state('formWizard.GCorSub', {
            url: '/GCorSub',
            templateUrl: './FormWizard/GCorSub/GCorSub.html',
            controller: 'GCorSub as gcorsubSelect',
        })
        .state('formWizard.GCinfo', {
            url: '/GCinfo',
            templateUrl: './FormWizard/GCInfo/GCinfo.html',
            controller: 'GCinfoCtrl as gcinfoState'
        })
        .state('formWizard.Subinfo', {
            url: '/Subinfo',
            templateUrl: './FormWizard/SubInfo/Subinfo.html',
            controller: 'SubinfoCtrl as subinfoState'
        })
        .state('formWizard.PPE', {
            url: '/PPE',
            templateUrl: './FormWizard/PPE/PPE.html',
            controller: 'PPECtrl as ppeState'
        })
        .state('formWizard.JobElements', {
            url: '/JobElements',
            templateUrl: './FormWizard/JobElements/JobElements.html',
            controller: 'JobElementCtrl as jobElementsState'
        })
        .state('formWizard.TrainReq', {
            url: '/TrainReq',
            templateUrl: './FormWizard/TrainingReq/TrainingReq.html',
            controller: 'TrainReqCtrl as trainReqState'
        })
        .state('formWizard.LicReq', {
            url: '/LicReq',
            templateUrl: './FormWizard/LicenseReq/LicenseReq.html',
            controller: 'LicReqCtrl as licReqState'
        })
        .state('formWizard.AreaConcerns', {
            url: '/AreaConcerns',
            templateUrl: './FormWizard/AreaConcerns/AreaConcerns.html',
            controller: 'AreaConcernsCtrl as areaConcernsState'
        })
        .state('formWizard.AddTraining', {
            url: '/AddTraining',
            templateUrl: './FormWizard/AddTraining/AddTraining.html',
            controller: 'AddTrainingCtrl as addTrainState'
        })
        .state('overview', {
            url: '/overview',
            views: {
                'sideMenu': {
                    controller: 'FormWizardCtrl',
                    templateUrl: './FormWizard/FormWizard_SideMenu.html'
                },
                'menuContent': {
                    templateUrl: './FormWizard/Overview.html',
                    controller: 'OverviewCtrl as overviewState'
                }
            }
        })
        .state('verify', {
            url: '/verify',
            views: {
                'sideMenu': {
                    controller: 'VerifyCtrl as verifyState',
                    templateUrl: './FormWizard/Verify_SideMenu.html'
                },
                'menuContent': {
                    templateUrl: './FormWizard/Verify.html',
                    controller: 'VerifyCtrl as verifyState'
                }
            }
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

app.service('formInfo', function () {
    var formInfo = this;
    formInfo.formName = "",
    formInfo.basicinfo = {
        gcorsub: ""
    },
    formInfo.jobelements = [],
    formInfo.ppeinfo = { },
    formInfo.trainReqs = {
        RedTag: false,
        ConfinedSpace: false,
        Scaffold: false,
        FireWatch: false,
        Flagger: false,
        AerialLift: false,
        DriverSafety: false,
        SWP: false,
        SOP: false,
        Rigger: false,
        ForkLift: false,
        cm_Other: false,
        tb_Other: ''
    },
    formInfo.licReqs = {
        ForkLift: false,
        AerialLift: false,
        cm_Crane: false,
        cb_Crane: 'N/A',
        cm_HeavyEquip: false,
        cb_HeavyEquip: 'N/A',
        cm_Other: true,
        tb_Other: ''
    },
    formInfo.areaConcerns = {
        lineofFire: [],
        sensEquip: [],
        fallHazards: []
    },
    formInfo.addTraining = {
        AddTraining: [],     
        None: false
    },
    formInfo.signatures = [],
    formInfo.completedElements = {
        BasicInfo: "pending",
        PPEAssess: "pending",
        JobElements: "pending",
        TrainReqs: "pending",
        LicReqs:   "pending",
        AreaConcerns: "pending",
        AddTraining: "pending"
    },
    formInfo.formComplete = false,
    formInfo.locked = false,
    formInfo.stateController = {
            nextstate: "",
            previousstate: ""
        };
});

app.service('savedForms', function () {
    var savedForms = this;
    savedForms.recentForms = [];
});