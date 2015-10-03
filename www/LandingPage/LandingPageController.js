app.controller('HomeCtrl', function ($scope, $state, $ionicSideMenuDelegate) {
    'use strict';
    $scope.next = function (state) {
        $state.go(state);
    };
    
});