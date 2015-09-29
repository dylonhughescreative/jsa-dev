app.controller('OverviewCtrl', function ($rootScope, $scope, $state, formInfo) {
    'use strict';
    
    $scope.formcomplete; 
    $scope.completedElements = angular.copy(formInfo.getcompletedElements());
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.completedElements = angular.copy(formInfo.getcompletedElements());
        if ($scope.completedElements.BasicInfo === "valid" && 
            $scope.completedElements.PPEAssess === "valid" &&
            $scope.completedElements.JobElements === "valid" &&
            $scope.completedElements.TrainReqs === "valid" &&
            $scope.completedElements.LicReqs === "valid" &&
            $scope.completedElements.AreaConcerns === "valid" ) {
            $scope.formcomplete = true;
        } else {
            $scope.formcomplete = true;
        }
    });
    
    $scope.onclick = function(state) {
        $state.go(state);
    };
    
    $scope.verified = function () {
        var so = cordova.plugins.screenorientation;
        so.setOrientation('landscape');
        $state.go('verify');
    };
});