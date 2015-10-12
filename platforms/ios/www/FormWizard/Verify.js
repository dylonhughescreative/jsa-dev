app.controller('VerifyCtrl', function ($rootScope, $scope, $state, $ionicModal, $window, $ionicNavBarDelegate, $ionicPopup, $ionicSideMenuDelegate, $localstorage, formInfo, savedForms, jsPdfBuilder) {
    'use strict';
    
    var verifyState = this;
    verifyState.vForm = formInfo;
    verifyState.saved = savedForms;
    $ionicNavBarDelegate.showBackButton(false);
    
    var stateController = { };
    var signaturePad;
    var lockForm = function() {
        verifyState.vForm.locked = true;
        verifyState.vForm.NextButtonText = "Add Signature";
    }
    
    var unlockForm = function() {
        verifyState.vForm.locked = false;
        verifyState.vForm.NextButtonText = "Certify";
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
    
    function refresh() {
        var ModalDimensions = document.getElementById('SignatureModal');
        if (ModalDimensions != null) {
            $scope.sigCanvas.width = ModalDimensions.offsetWidth - ModalDimensions.offsetWidth*0.02;
            $scope.sigCanvas.height =  ModalDimensions.offsetHeight * 0.5;
            $scope.$apply();
        }
    }
    angular.element($window).bind('resize', refresh);
    
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
               title: 'Add Signatures',
               verifyAction: 'addsignatures'
           },
           {
               title: 'Edit Form',
               verifyAction: 'unlock'
           },
    ];
    
    $scope.actionClick = function(actionName) {
        if (actionName === "saveform") {
            saveForm();
        }
        else if (actionName === "home") {
            warnBeforeLeaving('home');
        }
        else if (actionName === "addsignatures") {
            $scope.openCertModal();
        }
        else if (actionName === "unlock") {
            warnBeforeLeaving('overview');
        }
        $ionicSideMenuDelegate.toggleLeft(false);
    }
    
    var saveForm = function () {
        var saveFormPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="verifyState.vForm.formName">',
            title: 'Save Form As',
            subTitle: 'Enter a name for this form.',
            scope: $scope,
            buttons: [
                {text: 'Cancel'},
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!verifyState.vForm.formName) {
                            e.preventDefault();
                        } else {
                            return verifyState.vForm.formName;
                        }
                    }
                }
            ]
        });
        saveFormPopup.then(function(res) {
            var nameIndex = verifyState.saved.formNames.indexOf(verifyState.vForm.formName);
            if (nameIndex != -1)
            {
                var overwritePopup = $ionicPopup.confirm({
                    title: 'Overwrite?',
                    template: 'There is already a form with this name; if you continue, it will be overwritten. Continue?'
                });
                overwritePopup.then(function (res) {
                    if (res) {
                        var formIndex = verifyState.saved.forms.map(function(e) {return e.formName}).indexOf(verifyState.vForm.formName);
                        verifyState.saved.formNames.splice(nameIndex, 1, verifyState.vForm.formName);
                        verifyState.saved.forms.splice(formIndex, 1, verifyState.vForm);
                        $localstorage.set(verifyState.vForm.formName, verifyState.vForm);
                    }
                });
            } else {
                verifyState.saved.formNames.push(verifyState.vForm.formName);
                verifyState.saved.forms.push(verifyState.vForm);
                $localstorage.set(verifyState.vForm.formName, verifyState.vForm);
            }
            // Decide if this form has already been saved and/or overwrite
            // Save to local storage.
        });
    }
    
    var warnBeforeLeaving = function (state) {
        if (verifyState.vForm.locked) {
            var warningPopup = $ionicPopup.confirm({
                title: 'Confirm Page Navigation',
                template: 'Leaving this page will delete the form certification and all signatures attached.  Are you sure you want to continue?'
            });
            warningPopup.then(function (res) {
                if (res) {
                    verifyState.vForm.locked = false;
                    verifyState.vForm.signatures = [];
                    $state.go(state);
                }
            });
        } else {
            $state.go(state);
        }
        $ionicSideMenuDelegate.toggleLeft(false);
    }
    
    $scope.submitForm = function () {
        $ionicSideMenuDelegate.toggleLeft(false);
        if (!verifyState.vForm.locked) {
            var cantDoThatPopup = $ionicPopup.alert({
                title: 'Form Uncertified',
                template: 'You need to certify the form is valid and add signatures before continuing.'
            });
            cantDoThatPopup.then(function(res) {
                $scope.openCertModal();
            });
            return;
        }
        if (verifyState.vForm.signatures.length < 2) {
            var noSigsPopup = $ionicPopup.confirm({
                title: "No Signatures Detected",
                template: "You don't appear to have entered any employee signatures.  Employee signatures can be added using the Add Signatures button in the top right.  Continue?"
            });
            noSigsPopup.then(function (res) {
                if (res) {
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
                } else {
                    console.log("");
                }
            });
        }
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