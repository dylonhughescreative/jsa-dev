app.controller('GCorSub', function ($scope, formInfo) {
    'use strict';
    $scope.onclick = function (state) {
        var BasicInfo = formInfo.getBasicInfo();
        BasicInfo.gcorsub = state;
        formInfo.setBasicInfo(BasicInfo);
        $scope.next(state);
    };
});