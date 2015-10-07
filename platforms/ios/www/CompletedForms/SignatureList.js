app.controller('SignatureListCtrl', function ($scope, $rootScope, formInfo, $state) {
    'use strict';
    
    var stateController = { };
    
    $scope.$on('$stateChangeStart', function(){
        $scope.signatures = angular.copy(formInfo.getSignatures());
    });
    
    $scope.showDelete = false;
    
    $scope.toggleDeleteShowing = function() {
        $scope.showDelete = !$scope.showDelete;
    }
    
    $scope.back = function() {
        $state.go('completedForm');
    }
    
    $scope.onclick = function (state) {
        stateController.nextstate = "completedForm";
        stateController.previoussate = "signatureList";
        formInfo.setStateController(stateController);
        $state.go(state);
    };
});