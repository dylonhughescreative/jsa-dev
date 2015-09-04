app.controller('PPECtrl', function ($rootScope, $scope, formInfo) {
    'use strict';
    $scope.tempPPEinfo = {
        cm_EyeProtection: false,
        cm_ChemGoggles: false,
        cm_HardHat: false,
        cb_RespiratorType: 'N/A',
        cb_GlovesType: 'N/A',
        cb_Clothing: 'N/A',
        cm_ProtectiveToe: false,
        cm_HearingProtection: false,
        cb_ChemClothing: 'N/A',
        cm_HarnessLanyard: false,
        cm_FaceShield: false,
        tb_Other: ''
    };
    
    $scope.tempPPEinfo = angular.copy(formInfo.getppeinfo());
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.tempPPEinfo = angular.copy(formInfo.getppeinfo());;
    });
    
    function verify() {
        if ($scope.tempPPEinfo.cm_EyeProtection === true) {
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
    function format() {
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
    
    $scope.check = function (state) {
        formInfo.setPPEcomplete(verify());
        //if(!gooddata)
        //  popup
        //else
        //  next
        format();
        formInfo.setppeinfo($scope.tempPPEinfo);
        $scope.next(state);
    };
    
});
