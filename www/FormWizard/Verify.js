app.controller('VerifyCtrl', function ($rootScope, $scope, $state, formInfo) {
    'use strict';
    
    $scope.ppeinfo = angular.copy(formInfo.getppeinfo());
    $scope.gcinfo = angular.copy(formInfo.getgcinfo());
    $scope.subinfo = angular.copy(formInfo.getgcinfo());
    $scope.jobelement1 = {};
    $scope.jobelement2 = {};
    $scope.jobelement3 = {};
    $scope.jobelement4 = {};
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.ppeinfo = angular.copy(formInfo.getppeinfo());
        $scope.gcinfo = angular.copy(formInfo.getgcinfo());
        $scope.subinfo = angular.copy(formInfo.getgcinfo());
    });
    
    $scope.back = function () {
        var so = cordova.plugins.screenorientation;
        so.setOrientation('unlocked');
        $state.go('overview');
    };
});