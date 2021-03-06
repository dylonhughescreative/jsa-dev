app.controller('SigCtrl', function ($rootScope, $scope, $state, $window, $ionicModal, $ionicPopup, $document, formInfo) {
    'use strict';
    
    $scope.signatures = angular.copy(formInfo.getSignatures());
    $scope.commitment = { };
    
    $ionicModal.fromTemplateUrl('./FormWizard/SignatureModal.html', {
        id: "1",
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.signatureModal = modal;
    });
    
    $ionicModal.fromTemplateUrl('./FormWizard/CertificationAwarenessModal.html', {
        id: "2",
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.certificationModal = modal;
        $scope.openCertModal();
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
    
    $scope.back = function () {
        if (window.cordova) {
            var so = cordova.plugins.screenorientation;
            so.setOrientation('landscape');
        }
        $state.go('verify');
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
    if ($scope.certificationModal)
        $scope.openCertModal();
});