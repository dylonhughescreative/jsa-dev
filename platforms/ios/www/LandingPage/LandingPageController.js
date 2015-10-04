app.controller('HomeCtrl', function ($scope, $state, $ionicSideMenuDelegate, $cordovaSplashscreen, $ionicPlatform) {
    'use strict';
    $scope.GoTo = function (state) {
        $state.go(state);
    };
    
    $ionicPlatform.ready(function() {
        setTimeout(function() {
            $cordovaSplashscreen.hide();
            $scope.$digest;
        }, 2000);
    });
    
    $scope.helpShow = false;
    
});