app.controller('VerifyCtrl', function ($rootScope, $scope, $state, formInfo) {
    'use strict';
    
    $scope.formcomplete; 
    $scope.completedElements = angular.copy(formInfo.getcompletedElements());
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.completedElements = angular.copy(formInfo.getcompletedElements());
        if($scope.completedElements.BasicInfo === "valid" && 
           $scope.completedElements.PPEAssess === "valid") {
            $scope.formcomplete = true;
        } else {
            $scope.formcomplete = false;
        }
    });
});