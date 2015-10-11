app.controller('VerifyCtrl', function ($rootScope, $scope, $state, $ionicModal, $window, $ionicNavBarDelegate, $ionicPopup, formInfo, savedForms, jsPdfBuilder) {
    'use strict';
    
    var verifyState = this;
    verifyState.vForm = formInfo;
    verifyState.saved = savedForms;
    $ionicNavBarDelegate.showBackButton(false);
    
    var stateController = { };
    $scope.NextButtonText = "Certify";
    var lockForm = function() {
        verifyState.vForm.locked = true;
        $scope.NextButtonText = "Add Signature";
    }
    
    var unlockForm = function() {
        verifyState.vForm.locked = false;
        $scope.NextButtonText = "Certify";
    }
    
    $scope.commitment = { };
    $scope.emptySig = true;
    verifyState.vForm.locked = false;
    
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
    
    $ionicModal.fromTemplateUrl('./FormWizard/EmployeeAwarenessModal.html', {
        id: "3",
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.employeeModal = modal;
    });
    
    $scope.$on('$stateChangeStart', function(){
        $scope.signatureModal.remove();
        $scope.certificationModal.remove();
        $scope.employeeModal.remove();
        $ionicNavBarDelegate.showBackButton(false);
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
        $ionicModal.fromTemplateUrl('./FormWizard/EmployeeAwarenessModal.html', {
            id: "3",
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.employeeModal = modal;
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
        verifyState.vForm.signatures.push({
            name: $scope.commitment.name,
            date: $scope.commitment.date,
            signature: $scope.commitment.signature    
        });
        if (window.cordova) {
            var so = cordova.plugins.screenorientation;
            so.setOrientation('landscape');
        }
        if (!verifyState.vForm.locked)
            lockForm();
        $scope.commitment = {};
        $ionicNavBarDelegate.showBackButton(false);
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
        if (verifyState.vForm.locked)
            $scope.employeeModal.show();
        else
            $scope.certificationModal.show();
    }
    
    $scope.closeCertModal = function() {
        if (verifyState.vForm.locked)
            $scope.employeeModal.hide();
        else
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
    
    $scope.ActionItems = [
           {
               title: 'Save Form',
               verifyAction: 'saveform'
           },
           {
               title: 'Add Employee Signature',
               verifyAction: 'addemployee'
           },
           {
               title: 'Edit Form',
               verifyAction: 'unlock'
           },
    ];
    
    $scope.actionClick = function(actionName) {
        if (actionName === "saveform") {
            verifyState.saved.forms.push(verifyState.vForm);
        }
        else if (actionName === "addemployee") {
            $scope.openCertModal();
        }
        else if (actionName === "unlock") {
            verifyState.vForm.locked = false;
            verifyState.vForm.signatures = [];
            $state.go('overview');
        }
    }
    
    $scope.saveForm = function () {
        // Save the form.
    }
    
    $scope.submitForm = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: "Submit JSA Form",
            template: "Are you sure you want to submit this JSA? Doing so will not allow you to retrieve it once it has been sent."
        });
        confirmPopup.then(function(res) {
            if(res) {
                uploadFile();
            } else {
                console.log("");
            }
        });
    };
    
    var uploadFile = function () {
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