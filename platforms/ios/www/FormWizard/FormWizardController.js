app.controller('FormWizardCtrl', function ($rootScope, $scope, $state, $ionicSideMenuDelegate, formInfo) {
    'use strict';
  
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
    
    $scope.completedElements = angular.copy(formInfo.getcompletedElements());
    $scope.basicinfo = angular.copy(formInfo.getBasicInfo());
    $scope.tempPPEinfo = angular.copy(formInfo.getppeinfo());
    $scope.groups = angular.copy(formInfo.getjobelements());
    $scope.tempTrainReqs = angular.copy(formInfo.getTrainReqs());
    $scope.tempLicReqs = angular.copy(formInfo.getLicReqs());
    $scope.AreaConcerns = angular.copy(formInfo.getAreaConcerns());
    $scope.Training = angular.copy(formInfo.getAddTraining());
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.completedElements = angular.copy(formInfo.getcompletedElements());
        $scope.basicinfo = angular.copy(formInfo.getBasicInfo());
        $scope.tempPPEinfo = angular.copy(formInfo.getppeinfo());
        $scope.groups = angular.copy(formInfo.getjobelements());
        $scope.tempTrainReqs = angular.copy(formInfo.getTrainReqs());
        $scope.tempLicReqs = angular.copy(formInfo.getLicReqs());
        $scope.AreaConcerns = angular.copy(formInfo.getAreaConcerns());
        $scope.Training = angular.copy(formInfo.getAddTraining());
    });
    
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
            if(formInfo.getBasicInfo().gcorsub != "") {
                nextState = formInfo.getBasicInfo().gcorsub;
            }
        }
        
        $state.go(nextState);
    };
    
    $scope.next = function (state) {
        $state.go(state);
    };
    
    $scope.GoToPage = function (state) {
        if(state == "formWizard.GCorSub") {
            if(formInfo.getBasicInfo().gcorsub != "") {
                state = formInfo.getBasicInfo().gcorsub;
            }
        }
            
        $state.go(state);
        $ionicSideMenuDelegate.toggleLeft(false);
    };
    
    function verifyGCinfo () {
        if (angular.isUndefined($scope.basicinfo.username) || $scope.basicinfo.username === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.generalcontractor) || $scope.basicinfo.generalcontractor === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.gcsuperintendent) || $scope.basicinfo.gcsuperintendent === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.projectname) || $scope.basicinfo.projectname === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.startdate) || $scope.basicinfo.startdate === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.enddate) || $scope.basicinfo.enddate === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.jobscope) || $scope.basicinfo.jobscope === "") {
            return "invalid";
        } else {
            return "valid";
        }
    } 
    function checkGCinfo () {
        formInfo.setBasicInfocomplete(verifyGCinfo());
        formInfo.setBasicInfo($scope.basicinfo)
    }
    
    function verifySubinfo() {
        if (angular.isUndefined($scope.basicinfo.username) || $scope.basicinfo.username === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.subcontractor) || $scope.basicinfo.subcontractor === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.sitesupervisor) || $scope.basicinfo.sitesupervisor === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.generalcontractor) || $scope.basicinfo.generalcontractor === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.gcsuperintendent) || $scope.basicinfo.gcsuperintendent === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.projectname) || $scope.basicinfo.projectname === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.startdate) || $scope.basicinfo.startdate === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.startdate) || $scope.basicinfo.startdate === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.jobscope) || $scope.basicinfo.jobscope === "") {
            return "invalid";
        } else {
            return "valid";
        }
    }   
    function checkSubinfo () {
        formInfo.setBasicInfocomplete(verifySubinfo());
        formInfo.setBasicInfo($scope.basicinfo);
    }
    
    function verifyPPEinfo () {
        if ($scope.tempPPEinfo.None === true) {
            return "valid";
        } else if ($scope.tempPPEinfo.cm_EyeProtection === true) {
            return "valid";
        } else if ($scope.tempPPEinfo.cm_ChemGoggles === true) {
            return "valid";
        } else if ($scope.tempPPEinfo.cm_HardHat === true) {
            return "valid";
        } else if ($scope.tempPPEinfo.cb_RespiratorType !== "N/A") {
            return "valid";
        } else if ($scope.tempPPEinfo.cb_GlovesType !== "N/A") {
            return "valid";
        } else if ($scope.tempPPEinfo.cb_Clothing !== "N/A") {
            return "valid";
        } else if ($scope.tempPPEinfo.cm_ProtectiveToe === true) {
            return "valid";
        } else if ($scope.tempPPEinfo.cm_HearingProtection === true) {
            return "valid";
        } else if ($scope.tempPPEinfo.cm_HarnessLanyard === true) {
            return "valid";
        } else if ($scope.tempPPEinfo.cm_FaceShield === true) {
            return "valid";
        } else if ($scope.tempPPEinfo.tb_Other !== "") {
            return "valid";
        } else {
            return "invalid";
        }
    }
    function formatPPEinfo () {
        if ($scope.tempPPEinfo.cb_RespiratorType !== "N/A") {
            $scope.tempPPEinfo.cm_RespiratorType = true;
        } else {
            $scope.tempPPEinfo.cm_RespiratorType = false;
        }
        
        if ($scope.tempPPEinfo.cb_GlovesType !== "N/A") {
            $scope.tempPPEinfo.cm_GlovesType = true;
        } else {
            $scope.tempPPEinfo.cm_GlovesType = false;
        }
        
        if ($scope.tempPPEinfo.cb_Clothing !== "N/A") {
            $scope.tempPPEinfo.cm_Clothing = true;
        } else {
            $scope.tempPPEinfo.cm_Clothing = false;
        }
        
        if ($scope.tempPPEinfo.cb_ChemClothing !== "N/A") {
            $scope.tempPPEinfo.cm_ChemClothing = true;
        } else {
            $scope.tempPPEinfo.cm_ChemClothing = false;
        }
        
        if ($scope.tempPPEinfo.tb_Other !== "") {
            $scope.tempPPEinfo.cm_Other = true;
        } else {
            $scope.tempPPEinfo.cm_Other = false;
        }
    }
    function checkPPEinfo () {
        formInfo.setPPEcomplete(verifyPPEinfo());
        formatPPEinfo();
        formInfo.setppeinfo($scope.tempPPEinfo);
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