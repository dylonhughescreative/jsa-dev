app.controller('HomeCtrl', function ($scope, $state, $ionicSideMenuDelegate, $cordovaSplashscreen) {
    'use strict';
    $scope.GoTo = function (state) {
        $state.go(state);
    };
    
    document.addEventListener("deviceready", function () {
        $cordovaSplashscreen.hide();
    });
    
    $scope.helpShow = false;
    
});