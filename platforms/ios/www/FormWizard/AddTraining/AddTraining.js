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

    var TrainingEditing = false;
    var EditingIndex = 0;
    
    // To close, use $ionicListDelegate.closeOptionButtons();
    $scope.TempTrainingInfo = { };
      // Open our new training modal
    $scope.newTraining = function() {
        TrainingEditing = false;
        $scope.TempTrainingInfo = {};
        $scope.AddTrainingModal.show();
    };
    
    $scope.editTraining = function(trn) {
        EditingIndex = $scope.Training.AddTraining.indexOf(trn);
        TrainingEditing = true;
        $scope.TempTrainingInfo = $scope.Training.AddTraining[EditingIndex];
        $ionicListDelegate.closeOptionButtons();
        $scope.AddTrainingModal.show();
    }
  
    // Close the new training modal
    $scope.closeTraining = function() {
        $scope.AddTrainingModal.hide();
    };
    
    $scope.AddToTraining = function(tempInfo) {
        if (!TrainingEditing) {
            // Add to array
            $scope.Training.AddTraining.push({
                    name: tempInfo.name,
                    date: tempInfo.date
                });
        } else {
            $scope.Training.AddTraining.splice(EditingIndex, 1, $scope.TempTrainingInfo);
        }
            
        // Reset temp info and hide.
        $scope.TempTrainingInfo = {};
        $scope.AddTrainingModal.hide();
        $scope.Training.None = false;
    };
    
    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }                                                                   
    
    $scope.checkchanged_none = function () {
        if($scope.Training.None === false) {
            $scope.Training.AddTraining = [];
        }
    };
    
    $scope.deleteTraining = function(trn) {
        $scope.Training.AddTraining.splice($scope.Training.AddTraining.indexOf(trn), 1);
        $ionicListDelegate.closeOptionButtons();
    }

});