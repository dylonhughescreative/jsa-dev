app.controller('VerifyCtrl', function ($rootScope, $scope, $state, formInfo, jsPdfBuilder) {
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
    
    $scope.back = function () {
        var so = cordova.plugins.screenorientation;
        so.setOrientation('unlocked');
        $state.go('overview');
    };
    
    $scope.onclick = function(state) {
        stateController.nextstate = "completedForm";
        stateController.previoussate = "verify";
        formInfo.setStateController(stateController);
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