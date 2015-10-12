app.controller('SavedFormsCtrl', function ($scope, $state, $ionicSideMenuDelegate, $ionicPlatform, formInfo, savedForms, jsPdfBuilder) {
    'use strict';
    var savedFormsJs = this;
    savedFormsJs.formInfo = formInfo;
    savedFormsJs.saved = savedForms;
    
    $scope.shouldEdit = false;
    $scope.EditText = "Edit";
    
    $scope.GoTo = function (state) {
        $state.go(state);
    };
    
    $scope.EditToggle = function() {
        $scope.shouldEdit = !$scope.shouldEdit;
        if ($scope.shouldEdit)
            $scope.EditText = "Done";
        else
            $scope.EditText = "Edit";
    }
});