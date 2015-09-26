app.controller('AddTrainingCtrl', function ($scope, $ionicModal, $state, $rootScope, formInfo) {
    'use strict';        
    // Create and load the Modal
    $ionicModal.fromTemplateUrl('./FormWizard/AddTraining/new-AddTraining.html', {
        id: "1",
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.AddTrainingModal = modal;
    });

    // To close, use $ionicListDelegate.closeOptionButtons();
    $scope.Training = [
        {name:"Example Text 1 ", date:"09/24/15"},
        {name:"Example Text 2 ", date:"09/25/15"},
        {name:"Example Text 3 ", date:"09/26/15"},
        {name:"Example Text 4 ", date:"09/27/15"}
    ];
    $scope.TempTrainingInfo = {
        None: false
    };
      // Open our new training modal
    $scope.newTraining = function() {
        $scope.AddTrainingModal.show();
    };
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.Training = angular.copy(formInfo.getAddTraining());
    });
  
    // Close the new training modal
    $scope.closeTraining = function() {
        $scope.AddTrainingModal.hide();
    };
    
    $scope.AddToTraining = function(tempInfo) {
        // Add to array
        $scope.Training.push({
                name: tempInfo.name,
                date: tempInfo.date
            });
        // Reset temp info and hide.
        $scope.TempTrainingInfo = {};
        $scope.AddTrainingModal.hide();
        $scope.TempTrainingInfo.None = false;
    };
    
    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }
                                                                     
    $scope.check = function (state) {
        formInfo.setAddTraining($scope.Training);
        $scope.next(state);
    };
    
    $scope.checkchanged_none = function () {
        if($scope.TempTrainingInfo.None === false) {
            $scope.Training = [];
        }
    };

});