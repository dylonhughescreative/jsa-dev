app.controller('SigCtrl', function ($rootScope, $scope, $state, formInfo) {
    'use strict';
    
    var canvas = document.getElementById('signatureCanvas');
    var signaturePad = new SignaturePad(canvas);
    
    $scope.clearCanvas = function () {
        signaturePad.clear();
    }
    
    $scope.saveCanvas = function () {
        var sigImg = signaturePad.toDataURL("image/png", 1);
        $scope.signature = sigImg;
        formInfo.setSignatures($scope.signature);
    }
});