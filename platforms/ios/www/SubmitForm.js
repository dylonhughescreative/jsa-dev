app.controller('SubmitFormCtrl', function ($rootScope, $scope, $state, $ionicActionSheet, $ionicModal, $window, $document, formInfo, jsPdfBuilder) {
    'use strict';
    $scope.signatures = angular.copy(formInfo.getSignatures());
    
    $scope.showDelete = false;
    
    $scope.toggleDeleteShowing = function() {
        $scope.showDelete = !$scope.showDelete;
    }
    
    $scope.back = function() {
        var so = cordova.plugins.screenorientation;
        so.setOrientation('landscape');
        $state.go('completedForm');
    }
    
    $scope.uploadFile = function () {
        $state.go('home');
        //jsPdfBuilder.createPdf();
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