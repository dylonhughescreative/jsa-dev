app.controller('HomeCtrl', function ($scope, $state, $ionicSideMenuDelegate, $ionicView) {
    'use strict';
    $scope.GoTo = function (state) {
        $state.go(state);
    };
    
    $scope.$on('$ionicView.loaded', function($cordovaSplashscreen) {
        ionic.Platform.ready( function() {
            $cordovaSplashscreen.hide();
        });
    });
    
    $scope.helpShow = false;
    
});