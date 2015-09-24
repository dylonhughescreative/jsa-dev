app.controller('SigCtrl', function ($rootScope, $scope, $state, formInfo) {
    'use strict';
    
    $scope.signatures = angular.copy(formInfo.getSignatures());
    $scope.commitment = { };
    
    var canvas = document.getElementById('signatureCanvas'),
        signaturePad = new SignaturePad(canvas),
        stateController = angular.copy(formInfo.getStateController());
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.signatures = angular.copy(formInfo.getSignatures());
        stateController = angular.copy(formInfo.getStateController());
        $scope.commitment = { };
        $scope.clearCanvas();
    });   
    
    $scope.clearCanvas = function () {
        signaturePad.clear();
    }
    
    $scope.saveCanvas = function () {
        var sigImg = signaturePad.toDataURL("image/png", 1);
        $scope.commitment.signature = sigImg;
        $scope.signatures.push({
            name: $scope.commitment.name,
            date: $scope.commitment.date,
            signature: $scope.commitment.signature    
        });
        formInfo.setSignatures($scope.signatures);
        $state.go(stateController.nextstate);
    }
});