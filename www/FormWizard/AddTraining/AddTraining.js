app.controller('AddTrainingCtrl', function ($scope, $ionicModal, $state, $rootScope, $ionicListDelegate, formInfo) {
    'use strict';        
    // Create and load the Modal
    $ionicModal.fromTemplateUrl('./FormWizard/AddTraining/new-AddTraining.html', {
        id: "1",
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.AddTrainingModal = modal;
    });

    $scope.TrainingNone = false;
    var TrainingEditing = false;
    var EditingIndex = 0;
    
    // To close, use $ionicListDelegate.closeOptionButtons();
    $scope.Training = [
        {name:"Example Text 1 ", date:"09/24/15"},
        {name:"Example Text 2 ", date:"09/25/15"},
        {name:"Example Text 3 ", date:"09/26/15"},
        {name:"Example Text 4 ", date:"09/27/15"}
    ];
    $scope.TempTrainingInfo = {
    };
      // Open our new training modal
    $scope.newTraining = function() {
        TrainingEditing = false;
        $scope.TempTrainingInfo = {};
        $scope.AddTrainingModal.show();
    };
    
    $scope.editTraining = function(trn) {
        EditingIndex = $scope.Training.indexOf(trn);
        TrainingEditing = true;
        $scope.TempTrainingInfo = $scope.Training[EditingIndex];
        $ionicListDelegate.closeOptionButtons();
        $scope.AddTrainingModal.show();
    }
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.Training = angular.copy(formInfo.getAddTraining());
    });
  
    // Close the new training modal
    $scope.closeTraining = function() {
        $scope.AddTrainingModal.hide();
    };
    
    $scope.AddToTraining = function(tempInfo) {
        if (!TrainingEditing) {
            // Add to array
            $scope.Training.push({
                    name: tempInfo.name,
                    date: tempInfo.date
                });
        } else {
            $scope.Training.splice(EditingIndex, 1, $scope.TempTrainingInfo);
        }
            
        // Reset temp info and hide.
        $scope.TempTrainingInfo = {};
        $scope.AddTrainingModal.hide();
        $scope.TrainingNone = false;
    };
    
    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }
    
    function verify () {
        if($scope.TrainingNone === true || $scope.Training.length > 0) {
            return "valid";
        } else {
            return "invalid";
        }
    }
                                                                     
    $scope.check = function (state) {
        formInfo.setAddTrainingComplete(verify());
        formInfo.setAddTraining($scope.Training);
        $scope.next(state);
    };
    
    $scope.checkchanged_none = function () {
        if($scope.TrainingNone === false) {
            $scope.Training = [];
        }
    };
    
    $scope.deleteTraining = function(trn) {
        $scope.Training.splice($scope.Training.indexOf(trn), 1);
        $ionicListDelegate.closeOptionButtons();
    }

});