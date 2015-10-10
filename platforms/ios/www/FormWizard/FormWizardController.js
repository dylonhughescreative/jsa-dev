app.controller('FormWizardCtrl', function ($rootScope, $scope, $state, $ionicSideMenuDelegate, formInfo) {
    'use strict';
    
    var formparentState = this;
    
    formparentState.formInfo = formInfo;
  
    $scope.wizardSteps = [
           {
               title: 'General Information',
               link: 'formWizard.GCorSub'
           },
           {
               title: 'PPE Assessment',
               link: 'formWizard.PPE'
           },
           {
               title: 'Job Elements',
               link: 'formWizard.JobElements'
           },
           {
               title: 'Training Requirements',
               link: 'formWizard.TrainReq'
           },
           {
               title: 'License Requirements',
               link: 'formWizard.LicReq'
           },
           {
               title: 'Area Concerns',
               link: 'formWizard.AreaConcerns'
           },
           {
               title: 'Additional Training',
               link: 'formWizard.AddTraining'
           }
    ];
    
    $scope.check = function (nextState) {  
        switch ($state.current.name) {
            case "formWizard.GCinfo":
                checkGCinfo();
                break;
            case "formWizard.Subinfo":
                checkSubinfo();
                break;
            case "formWizard.PPE":
                checkPPEinfo();
                break;
            case "formWizard.JobElements":
                checkJobElements();
                break;
            case "formWizard.TrainReq":
                checkTrainReqs();
                break;
            case "formWizard.LicReq":
                checkLicReqs();
                break;
            case "formWizard.AreaConcerns":
                checkAreaConcerns();
                break;
            case "formWizard.AddTraining":
                checkAddTraining();
                break;
            default:
                break;
        }
        
        if(nextState == "formWizard.GCorSub") {
            if(formparentState.formInfo.basicinfo.gcorsub != "") {
                nextState = formparentState.formInfo.basicinfo.gcorsub;
            }
        }
        
        $state.go(nextState);
    };
    
    $scope.next = function (state) {
        $state.go(state);
    };
    
    $scope.GoToPage = function (state) {
        if(state == "formWizard.GCorSub") {
            if(formparentState.formInfo.basicinfo.gcorsub != "") {
                nextState = formparentState.formInfo.basicinfo.gcorsub;
            }
        }
            
        $state.go(state);
        $ionicSideMenuDelegate.toggleLeft(false);
    };
    
    function verifyGCinfo () {
        if (angular.isUndefined(formparentState.formInfo.basicinfo.username) || formparentState.formInfo.basicinfo.username === "") {
            return "invalid";
        } else if (angular.isUndefined(formparentState.formInfo.basicinfo.generalcontractor) || formparentState.formInfo.basicinfo.generalcontractor === "") {
            return "invalid";
        } else if (angular.isUndefined(formparentState.formInfo.basicinfo.gcsuperintendent) || formparentState.formInfo.basicinfo.gcsuperintendent === "") {
            return "invalid";
        } else if (angular.isUndefined(formparentState.formInfo.basicinfo.projectname) || formparentState.formInfo.basicinfo.projectname === "") {
            return "invalid";
        } else if (angular.isUndefined(formparentState.formInfo.basicinfo.startdate) || formparentState.formInfo.basicinfo.startdate === "") {
            return "invalid";
        } else if (angular.isUndefined(formparentState.formInfo.basicinfo.enddate) || formparentState.formInfo.basicinfo.enddate === "") {
            return "invalid";
        } else if (angular.isUndefined(formparentState.formInfo.basicinfo.jobscope) || formparentState.formInfo.basicinfo.jobscope === "") {
            return "invalid";
        } else {
            return "valid";
        }
    } 
    function checkGCinfo () {
        formparentState.formInfo.completedElements.BasicInfo = verifyGCinfo();
    }
    
    function verifySubinfo() {
        if (angular.isUndefined(formparentState.formInfo.basicinfo.username) || formparentState.formInfo.basicinfo.username === "") {
            return "invalid";
        } else if (angular.isUndefined(formparentState.formInfo.basicinfo.subcontractor) || formparentState.formInfo.basicinfo.subcontractor === "") {
            return "invalid";
        } else if (angular.isUndefined(formparentState.formInfo.basicinfo.sitesupervisor) || formparentState.formInfo.basicinfo.sitesupervisor === "") {
            return "invalid";
        } else if (angular.isUndefined(formparentState.formInfo.basicinfo.generalcontractor) || formparentState.formInfo.basicinfo.generalcontractor === "") {
            return "invalid";
        } else if (angular.isUndefined(formparentState.formInfo.basicinfo.gcsuperintendent) || formparentState.formInfo.basicinfo.gcsuperintendent === "") {
            return "invalid";
        } else if (angular.isUndefined(formparentState.formInfo.basicinfo.projectname) || formparentState.formInfo.basicinfo.projectname === "") {
            return "invalid";
        } else if (angular.isUndefined(formparentState.formInfo.basicinfo.startdate) || formparentState.formInfo.basicinfo.startdate === "") {
            return "invalid";
        } else if (angular.isUndefined(formparentState.formInfo.basicinfo.startdate) || formparentState.formInfo.basicinfo.startdate === "") {
            return "invalid";
        } else if (angular.isUndefined(formparentState.formInfo.basicinfo.jobscope) || formparentState.formInfo.basicinfo.jobscope === "") {
            return "invalid";
        } else {
            return "valid";
        }
    }   
    function checkSubinfo () {
        formparentState.formInfo.completedElements.BasicInfo = verifySubinfo();
    }
    
    function verifyPPEinfo () {
        if (formparentState.formInfo.ppeinfo.None === true) {
            return "valid";
        } else if (formparentState.formInfo.ppeinfo.cm_EyeProtection === true) {
            return "valid";
        } else if (formparentState.formInfo.ppeinfo.cm_ChemGoggles === true) {
            return "valid";
        } else if (formparentState.formInfo.ppeinfo.cm_HardHat === true) {
            return "valid";
        } else if (formparentState.formInfo.ppeinfo.cb_RespiratorType !== "N/A") {
            return "valid";
        } else if (formparentState.formInfo.ppeinfo.cb_GlovesType !== "N/A") {
            return "valid";
        } else if (formparentState.formInfo.ppeinfo.cb_Clothing !== "N/A") {
            return "valid";
        } else if (formparentState.formInfo.ppeinfo.cm_ProtectiveToe === true) {
            return "valid";
        } else if (formparentState.formInfo.ppeinfo.cm_HearingProtection === true) {
            return "valid";
        } else if (formparentState.formInfo.ppeinfo.cm_HarnessLanyard === true) {
            return "valid";
        } else if (formparentState.formInfo.ppeinfo.cm_FaceShield === true) {
            return "valid";
        } else if (formparentState.formInfo.ppeinfo.tb_Other !== "") {
            return "valid";
        } else {
            return "invalid";
        }
    }
    function formatPPEinfo () {
        if (formparentState.formInfo.ppeinfo.cb_RespiratorType !== "N/A") {
            formparentState.formInfo.ppeinfo.cm_RespiratorType = true;
        } else {
            formparentState.formInfo.ppeinfo.cm_RespiratorType = false;
        }
        
        if (formparentState.formInfo.ppeinfo.cb_GlovesType !== "N/A") {
            formparentState.formInfo.ppeinfo.cm_GlovesType = true;
        } else {
            formparentState.formInfo.ppeinfo.cm_GlovesType = false;
        }
        
        if (formparentState.formInfo.ppeinfo.cb_Clothing !== "N/A") {
            formparentState.formInfo.ppeinfo.cm_Clothing = true;
        } else {
            formparentState.formInfo.ppeinfo.cm_Clothing = false;
        }
        
        if (formparentState.formInfo.ppeinfo.cb_ChemClothing !== "N/A") {
            formparentState.formInfo.ppeinfo.cm_ChemClothing = true;
        } else {
            formparentState.formInfo.ppeinfo.cm_ChemClothing = false;
        }
        
        if (formparentState.formInfo.ppeinfo.tb_Other !== "") {
            formparentState.formInfo.ppeinfo.cm_Other = true;
        } else {
            formparentState.formInfo.ppeinfo.cm_Other = false;
        }
    }
    function checkPPEinfo () {
        formparentState.formInfo.completedElements.PPEAssess = verifyPPEinfo();
        formatPPEinfo();
    }
    
    function verifyJobElements () {
        if($scope.groups.length > 0) {
            return "valid";
        } else {
            return "invalid";
        }
    }
    function checkJobElements () {
        formInfo.setjobelementsComplete(verifyJobElements());
        formInfo.setjobelements($scope.groups);
    }
    
    function verifyTrainReqs () {
        if ($scope.tempTrainReqs.None === true) {
            return "valid";
        } else if ($scope.tempTrainReqs.RedTag === true) {
            return "valid";
        } else if ($scope.tempTrainReqs.ConfinedSpace === true) {
            return "valid";
        } else if ($scope.tempTrainReqs.Scaffold === true) {
            return "valid";
        } else if ($scope.tempTrainReqs.FireWatch === true) {
            return "valid";
        } else if ($scope.tempTrainReqs.AerialLift === true) {
            return "valid";
        } else if ($scope.tempTrainReqs.DriverSafety === true) {
            return "valid";
        } else if ($scope.tempTrainReqs.SWP === true) {
            return "valid";
        } else if ($scope.tempTrainReqs.SOP === true) {
            return "valid";
        } else if ($scope.tempTrainReqs.Rigger === true) {
            return "valid";
        } else if ($scope.tempTrainReqs.ForkLift === true) {
            return "valid";
        } else if ($scope.tempTrainReqs.tb_Other !== "") {
            return "valid";
        } else {
            return "invalid";
        }
    }
    function formatTrainReqs() {
        if ($scope.tempTrainReqs.Other !== "") {
            $scope.tempTrainReqs.cm_Other = true;
        } else {
            $scope.tempTrainReqs.cm_Other = false;
        }
    }
    function checkTrainReqs () {
        formInfo.setTrainReqsComplete(verifyTrainReqs());
        formatTrainReqs();
        formInfo.setTrainReqs($scope.tempTrainReqs);
    }
    
    function verifyLicReqs () {
        if ($scope.tempLicReqs.None === true) {
            return "valid";
        } else if ($scope.tempLicReqs.ForkLift === true) {
            return "valid";
        } else if ($scope.tempLicReqs.AerialLift === true) {
            return "valid";
        } else if ($scope.tempLicReqs.cb_Crane !== "N/A") {
            return "valid";
        } else if ($scope.tempLicReqs.cb_HeavyEquip !== "N/A") {
            return "valid";
        } else if ($scope.tempLicReqs.tb_Other !== "") {
            return "valid";
        } else {
            return "invalid";
        }
    }
    function formatLicReqs () {
        if ($scope.tempLicReqs.cb_Crane !== "N/A") {
            $scope.tempLicReqs.cm_Crane = true;
        } else {
            $scope.tempLicReqs.cm_Crane = false;
        }
        
        if ($scope.tempLicReqs.cb_HeavyEquip !== "N/A") {
            $scope.tempLicReqs.cm_HeavyEquip = true;
        } else {
            $scope.tempLicReqs.cm_HeavyEquip = false;
        }
        
        if ($scope.tempLicReqs.tb_Other !== "") {
            $scope.tempLicReqs.cm_Other = true;
        } else {
            $scope.tempLicReqs.cm_Other = false;
        }
    }
    function checkLicReqs () {
        formInfo.setLicReqsComplete(verifyLicReqs());
        formatLicReqs();
        formInfo.setLicReqs($scope.tempLicReqs);
    }
    
    function verifyAreaConcerns () {
        if (($scope.AreaConcerns.lof_none === true || $scope.AreaConcerns.lineofFire.length > 0) &&
           ($scope.AreaConcerns.sensequip_none === true || $scope.AreaConcerns.sensEquip.length > 0) &&
           ($scope.AreaConcerns.fallhaz_none === true || $scope.AreaConcerns.fallHazards.length > 0)) {
            return "valid";
        } else {
            return "invalid";
        }
    }
    function checkAreaConcerns () {
        formInfo.setAreaConcernsComplete(verifyAreaConcerns());
        formInfo.setAreaConcerns($scope.AreaConcerns);
    }
    
    function verifyAddTraining () {
        if($scope.Training.None === true || $scope.Training.AddTraining.length > 0) {
            return "valid";
        } else {
            return "invalid";
        }
    }
    function checkAddTraining () {
        formInfo.setAddTrainingComplete(verifyAddTraining());
        formInfo.setAddTraining($scope.Training);
    }
    
    
});