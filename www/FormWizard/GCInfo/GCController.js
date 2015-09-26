app.controller('GCinfoCtrl', function ($rootScope, $scope, formInfo) { 
    'use strict';
    $scope.basicinfo = { };
    
    $scope.basicinfo = angular.copy(formInfo.getBasicInfo());
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.completedElements = angular.copy(formInfo.getcompletedElements());
    });
    
    function verify() {
        if (angular.isUndefined($scope.basicinfo.username) || $scope.basicinfo.username === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.generalcontractor) || $scope.basicinfo.generalcontractor === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.gcsuperintendent) || $scope.basicinfo.gcsuperintendent === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.projectname) || $scope.basicinfo.projectname === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.startdate) || $scope.basicinfo.startdate === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.enddate) || $scope.basicinfo.enddate === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.jobscope) || $scope.basicinfo.jobscope === "") {
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
        formInfo.setBasicInfo($scope.basicinfo);
        $scope.next(state);
    };
});