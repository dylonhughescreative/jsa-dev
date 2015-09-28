app.controller('SigCtrl', function ($rootScope, $scope, $state, $window, $ionicModal, formInfo) {
    'use strict';
    
    $scope.signatures = angular.copy(formInfo.getSignatures());
    $scope.commitment = { };
    
    $ionicModal.fromTemplateUrl('./FormWizard/SignatureModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.signatureModal = modal;
    });
    
    $scope.sigCanvas = {
        scroll: 'false',
        width: $window.innerWidth - $window.innerWidth*0.02,
        height: $window.innerHeight * 0.2
    };
    
    var stateController = angular.copy(formInfo.getStateController());
    var signaturePad;
    
    $scope.closeSignatureModal = function() {
        var sigImg = signaturePad.toDataURL("image/png", 1);
        $scope.commitment.signature = sigImg;
        $scope.signatureModal.hide();
    }
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.signatures = angular.copy(formInfo.getSignatures());
        stateController = angular.copy(formInfo.getStateController());
        $scope.commitment = { };
        $scope.clearCanvas();
        $scope.sigCanvas = $window.width;
    });   
    
    $scope.clearCanvas = function () {
        signaturePad.clear();
    }
    
    $scope.openSignatureModal = function() {
        $scope.signatureModal.show();
        var canvas = document.getElementById('signatureCanvas');
        signaturePad = new SignaturePad(canvas);
        var ModalDimensions = document.getElementById('SignatureModal');
        $scope.sigCanvas.width = ModalDimensions.clientWidth - ModalDimensions.clientWidth*0.02;
        $scope.sigCanvas.height =  ModalDimensions.clientHeight * 0.2;
    }
    
    $scope.saveCanvas = function () {
        var sigImg = signaturePad.toDataURL("image/png", 1);
        $scope.commitment.signature = sigImg;
        $scope.signatures.push({
            name: $scope.commitment.name,
            date: $scope.commitment.date,
            signature: $scope.commitment.signature    
        });
        formInfo.setSignatures($scope.signatures);
        $state.go(stateController.nextstate);
    }
    
    function refresh() {
        $scope.sigCanvas.width = $window.innerWidth - $window.innerWidth*0.02;
        $scope.sigCanvas.height = $window.innerHeight * 0.2;
        $scope.$apply();
    }
    //angular.element($window).bind('resize', refresh);
});