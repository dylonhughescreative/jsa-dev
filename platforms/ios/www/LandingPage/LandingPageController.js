app.controller('HomeCtrl', function ($scope, $state, $ionicSideMenuDelegate) {
    'use strict';
    $scope.GoTo = function (state) {
        $state.go(state);
    };
    
    angular.element(document).ready(function() {
        navigator.splashscreen.hide();
    }
    
    $scope.helpShow = false;
    
});