app.controller('FormWizardCtrl', function ($rootScope, $scope, $state, $ionicSideMenuDelegate, formInfo) {
    'use strict';
    
    var formparentState = this;
    
    $scope.loading = true;
    $scope.$on('$ionicView.beforeEnter', function ()
	{   
        $scope.loading = true;
	});
	
	$scope.$on('$ionicView.afterEnter', function ()
	{     
        $scope.loading = false;
	});
    
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
        $ionicSideMenuDelegate.toggleLeft(false);
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
    
    $scope.$on('$stateChangeStart', function(){
        $ionicSideMenuDelegate.toggleLeft(false);
    });
    
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
        if(formparentState.formInfo.jobelements.length > 0) {
            return "valid";
        } else {
            return "invalid";
        }
    }
    function checkJobElements () {
        formparentState.formInfo.completedElements.JobElements = verifyJobElements();
    }
    
    function verifyTrainReqs () {
        if (formparentState.formInfo.trainReqs.None === true) {
            return "valid";
        } else if (formparentState.formInfo.trainReqs.RedTag === true) {
            return "valid";
        } else if (formparentState.formInfo.trainReqs.ConfinedSpace === true) {
            return "valid";
        } else if (formparentState.formInfo.trainReqs.Scaffold === true) {
            return "valid";
        } else if (formparentState.formInfo.trainReqs.FireWatch === true) {
            return "valid";
        } else if (formparentState.formInfo.trainReqs.AerialLift === true) {
            return "valid";
        } else if (formparentState.formInfo.trainReqs.DriverSafety === true) {
            return "valid";
        } else if (formparentState.formInfo.trainReqs.SWP === true) {
            return "valid";
        } else if (formparentState.formInfo.trainReqs.SOP === true) {
            return "valid";
        } else if (formparentState.formInfo.trainReqs.Rigger === true) {
            return "valid";
        } else if (formparentState.formInfo.trainReqs.ForkLift === true) {
            return "valid";
        } else if (formparentState.formInfo.trainReqs.tb_Other !== "") {
            return "valid";
        } else {
            return "invalid";
        }
    }
    function formatTrainReqs() {
        if (formparentState.formInfo.trainReqs.Other !== "") {
            formparentState.formInfo.trainReqs.cm_Other = true;
        } else {
            formparentState.formInfo.trainReqs.cm_Other = false;
        }
    }
    function checkTrainReqs () {
        formparentState.formInfo.completedElements.TrainReqs = verifyTrainReqs();
        formatTrainReqs();
    }
    
    function verifyLicReqs () {
        if (formparentState.formInfo.licReqs.None === true) {
            return "valid";
        } else if (formparentState.formInfo.licReqs.ForkLift === true) {
            return "valid";
        } else if (formparentState.formInfo.licReqs.AerialLift === true) {
            return "valid";
        } else if (formparentState.formInfo.licReqs.cb_Crane !== "N/A") {
            return "valid";
        } else if (formparentState.formInfo.licReqs.cb_HeavyEquip !== "N/A") {
            return "valid";
        } else if (formparentState.formInfo.licReqs.tb_Other !== "") {
            return "valid";
        } else {
            return "invalid";
        }
    }
    function formatLicReqs () {
        if (formparentState.formInfo.licReqs.cb_Crane !== "N/A") {
            formparentState.formInfo.licReqs.cm_Crane = true;
        } else {
            formparentState.formInfo.licReqs.cm_Crane = false;
        }
        
        if (formparentState.formInfo.licReqs.cb_HeavyEquip !== "N/A") {
            formparentState.formInfo.licReqs.cm_HeavyEquip = true;
        } else {
            formparentState.formInfo.licReqs.cm_HeavyEquip = false;
        }
        
        if (formparentState.formInfo.licReqs.tb_Other !== "") {
            formparentState.formInfo.licReqs.cm_Other = true;
        } else {
            formparentState.formInfo.licReqs.cm_Other = false;
        }
    }
    function checkLicReqs () {
        formparentState.formInfo.completedElements.LicReqs = verifyLicReqs();
        formatLicReqs();
    }
    
    function verifyAreaConcerns () {
        if ((formparentState.formInfo.areaConcerns.lof_none === true || formparentState.formInfo.areaConcerns.lineofFire.length > 0) &&
           (formparentState.formInfo.areaConcerns.sensequip_none === true || formparentState.formInfo.areaConcerns.sensEquip.length > 0) &&
           (formparentState.formInfo.areaConcerns.fallhaz_none === true || formparentState.formInfo.areaConcerns.fallHazards.length > 0)) {
            return "valid";
        } else {
            return "invalid";
        }
    }
    function checkAreaConcerns () {
        formparentState.formInfo.completedElements.AreaConcerns = verifyAreaConcerns();
    }
    
    function verifyAddTraining () {
        if(formparentState.formInfo.addTraining.None === true || formparentState.formInfo.addTraining.AddTraining.length > 0) {
            return "valid";
        } else {
            return "invalid";
        }
    }
    function checkAddTraining () {
        formparentState.formInfo.completedElements.AddTraining = verifyAddTraining();
    }
});