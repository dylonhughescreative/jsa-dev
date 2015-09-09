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
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //cordova.plugins.Keyboard.disableScroll(true);
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
        .state('home', {
            url: '/home',
            templateUrl: 'templates/Home.html',
            controller: 'HomeCtrl'
        })
        .state('formWizard', {
            url: '/formWizard',
            controller: 'FormWizardCtrl',
            templateUrl: './FormWizard/FormWizard.html'
        })
        .state('formWizard.GCorSub', {
            url: '/GCorSub',
            templateUrl: './FormWizard/GCorSub/GCorSub.html',
            controller: 'GCorSub'
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
        .state('overview', {
            url: '/overview',
            templateUrl: 'templates/Overview.html',
            controller: 'OverviewCtrl'
        })
        .state('verify', {
            url: '/verify',
            templateUrl: 'templates/Verify.html',
            controller: 'VerifyCtrl'
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
    $urlRouterProvider.otherwise('/formWizard/GCorSub');
});

app.controller('FormWizardCtrl', function ($scope, $state) {
    'use strict';
    $scope.next = function (state) {
        $state.go(state);
    };
});

app.factory('formInfo', function () {
    'use strict';
    var gcinfo = { },
        subinfo = {},
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
        taskinfo = {},
        defaultPPE = {
            cb_RespiratorType: 'N/A',
            cb_GlovesType: 'N/A',
            cb_Clothing: 'N/A',
            cb_ChemClothing: 'N/A',
            tb_Other: ''
        },
        completedElements = {
            BasicInfo: "pending",
            PPEAssess: "pending",
            TaskStep1: "pending",
            TaskStep2: "pending",
            TaskStep3: "pending",
            TaskStep4: "pending"
        },
        formComplete = false;
    
    return {
        getppeinfo: function () {
            return ppeinfo;
        },
        setppeinfo: function (tempPPEinfo) {
            ppeinfo = angular.copy(tempPPEinfo);
        },
        getgcinfo: function () {
            return gcinfo;
        },
        setgcinfo: function (tempGCinfo) {
            gcinfo = angular.copy(tempGCinfo);
        },
        getcompletedElements: function () {
            return completedElements;
        },
        setGCinfocomplete: function (complete) {
            completedElements.BasicInfo = complete;
        },
        setSubinfocomplete: function (complete) {
            completedElements.BasicInfo = complete;
        },
        setPPEcomplete: function (complete) {
            completedElements.PPEAssess = complete;
        },
        setTask1complete: function (complete) {
            completedElements.TaskStep1 = complete;
        },
        setTask2complete: function (complete) {
            completedElements.TaskStep2 = complete;
        },
        setTask3complete: function (complete) {
            completedElements.TaskStep3 = complete;
        },
        setTask4complete: function (complete) {
            completedElements.TaskStep4 = complete;
        },
        getformcomplete: function (complete) {
            formcomplete = complete;
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
    
    $scope.back = function () {
        var so = cordova.plugins.screenorientation;
        so.setOrientation('unlocked');
        $state.go('portrait');
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
    
    $scope.uploadFile = function () {
        jsPdfBuilder.createPdf();
        var url = "http://dylonhughes.com/uploads/upload.php",
         //target path may be local or url
         filename = "JSA_Form.pdf",
         targetPath = cordova.file.documentsDirectory.concat(filename);
        //var filename = targetPath.split("/").pop();
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "text/plain"
        };
        $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            alert("success" + targetPath);
            alert(JSON.stringify(result.response));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
            alert(JSON.stringify(err));
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