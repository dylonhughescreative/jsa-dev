app.controller('HomeCtrl', function ($scope, $state, $ionicSideMenuDelegate) {
    'use strict';
    $scope.GoTo = function (state) {
        $state.go(state);
    };
    
    $scope.helpShow = false;
    
});