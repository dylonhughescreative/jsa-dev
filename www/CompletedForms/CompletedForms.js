app.controller('CompletedFormsCtrl', function ($rootScope, $scope, $state, formInfo, jsPdfBuilder) {
    'use strict';
    
    $scope.basicinfo = angular.copy(formInfo.getBasicInfo());
    $scope.ppeinfo = angular.copy(formInfo.getppeinfo());
    $scope.jobelements = angular.copy(formInfo.getjobelements());
    $scope.trainReqs = angular.copy(formInfo.getTrainReqs());
    $scope.licReqs = angular.copy(formInfo.getLicReqs());
    $scope.areaConcerns = angular.copy(formInfo.getAreaConcerns());
    $scope.addTraining = angular.copy(formInfo.getAddTraining());
    $scope.signatures = angular.copy(formInfo.getSignatures());
    
    var stateController = { };
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.basicinfo = angular.copy(formInfo.getBasicInfo());
        $scope.ppeinfo = angular.copy(formInfo.getppeinfo());
        $scope.jobelements = angular.copy(formInfo.getjobelements());
        $scope.trainReqs = angular.copy(formInfo.getTrainReqs());
        $scope.licReqs = angular.copy(formInfo.getLicReqs());
        $scope.areaConcerns = angular.copy(formInfo.getAreaConcerns());
        $scope.addTraining = angular.copy(formInfo.getAddTraining());
        $scope.signatures = angular.copy(formInfo.getSignatures());
    });
    
    $scope.onclick = function(state) {
        stateController.nextstate = "signatureList";
        stateController.previoussate = "completedForm";
        formInfo.setStateController(stateController);
        $state.go(state);
    };
});