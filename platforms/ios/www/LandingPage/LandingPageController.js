app.controller('HomeCtrl', function ($scope, $state, $ionicSideMenuDelegate, $cordovaSplashscreen, $ionicPlatform) {
    'use strict';
    $scope.GoTo = function (state) {
        $state.go(state);
    };
    
    $ionicPlatform.ready(function() {
        $cordovaSplashscreen.hide();
        $scope.$digest;
    });
    
    $scope.helpShow = false;
    
});