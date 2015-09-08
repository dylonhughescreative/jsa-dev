app.controller('NewElementCtrl', function ($scope, $ionicModal, formInfo) { 'use strict'; 
                                                                     
    // Create and load the Modal
  $ionicModal.fromTemplateUrl('./FormWizard/NewElements/new-task.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.taskModal = modal;
  });
                     
    $scope.tasks = [];
    // Called when the form is submitted
    $scope.createTask = function(task) {
      $scope.tasks.push({
        title: task.title
      });
      $scope.taskModal.hide();
      task.title = "";
    };
    
      // Open our new task modal
    $scope.newTask = function() {
      $scope.taskModal.show();
    };
  
    // Close the new task modal
    $scope.closeNewTask = function() {
      $scope.taskModal.hide();
    };
                                                                     
    $scope.check = function (state) {
        //formInfo.getcompletedElements().TaskStep1 = verify();
        //formInfo.getcompletedElements().TaskStep2 = verify();
        //formInfo.getcompletedElements().TaskStep3 = verify();
        //formInfo.getcompletedElements().TaskStep4 = verify();

        //formInfo.setgcinfo($scope.tempGCinfo);
        $scope.next(state);
    };
});