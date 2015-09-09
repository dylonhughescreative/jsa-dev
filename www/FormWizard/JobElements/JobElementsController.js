app.controller('JobElementCtrl', function ($scope, $ionicModal, $state, formInfo) { 'use strict'; 
                                                                     
    // Create and load the Modal
    $ionicModal.fromTemplateUrl('./FormWizard/JobElements/new-job-element.html', {
      id: "1",
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.jobElementModal = modal;
    });
    $scope.jobElement = {};
    $scope.groups = [];
    $scope.editing = false;
    $scope.groupIndex = 0;
    $scope.ModalHeaderText = "";
    $scope.ModalButtonText = "";
    $scope.numberList = [
        {title: "One Task Required", number: 1},
        {title: "Two Tasks Required", number: 2},
        {title: "Three Tasks Required", number: 3},
    ];
    // Called when the form is submitted
    $scope.createTask = function(jobElement) {
        if (!$scope.editing) {
            $scope.groups.push({
              name: jobElement.title,
              items: []
            });
            for (var j=1; j<jobElement.number+1; j++) {
              //$scope.groups[$scope.groups.length - 1].items.push($scope.groups.length-1 + '- Task #' + j);
                if (j == 1)
                    $scope.groups[$scope.groups.length - 1].items.push(jobElement.task1);
                if (j == 2)
                    $scope.groups[$scope.groups.length - 1].items.push(jobElement.task2);
                if (j == 3)
                    $scope.groups[$scope.groups.length - 1].items.push(jobElement.task3);
            }
        } else {
            $scope.groups.splice($scope.groupIndex, 1, {
                name: jobElement.title,
                items: []
            });
            for (var j=1; j<jobElement.number+1; j++) {
              //$scope.groups[$scope.groups.length - 1].items.push($scope.groups.length-1 + '- Task #' + j);
                if (j == 1)
                    $scope.groups[$scope.groupIndex].items.push(jobElement.task1);
                if (j == 2)
                    $scope.groups[$scope.groupIndex].items.push(jobElement.task2);
                if (j == 3)
                    $scope.groups[$scope.groupIndex].items.push(jobElement.task3);
            }
        }
        $scope.jobElement = {};
        $scope.editing = false;
        $scope.jobElementModal.hide();
    };
      // Open our new task modal
    $scope.newTask = function() {
        $scope.ModalHeaderText = "New Job Element";
        $scope.ModalButtonText = "Create Job Element";
        $scope.jobElementModal.show();
    };
  
    // Close the new task modal
    $scope.closeNewTask = function() {
      $scope.jobElementModal.hide();
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
        //formInfo.getcompletedElements().TaskStep1 = verify();
        //formInfo.getcompletedElements().TaskStep2 = verify();
        //formInfo.getcompletedElements().TaskStep3 = verify();
        //formInfo.getcompletedElements().TaskStep4 = verify();

        //formInfo.setgcinfo($scope.tempGCinfo);
        $scope.next(state);
    };
    //for (var i=0; i<4; i++) {
    //  $scope.groups[i] = {
    //    name: i+1,
    //    items: []
    //  };
    //  for (var j=1; j<4; j++) {
    //    $scope.groups[i].items.push(i+1 + '-' + j);
    //  }
    //}
    $scope.openJobElement = function(group) {
        $scope.ModalHeaderText = "Edit Job Element";
        $scope.ModalButtonText = "Save Element";
        $scope.editing = true;
        for (var j = 0; j < $scope.groups.length; j++) {
            if (group === $scope.groups[j])
                $scope.groupIndex = j;
        }
        $scope.jobElement.title = group.name;
        $scope.jobElement.number = group.items.length;
        if (group.items.length > 0)
            $scope.jobElement.task1 = group.items[0];
        if (group.items.length > 1)
            $scope.jobElement.task2 = group.items[1];
        if (group.items.length > 2)
            $scope.jobElement.task3 = group.items[2];
        $scope.jobElementModal.show();
    }
    
    $scope.deleteGroup = function(group) {
        var index = null;
        for(var i=0; i < $scope.groups.length; i++) {
            if ($scope.groups[i] === group)
                index = i;
        }
        if (index != null)
            $scope.groups.splice(index, 1);
    }
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