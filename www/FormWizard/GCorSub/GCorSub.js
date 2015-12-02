app.controller('GCorSub', function ($scope, $rootScope, formInfo) {
    'use strict';
    var gcorsubSelect = this;
    
    gcorsubSelect.formInfo = formInfo;
    
    $scope.onclick = function (state) {
        gcorsubSelect.formInfo.basicinfo.gcorsub = state;
        $scope.next(state);
    };
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        //$scope.completedElements = angular.copy(formInfo.getcompletedElements());
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.hide();
        }
    });
});