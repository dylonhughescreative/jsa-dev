app.controller('OverviewCtrl', function ($rootScope, $scope, $state, formInfo) {
    'use strict';
    
    $scope.formcomplete; 
    $scope.completedElements = angular.copy(formInfo.getcompletedElements());
    var GCorSub = formInfo.getBasicInfo().gcorsub;
    
    if ($scope.completedElements.BasicInfo === "valid" && 
        $scope.completedElements.PPEAssess === "valid" &&
        $scope.completedElements.JobElements === "valid" &&
        $scope.completedElements.TrainReqs === "valid" &&
        $scope.completedElements.LicReqs === "valid" &&
        $scope.completedElements.AreaConcerns === "valid" ) {
        $scope.formcomplete = true;
    } else {
        $scope.formcomplete = false;
    }
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        GCorSub = formInfo.getBasicInfo().gcorsub;
        $scope.completedElements = angular.copy(formInfo.getcompletedElements());
        if ($scope.completedElements.BasicInfo === "valid" && 
            $scope.completedElements.PPEAssess === "valid" &&
            $scope.completedElements.JobElements === "valid" &&
            $scope.completedElements.TrainReqs === "valid" &&
            $scope.completedElements.LicReqs === "valid" &&
            $scope.completedElements.AreaConcerns === "valid" ) {
            $scope.formcomplete = true;
        } else {
            $scope.formcomplete = false;
        }
    });
    
    $scope.onclick = function(state) {
        $state.go(state);
    };
    
    $scope.GCorSub = function () {
        if (GCorSub != "") {
            $state.go(GCorSub);
        } else {
            $state.go("formWizard.GCorSub");
        }
    };
    
    $scope.verified = function () {
        var so = cordova.plugins.screenorientation;
        so.setOrientation('landscape');
        $state.go('verify');
    };
});