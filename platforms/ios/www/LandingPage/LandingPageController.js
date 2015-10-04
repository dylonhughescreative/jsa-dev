app.controller('HomeCtrl', function ($scope, $state, $ionicSideMenuDelegate, $cordovaSplashscreen) {
    'use strict';
    $scope.GoTo = function (state) {
        $state.go(state);
    };
    
    angular.element(document).ready(function() {
        $cordovaSplashscreen.hide();
    }
    
    $scope.helpShow = false;
    
});