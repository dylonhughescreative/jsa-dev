app.controller('VerifyCtrl', function ($rootScope, $scope, $state, formInfo, jsPdfBuilder) {
    'use strict';
    
    $scope.ppeinfo = angular.copy(formInfo.getppeinfo());
    $scope.gcinfo = angular.copy(formInfo.getgcinfo());
    $scope.subinfo = angular.copy(formInfo.getgcinfo());
    $scope.jobelements = angular.copy(formInfo.getjobelements());
    $scope.signature = {};
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.ppeinfo = angular.copy(formInfo.getppeinfo());
        $scope.gcinfo = angular.copy(formInfo.getgcinfo());
        $scope.subinfo = angular.copy(formInfo.getgcinfo());
        $scope.jobelements = angular.copy(formInfo.getjobelements());
        $scope.signature = angular.copy(formInfo.getSignatures());
    });
    
    $scope.back = function () {
        var so = cordova.plugins.screenorientation;
        so.setOrientation('unlocked');
        $state.go('overview');
    };
    
    $scope.onclick = function(state) {
        $state.go(state);
    };
    
    $scope.uploadFile = function () {
        jsPdfBuilder.createPdf();
        //var url = "http://dylonhughes.com/uploads/upload.php",
        ////target path may be local or url
        //filename = "JSA_Form.pdf",
        //targetPath = cordova.file.documentsDirectory.concat(filename);
        ////var filename = targetPath.split("/").pop();
        //var options = {
        //    fileKey: "file",
        //    fileName: filename,
        //    chunkedMode: false,
        //    mimeType: "text/plain"
        //};
        //$cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
        //    console.log("SUCCESS: " + JSON.stringify(result.response));
        //    alert("success" + targetPath);
        //    alert(JSON.stringify(result.response));
        //}, function(err) {
        //    console.log("ERROR: " + JSON.stringify(err));
        //    alert(JSON.stringify(err));
        //});
    };
});