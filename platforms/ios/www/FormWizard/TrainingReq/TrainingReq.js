app.controller('TrainReqCtrl', function ($rootScope, $scope, formInfo) {
    'use strict';
    
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
