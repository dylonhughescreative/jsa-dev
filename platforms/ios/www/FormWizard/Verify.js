app.controller('VerifyCtrl', function ($rootScope, $scope, $state, $ionicModal, $window, formInfo, jsPdfBuilder) {
    'use strict';
    
    var verifyState = this;
    var vForm = formInfo;
    
    var stateController = { };
    
    $scope.commitment = { };
    $scope.emptySig = true;
    
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
    });
    
    // I found this call after kludging my way into making 2 signature modals.
    // It's 1 AM so I don't feel like correcting it right now, but here's a 
    // TODO
    $scope.$on('$stateChangeStart', function(){
        $scope.signatureModal.remove();
        $scope.certificationModal.remove();
        $ionicModal.fromTemplateUrl('./FormWizard/CertificationAwarenessModal.html', {
            id: "2",
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.certificationModal = modal;
        });
        $ionicModal.fromTemplateUrl('./FormWizard/SignatureModal.html', {
            id: "1",
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.signatureModal = modal;
        });
    });
    
    $scope.sigCanvas = {
        scroll: 'false',
        width: $window.innerWidth - $window.innerWidth*0.02,
        height: $window.innerHeight * 0.2
    };
    
    var signaturePad;
    
    $scope.closeSignatureModal = function() {
        //var so = cordova.plugins.screenorientation;
        //so.setOrientation('landscape');
        $scope.signatureModal.hide();
        $scope.saveCanvas();
    }
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
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
        var canvas = document.getElementById('signatureCanvas');
        var options = {
            onEnd: function(event) {
                if (this.isEmpty())
                    $scope.emptySig = true;
                else
                    $scope.emptySig = false;
            }
        }
        signaturePad = new SignaturePad(canvas, options);
        signaturePad.clear();
        var ModalDimensions = document.getElementById('SignatureModal');
        $scope.sigCanvas.width = ModalDimensions.offsetWidth - ModalDimensions.offsetWidth*0.02;
        $scope.sigCanvas.height =  ModalDimensions.offsetHeight * 0.5;
    }
    
    $scope.saveCanvas = function () {
        var sigImg = signaturePad.toDataURL();
        $scope.commitment.signature = sigImg;
        $scope.signatures.push({
            name: $scope.commitment.name,
            date: $scope.commitment.date,
            signature: $scope.commitment.signature    
        });
        if (window.cordova) {
            var so = cordova.plugins.screenorientation;
            so.setOrientation('landscape');
        }
        $state.go('completedForm');
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
    
    $scope.back = function () {
        //var so = cordova.plugins.screenorientation;
        //so.setOrientation('unlocked');
        $state.go('overview');
    };
    
    $scope.onclick = function(state) {
        //var so = cordova.plugins.screenorientation;
        //so.setOrientation('unlocked');
        stateController.nextstate = "completedForm";
        stateController.previoussate = "verify";
        $state.go(state);
    };
    
    $scope.openCertModal = function() {
        //var so = cordova.plugins.screenorientation;
        //so.setOrientation('unlocked');
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
    
    $scope.uploadFile = function () {
        jsPdfBuilder.createPdf();
        //var url = "http://dylonhughes.com/uploads/upload.php",
        ////target path may be local or url
        //filename = "JSA_Form.pdf",
        //targetPath = cordova.file.documentsDirectory.concat(filename);
        ////var filename = targetPath.split("/").pop();
        //var options = {
        //    fileKey: "file",
        //    fileName: filename,
        //    chunkedMode: false,
        //    mimeType: "text/plain"
        //};
        //$cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
        //    console.log("SUCCESS: " + JSON.stringify(result.response));
        //    alert("success" + targetPath);
        //    alert(JSON.stringify(result.response));
        //}, function(err) {
        //    console.log("ERROR: " + JSON.stringify(err));
        //    alert(JSON.stringify(err));
        //});
    };
});