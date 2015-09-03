app.controller('GCinfoCtrl', function ($scope, formInfo) { 
    'use strict';
    $scope.tempGCinfo = { };
    
    $scope.tempGCinfo = angular.copy(formInfo.getgcinfo());
    
    function verify() {
        if (angular.isUndefined($scope.tempGCinfo.projectname) || $scope.tempGCinfo.projectname === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.tempGCinfo.basicinfodate) || $scope.tempGCinfo.basicinfodate === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.tempGCinfo.subcontractor) || $scope.tempGCinfo.subcontractor === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.tempGCinfo.generalcontractor) || $scope.tempGCinfo.generalcontractor === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.tempGCinfo.crewleader) || $scope.tempGCinfo.crewleader === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.tempGCinfo.sitesuperintendent) || $scope.tempGCinfo.sitesuperintendent === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.tempGCinfo.jobscope) || $scope.tempGCinfo.jobscope === "") {
            return "invalid";
        } else {
            return "valid";
        }
    }
    
    $scope.check = function (state) {
        formInfo.getcompletedElements().BasicInfo = verify();
        //if(!gooddata)
        //  popup
        //else
        //  next
        formInfo.setgcinfo($scope.tempGCinfo);
        $scope.next(state);
    };
});