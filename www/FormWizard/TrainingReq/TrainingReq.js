app.controller('TrainReqCtrl', function ($rootScope, $scope, formInfo) {
    'use strict';
    $scope.tempTrainReqs = {
        RedTag: false,
        ConfinedSpace: false,
        Scaffold: false,
        FireWatch: false,
        Flagger: false,
        AerialLift: false,
        DriverSafety: false,
        SWP: false,
        SOP: false,
        Rigger: false,
        ForkLift: false,
        tb_Other: ''
    };
    
    $scope.tempTrainReqs = angular.copy(formInfo.getppeinfo());
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.tempTrainReqs = angular.copy(formInfo.getppeinfo());
    });
    
    function verify() {
        if ($scope.tempTrainReqs.RedTag === true) {
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
        } else if ($scope.tempTrainReqs.Other !== "") {
            return "valid";
        } else {
            return "invalid";
        }
    }
    function format() {      
        if ($scope.tempTrainReqs.Other !== "") {
            $scope.tempTrainReqs.cm_Other = true;
        } else {
            $scope.tempTrainReqs.cm_Other = false;
        }
    }
    
    $scope.check = function (state) {
        formInfo.setTrainReqsComplete(verify());
        //if(!gooddata)
        //  popup
        //else
        //  next
        format();
        formInfo.setppeinfo($scope.tempTrainReqs);
        $scope.next(state);
    };
    
});
