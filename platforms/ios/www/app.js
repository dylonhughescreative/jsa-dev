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
    //$ionicConfigProvider.views.transition('none');
    
    $stateProvider
        .state('home', {
            url: '/home',
            views: {
                'sideMenu': {
                    templateUrl: './LandingPage/LandingPage_SideMenu.html'
                },
                'menuContent': {
                    templateUrl: './LandingPage/LandingPage.html',
                    controller: 'HomeCtrl as homeState'
                }
            }
        })
        .state('savedForms', {
            url: '/savedForms',
            views: {
                'sideMenu': {
                },
                'menuContent': {
                    templateUrl: './SavedForms/SavedForms.html',
                    controller: 'SavedFormsCtrl as savedFormsJs'
                }
            }
        })
        .state('outbox', {
            url: '/outbox',
            views: {
                'sideMenu': {
                },
                'menuContent': {
                    templateUrl: './Outbox/Outbox.html',
                    controller: 'OutboxCtrl as OutboxJs'
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
    formInfo.ppeinfo = {
        None: false,
        cm_EyeProtection: false,
        cm_ChemGoggles: false,
        cm_HardHat: false,
        cb_RespiratorType: 'N/A',
        cm_RespiratorType: false,
        cb_GlovesType: 'N/A',
        cm_GlovesType: false,
        cb_Clothing: 'N/A',
        cm_Clothing: false,
        cm_ProtectiveToe: false,
        cm_HearingProtection: false,
        cb_ChemClothing: 'N/A',
        cm_ChemClothing: false,
        cm_HarnessLanyard: false,
        cm_FaceShield: false,
        tb_Other: '',
        cm_Other: false
    },
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
    formInfo.NextButtonText = "Certify",
    formInfo.stateController = {
            nextstate: "",
            previousstate: ""
        };
    
    this.setFormInfo = function (data) {
        formInfo.basicinfo = data.basicinfo;
        formInfo.basicinfo.startdate = null;
        formInfo.basicinfo.enddate = null;
        formInfo.jobelements = data.jobelements;
        formInfo.ppeinfo = data.ppeinfo;
        formInfo.trainReqs = data.trainReqs;
        formInfo.licReqs = data.licReqs;
        formInfo.areaConcerns = data.areaConcerns;
        formInfo.addTraining = {
            AddTraining: [],
            None: false
        }
        formInfo.signatures = [];
        formInfo.completedElements = data.completedElements;
        formInfo.formComplete = data.formComplete;
        formInfo.locked = false;
        formInfo.NextButtonText = data.NextButtonText;
        formInfo.stateController = data.stateController;
    }
});

app.service('savedForms', function () {
    var savedForms = this;
    savedForms.formNames = [];
    savedForms.forms = [];
});

app.service('outbox', function () {
    var outbox = this;
    outbox.filenames = [];
    
    this.setOutbox = function (data) {
        outbox.filenames = data.filenames;
    }
});

app.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '[]');
    },
    removeObject: function(key) {
      return $window.localStorage.removeItem(key);
    }
  }
}]);