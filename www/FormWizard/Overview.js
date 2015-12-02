app.controller('OverviewCtrl', function ($rootScope, $scope, $state, formInfo) {
    'use strict';
    var overviewState = this;
    overviewState.formInfo = formInfo;
    
    if (overviewState.formInfo.completedElements.BasicInfo === "valid" && 
        overviewState.formInfo.completedElements.PPEAssess === "valid" &&
        overviewState.formInfo.completedElements.JobElements === "valid" &&
        overviewState.formInfo.completedElements.TrainReqs === "valid" &&
        overviewState.formInfo.completedElements.LicReqs === "valid" &&
        overviewState.formInfo.completedElements.AreaConcerns === "valid" ) {
        overviewState.formInfo.formComplete = true;
    } else {
        overviewState.formInfo.formComplete = false;
    }
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        if (overviewState.formInfo.completedElements.BasicInfo === "valid" && 
            overviewState.formInfo.completedElements.PPEAssess === "valid" &&
            overviewState.formInfo.completedElements.JobElements === "valid" &&
            overviewState.formInfo.completedElements.TrainReqs === "valid" &&
            overviewState.formInfo.completedElements.LicReqs === "valid" &&
            overviewState.formInfo.completedElements.AreaConcerns === "valid" ) {
            overviewState.formInfo.formComplete = true;
        } else {
            overviewState.formInfo.formComplete = false;
        }
    });
    
    $scope.onclick = function(state) {
        $state.go(state);
    };
    
    $scope.GCorSub = function () {
        if (overviewState.formInfo.basicinfo.gcorsub != "") {
            $state.go(overviewState.formInfo.basicinfo.gcorsub);
        } else {
            $state.go("formWizard.GCorSub");
        }
    };
    
    $scope.verified = function () {
        //var so = cordova.plugins.screenorientation;
        //so.setOrientation('landscape');
        $state.go('verify');
    };
});