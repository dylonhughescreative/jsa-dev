app.controller('LicReqCtrl', function ($rootScope, $scope, formInfo) {
    'use strict';
    $scope.tempLicReqs = {
        ForkLift: false,
        AerialLift: false,
        cb_Crane: 'N/A',
        cb_HeavyEquip: 'N/A',
        tb_Other: ''
    };
    
    $scope.tempLicReqs = angular.copy(formInfo.getLicReqs());
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.tempLicReqs = angular.copy(formInfo.getLicReqs());
    });
    
    function verify() {
        if ($scope.tempLicReqs.ForkLift === true) {
            return "valid";
        } else if ($scope.tempLicReqs.AerialLift === true) {
            return "valid";
        } else if ($scope.tempLicReqs.cb_Crane === "N/A") {
            return "valid";
        } else if ($scope.tempLicReqs.cb_HeavyEquip !== "N/A") {
            return "valid";
        } else if ($scope.tempLicReqs.tb_Other !== "") {
            return "valid";
        } else {
            return "invalid";
        }
    }
    function format() {
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
    
    $scope.check = function (state) {
        formInfo.setLicReqsComplete(verify());
        //if(!gooddata)
        //  popup
        //else
        //  next
        format();
        formInfo.setLicReqs($scope.tempLicReqs);
        $scope.next(state);
    };
    
});
