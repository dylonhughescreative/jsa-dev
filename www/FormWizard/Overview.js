app.controller('OverviewCtrl', function ($scope) {
    'use strict';
    $scope.onclick = function (state) {
        $scope.next(state);
    };
});