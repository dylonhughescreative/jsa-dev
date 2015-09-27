app.controller('SigCtrl', function ($rootScope, $scope, $state, $window, formInfo) {
    'use strict';
    
    $scope.signatures = angular.copy(formInfo.getSignatures());
    $scope.commitment = { };
    
    $scope.sigCanvas = {
        scroll: 'false',
        width: $window.innerWidth - $window.innerWidth*0.02,
        height: $window.innerHeight * 0.2
    };
    
    var canvas = document.getElementById('signatureCanvas'),
        signaturePad = new SignaturePad(canvas),
        stateController = angular.copy(formInfo.getStateController());
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.signatures = angular.copy(formInfo.getSignatures());
        stateController = angular.copy(formInfo.getStateController());
        $scope.commitment = { };
        $scope.clearCanvas();
        $scope.sigCanvas = $window.width;
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
    
    function refresh() {
        $scope.sigCanvas.width = $window.innerWidth - $window.innerWidth*0.02;
        $scope.sigCanvas.height = $window.innerHeight * 0.2;
        $scope.$apply();
    }
    angular.element($window).bind('resize', refresh);
});