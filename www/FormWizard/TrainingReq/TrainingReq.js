app.controller('TrainReqCtrl', function ($rootScope, $scope, formInfo) {
    'use strict';
    
    $scope.tempTrainReqs = angular.copy(formInfo.getTrainReqs());
    
    var defaultTrainReqs = {
            None: false,
            RedTag: false,
            ConfinedSpace: false,
            Scaffold: false,
            FireWatch: false,
            AerialLift: false,
            DriverSafety: false,
            Flagger: false,
            SWP: false,
            SPO: false,
            Rigger: false,
            ForkLift: false,
            cm_Other: false,
            tb_Other: ''
        }
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.tempTrainReqs = angular.copy(formInfo.getTrainReqs());
    });
    
    function verify() {
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
        formInfo.setTrainReqs($scope.tempTrainReqs);
        $scope.next(state);
    };
    
    $scope.checkchanged = function () {
        $scope.tempTrainReqs.None = false;
    };
    
    $scope.otherTextChanged = function () {
        if($scope.tempTrainReqs.tb_Other != "") {
            $scope.tempTrainReqs.None = false;
        }
    };
    
    $scope.checkchanged_none = function () {
        if($scope.tempTrainReqs.None === false) {
            $scope.tempTrainReqs = angular.copy(defaultTrainReqs);
        }
    };
});
