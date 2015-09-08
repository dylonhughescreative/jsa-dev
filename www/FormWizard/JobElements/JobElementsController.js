app.controller('JobElementCtrl', function ($scope, $ionicModal, $state, formInfo) { 'use strict'; 
                                                                     
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
      $scope.groups.push({
        name: task.title,
        items: []
      });
      for (var j=1; j<4; j++) {
        $scope.groups[$scope.groups.length - 1].items.push($scope.groups.length-1 + '-' + j);
      }
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
                                                                                     
    $scope.groups = [];
    //for (var i=0; i<4; i++) {
    //  $scope.groups[i] = {
    //    name: i+1,
    //    items: []
    //  };
    //  for (var j=1; j<4; j++) {
    //    $scope.groups[i].items.push(i+1 + '-' + j);
    //  }
    //}
    
    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };
});