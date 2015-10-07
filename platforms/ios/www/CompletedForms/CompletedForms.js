app.controller('CompletedFormsCtrl', function ($rootScope, $scope, $state, $ionicActionSheet, $ionicModal, $window, $document, formInfo, jsPdfBuilder) {
    'use strict';
    
    $scope.basicinfo = angular.copy(formInfo.getBasicInfo());
    $scope.ppeinfo = angular.copy(formInfo.getppeinfo());
    $scope.jobelements = angular.copy(formInfo.getjobelements());
    $scope.trainReqs = angular.copy(formInfo.getTrainReqs());
    $scope.licReqs = angular.copy(formInfo.getLicReqs());
    $scope.areaConcerns = angular.copy(formInfo.getAreaConcerns());
    $scope.addTraining = angular.copy(formInfo.getAddTraining());
    $scope.signatures = angular.copy(formInfo.getSignatures());
    $scope.commitment = { };
    
    var signaturePad;
    
    $scope.signatures = angular.copy(formInfo.getSignatures());
    $scope.commitment = { };
    
    $ionicModal.fromTemplateUrl('./FormWizard/CompletedSigModal.html', {
        id: "1",
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.signatureModal = modal;
    });
    
    $ionicModal.fromTemplateUrl('./FormWizard/EmployeeAwarenessModal.html', {
        id: "2",
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.certificationModal = modal;
    });
    
    $scope.$on('$stateChangeStart', function(){
        $scope.signatureModal.remove();
        $scope.certificationModal.remove();
        $ionicModal.fromTemplateUrl('./FormWizard/CompletedSigModal.html', {
            id: "1",
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.signatureModal = modal;
        });
        
        $ionicModal.fromTemplateUrl('./FormWizard/EmployeeAwarenessModal.html', {
            id: "2",
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.certificationModal = modal;
        });
    });
    
    $scope.sigCanvas = {
        scroll: 'false',
        width: $window.innerWidth - $window.innerWidth*0.02,
        height: $window.innerHeight * 0.2
    };
    
    var stateController = angular.copy(formInfo.getStateController());
    var signaturePad;
    
    $scope.closeSignatureModal = function() {
        var sigImg = signaturePad.toDataURL("image/jpeg", 100);
        $scope.commitment.signature = sigImg;
        console.log(sigImg);
        $scope.signatureModal.hide();
        if (window.cordova) {
            var so = cordova.plugins.screenorientation;
            so.setOrientation('unlocked');
        }
        $scope.saveCanvas();
    }
    
    $scope.openCertModal = function() {
        $scope.certificationModal.show();
    }
    
    $scope.closeCertModal = function() {
        $scope.certificationModal.hide();
    }
    
    $scope.closeCertModalAndBack = function() {
        $scope.certificationModal.hide();
        if (window.cordova) {
            var so = cordova.plugins.screenorientation;
            so.setOrientation('landscape');
        }
        $state.go('verify');
    }
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.signatures = angular.copy(formInfo.getSignatures());
        stateController = angular.copy(formInfo.getStateController());
        $scope.commitment = { };
    });   
    
    $scope.clearCanvas = function () {
        signaturePad.clear();
    }
    
    $scope.openSignatureModal = function() {
        $scope.closeCertModal();
        if (window.cordova) { 
            var so = cordova.plugins.screenorientation;
            so.setOrientation('landscape');
        }
        $scope.signatureModal.show();
        var canvas = document.getElementById('completedSigCanvas');
        signaturePad = new SignaturePad(canvas, {
            backgroundColor: 'rgb(255,255,255)'
        });
        signaturePad.clear();
        var ModalDimensions = document.getElementById('CompletedSigModal');
        $scope.sigCanvas.width = ModalDimensions.offsetWidth - ModalDimensions.offsetWidth*0.02;
        $scope.sigCanvas.height =  ModalDimensions.offsetHeight * 0.5;
    }
    
    $scope.saveCanvas = function () {
        var sigImg = signaturePad.toDataURL("image/jpeg", 100);
        var sigImgPng = signaturePad.toDataURL("image/png", 100); 
        $scope.commitment.signature = sigImgPng;
        console.log(sigImg);
        $scope.signatures.push({
            name: $scope.commitment.name,
            date: $scope.commitment.date,
            signature: $scope.commitment.signature    
        });
        formInfo.setSignatures($scope.signatures);
        if (window.cordova) {
            var so = cordova.plugins.screenorientation;
            so.setOrientation('landscape');
        }
        $scope.commitment = {};
        //$state.go(stateController.nextstate);
    }
    
    $scope.back = function () {
        if (window.cordova) {
            var so = cordova.plugins.screenorientation;
            so.setOrientation('landscape');
        }
        $state.go('verify');
    };
    
    function refresh() {
        var ModalDimensions = document.getElementById('CompletedSigModal');
        if (ModalDimensions != null) {
            $scope.sigCanvas.width = ModalDimensions.offsetWidth - ModalDimensions.offsetWidth*0.02;
            $scope.sigCanvas.height =  ModalDimensions.offsetHeight * 0.5;
            $scope.$apply();
        }
    }
    angular.element($window).bind('resize', refresh);
    
    $scope.ShowActionSheet = function() {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                {text: '<b>Submit</b>'},
                {text: 'Add Employee'}
            ],
            
            destructiveText: 'Invalidate',
            titleText: 'Complete Your JSA Form',
            cancelText: 'Cancel',
            cancel: function() {
            },
            buttonClicked: function(index) {
                if (index == 0) {
                    $state.go('submitForm');
                }
                else if (index == 1) {
                    $scope.openCertModal();
                }
                return true;
            },
            destructiveButtonClicked: function() {
                formInfo.setSignatures([]);
                $state.go('verify');
                return true;
            }
        });
    };
    
    $scope.onclick = function(state) {
        //var so = cordova.plugins.screenorientation;
        //so.setOrientation('unlocked');
        stateController.nextstate = "signatureList";
        stateController.previoussate = "completedForm";
        formInfo.setStateController(stateController);
        $state.go(state);
    };
});