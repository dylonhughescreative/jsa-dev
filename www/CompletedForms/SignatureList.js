app.controller('SignatureListCtrl', function ($scope, $rootScope, formInfo, $state) {
    'use strict';
    
    var stateController = { };
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.signatures = angular.copy(formInfo.getSignatures());
    });
    
    $scope.onclick = function (state) {
        stateController.nextstate = "completedForm";
        stateController.previoussate = "signatureList";
        formInfo.setStateController(stateController);
        $state.go(state);
    };
});