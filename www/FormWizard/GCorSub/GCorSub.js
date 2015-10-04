app.controller('GCorSub', function ($scope, $rootScope, formInfo) {
    'use strict';
    $scope.onclick = function (state) {
        var BasicInfo = formInfo.getBasicInfo();
        BasicInfo.gcorsub = state;
        formInfo.setBasicInfo(BasicInfo);
        $scope.next(state);
    };
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.completedElements = angular.copy(formInfo.getcompletedElements());
        if (window.cordova && window.cordova.plugins.Keyboard) {
            //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.hide();
        }
    });
});