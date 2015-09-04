app.controller('OverviewCtrl', function ($rootScope, $scope, $state, formInfo) {
    'use strict';
    $scope.completedElements = angular.copy(formInfo.getcompletedElements());
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.completedElements = angular.copy(formInfo.getcompletedElements());
    });
    
    $scope.onclick = function (state) {
        $state.go(state);
    };
});