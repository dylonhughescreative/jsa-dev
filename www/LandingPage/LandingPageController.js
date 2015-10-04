app.controller('HomeCtrl', function ($scope, $state, $ionicSideMenuDelegate, $ionicView) {
    'use strict';
    $scope.GoTo = function (state) {
        $state.go(state);
    };
    
    $scope.$on('$ionicView.loaded', function() {
        ionic.Platform.ready( function() {
            if (navigator && navigator.splashscreen)
                navigator.splashscreen.hide();
        });
    });
    
    $scope.helpShow = false;
    
});