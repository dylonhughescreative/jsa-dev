app.controller('TrainReqCtrl', function ($rootScope, $scope, formInfo) {
    'use strict';
    var trainReqState = this;
    trainReqState.formInfo = formInfo;
    
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
        trainReqState.formInfo.trainReqs.None = false;
    };
    
    $scope.otherTextChanged = function () {
        if(trainReqState.formInfo.trainReqs.tb_Other != "") {
            trainReqState.formInfo.trainReqs.None = false;
        }
    };
    
    $scope.checkchanged_none = function () {
        if(trainReqState.formInfo.trainReqs.None === false) {
            trainReqState.formInfo.trainReqs = angular.copy(defaultTrainReqs);
        }
    };
});
