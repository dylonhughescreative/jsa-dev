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
    
    $ionicModal.fromTemplateUrl('./FormWizard/SignatureModal.html', {
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
    
    var stateController = { };
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.basicinfo = angular.copy(formInfo.getBasicInfo());
        $scope.ppeinfo = angular.copy(formInfo.getppeinfo());
        $scope.jobelements = angular.copy(formInfo.getjobelements());
        $scope.trainReqs = angular.copy(formInfo.getTrainReqs());
        $scope.licReqs = angular.copy(formInfo.getLicReqs());
        $scope.areaConcerns = angular.copy(formInfo.getAreaConcerns());
        $scope.addTraining = angular.copy(formInfo.getAddTraining());
        $scope.signatures = angular.copy(formInfo.getSignatures());
    });
    
    $scope.sigCanvas = {
        scroll: 'false',
        width: $window.innerWidth - $window.innerWidth*0.02,
        height: $window.innerHeight * 0.2
    };
        
    $scope.openCertModal = function() {
        $scope.certificationModal.show();
    }
    
    $scope.closeCertModal = function() {
        $scope.certificationModal.hide();
        $scope.openSignatureModal();
    }
    
    $scope.openSignatureModal = function() {
        if (window.cordova) { 
            var so = cordova.plugins.screenorientation;
            so.setOrientation('landscape');
        }
        $scope.signatureModal.show();
        var canvas = document.getElementById('signatureCanvas');
        signaturePad = new SignaturePad(canvas, {
            backgroundColor: 'rgb(255,255,255)'
        });
        signaturePad.clear();
        var ModalDimensions = document.getElementById('SignatureModal');
        $scope.sigCanvas.width = ModalDimensions.offsetWidth - ModalDimensions.offsetWidth*0.02;
        $scope.sigCanvas.height =  ModalDimensions.offsetHeight * 0.5;
    }
    
    $scope.closeSignatureModal = function() {
        $scope.signatureModal.hide();
        $scope.saveCanvas();
    }
        
    
    $scope.saveCanvas = function () {
        var sigImg = signaturePad.toDataURL("image/jpeg", 100);
        $scope.commitment.signature = sigImg;
        console.write(sigImg);
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
        $state.go(stateController.nextstate);
    }
    
    $scope.ShowActionSheet = function() {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                {text: '<b>Submit</b>'},
                {text: 'Add Employee'},
            ],
            destructiveText: 'Invalidate',
            titleText: 'Complete Your JSA Form',
            cancelText: 'Cancel',
            cancel: function() {
                $ionicActionSheet.hide();
            },
            buttonClicked: function(index) {
                return true;
            }
        });
    };
    
    function refresh() {
        var ModalDimensions = document.getElementById('SignatureModal');
        if (ModalDimensions != null) {
            $scope.sigCanvas.width = ModalDimensions.offsetWidth - ModalDimensions.offsetWidth*0.02;
            $scope.sigCanvas.height =  ModalDimensions.offsetHeight * 0.5;
            $scope.$apply();
        }
    }
    angular.element($window).bind('resize', refresh);
    
    $scope.onclick = function(state) {
        //var so = cordova.plugins.screenorientation;
        //so.setOrientation('unlocked');
        stateController.nextstate = "signatureList";
        stateController.previoussate = "completedForm";
        formInfo.setStateController(stateController);
        $state.go(state);
    };
});