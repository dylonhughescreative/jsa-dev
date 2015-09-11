app.controller('GCinfoCtrl', function ($rootScope, $scope, formInfo) { 
    'use strict';
    $scope.tempGCinfo = { };
    
    $scope.tempGCinfo = angular.copy(formInfo.getgcinfo());
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.completedElements = angular.copy(formInfo.getcompletedElements());
    });
    
    function verify() {
        if (angular.isUndefined($scope.tempGCinfo.username) || $scope.tempGCinfo.username === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.tempGCinfo.generalcontractor) || $scope.tempGCinfo.generalcontractor === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.tempGCinfo.gcsuperintendent) || $scope.tempGCinfo.gcsuperintendent === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.tempGCinfo.projectname) || $scope.tempGCinfo.projectname === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.tempGCinfo.basicinfostartdate) || $scope.tempGCinfo.basicinfostartdate === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.tempGCinfo.basicinfoenddate) || $scope.tempGCinfo.basicinfoenddate === "") {
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