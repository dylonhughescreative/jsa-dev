app.controller('OutboxCtrl', function ($scope, $state, $ionicSideMenuDelegate, $ionicPlatform, $ionicPopup, $localstorage, $cordovaFile, $cordovaFileTransfer, outbox) {
    'use strict';
    
    var outbox = outbox;
    $scope.pendingfiles = outbox.filenames;
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){
        if(!angular.isUndefined(outbox.filenames)) {         
            $scope.pendingfiles = outbox.filenames;
        }
    });
    
    $scope.shouldEdit = false;
    $scope.EditText = "Edit";
    
    $scope.GoTo = function (state) {
        $state.go(state);
    };
    
    $scope.EditToggle = function() {
        $scope.shouldEdit = !$scope.shouldEdit;
        if ($scope.shouldEdit)
            $scope.EditText = "Done";
        else
            $scope.EditText = "Edit";
    }
    
    $scope.upload = function (filename, index) {
        if(window.Connection) {
            if(navigator.connection.type != Connection.WIFI) {
                var confirmPopup = $ionicPopup.confirm({
                    title: "No Network Connection",
                    template: "JSA forms cannot be submited due to limited connectivity. Please resubmit from the outbox when a better connection is established."
                });
            }
        }
        
        var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = filename;
            options.chunkedMode = false;
            options.mimeType = "text/plain";
        var params = new Object();
            params.companyName = "bogus";
            params.username = "params";
            options.params = params;
    
        var url = "http://dylonhughes.com/uploads/upload.php",
            targetPath = cordova.file.documentsDirectory.concat(filename);
        
        $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            alert("success" + targetPath);
            alert(JSON.stringify(result.response));
            
            $cordovaFile.removeFile(cordova.file.documentsDirectory, filename);
            $scope.pendingfiles.splice(index, 1);
            $localstorage.setObject("outbox", $scope.pendingfiles);
            
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
            alert(JSON.stringify(err));      
        });
    }
});