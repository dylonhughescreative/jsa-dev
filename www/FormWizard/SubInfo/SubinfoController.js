app.controller('SubinfoCtrl', function ($rootScope, $scope, formInfo) { 
    'use strict';
    
    $scope.basicinfo = angular.copy(formInfo.getBasicInfo());
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.completedElements = angular.copy(formInfo.getcompletedElements());
        $scope.basicinfo = angular.copy(formInfo.getBasicInfo());
    });
    
    function verify() {
        if (angular.isUndefined($scope.basicinfo.username) || $scope.basicinfo.username === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.subcontractor) || $scope.basicinfo.subcontractor === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.sitesupervisor) || $scope.basicinfo.sitesupervisor === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.generalcontractor) || $scope.basicinfo.generalcontractor === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.gcsuperintendent) || $scope.basicinfo.gcsuperintendent === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.projectname) || $scope.basicinfo.projectname === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.basicinfostartdate) || $scope.basicinfo.basicinfostartdate === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.basicinfoenddate) || $scope.basicinfo.basicinfoenddate === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.jobscope) || $scope.basicinfo.jobscope === "") {
            return "invalid";
        } else {
            return "valid";
        }
    }
    
    $scope.check = function (state) {
        formInfo.setBasicInfocomplete(verify());
        //if(!gooddata)
        //  popup
        //else
        //  next
        formInfo.setgcinfo($scope.tempGCinfo);
        $scope.next(state);
    };
});