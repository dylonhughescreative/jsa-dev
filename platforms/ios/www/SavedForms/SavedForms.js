app.controller('SavedFormsCtrl', function ($scope, $state, $ionicSideMenuDelegate, $ionicPlatform, $localstorage, $rootScope, formInfo, savedForms, jsPdfBuilder) {
    'use strict';
    var savedFormsJs = this;
    savedFormsJs.formInfo = formInfo;
    savedFormsJs.saved = savedForms; 
    
    savedFormsJs.saved.formNames = $localstorage.getObject("RAK_SAVED_FORMS");
    savedFormsJs.saved.forms = [];
    for (var i = 0; i < savedFormsJs.saved.formNames.length; i++) {
        savedFormsJs.saved.forms.push($localstorage.getObject(savedFormsJs.saved.formNames[i]));
    }
    
    $rootScope.$on("$stateChangeSuccess", function () {
        savedFormsJs.saved.formNames = $localstorage.getObject("RAK_SAVED_FORMS");
        savedFormsJs.saved.forms = [];
        for (var i = 0; i < savedFormsJs.saved.formNames.length; i++) {
            savedFormsJs.saved.forms.push($localstorage.getObject(savedFormsJs.saved.formNames[i]));
        }
    });
    
    $scope.shouldEdit = false;
    $scope.EditText = "Edit";
    
    $scope.GoTo = function (state) {
        $localstorage.setObject("RAK_SAVED_FORMS", savedFormsJs.saved.formNames);
        $state.go(state);
    };
    
    $scope.EditToggle = function() {
        $scope.shouldEdit = !$scope.shouldEdit;
        if ($scope.shouldEdit)
            $scope.EditText = "Done";
        else
            $scope.EditText = "Edit";
    }
    
    $scope.Delete = function(index) {
        var name = savedFormsJs.saved.formNames[index];
        savedFormsJs.saved.formNames.splice(index, 1);
        $localstorage.removeObject(name);
        $localstorage.setObject("RAK_SAVED_FORMS", savedFormsJs.saved.formNames);
    }
    
    $scope.ShowInfoCard = function() {
        if (savedFormsJs.saved.formNames.length > 0)
            return false;
        else
            return true;
    }
    
    $scope.Load = function(name) {
        //savedFormsJs.formInfo = $localstorage.getObject(name);
        formInfo.setFormInfo($localstorage.getObject(name));
    }
});