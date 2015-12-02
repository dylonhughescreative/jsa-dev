app.directive('stopEvent', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if(attr && attr.stopEvent)
                    element.bind(attr.stopEvent, function (e) {
                        e.stopPropagation();
                    });
            }
        };
     });

app.controller('JobElementCtrl', function ($scope, $ionicModal, $state, $rootScope, $ionicListDelegate, formInfo) {'use strict'; 
    var jobElementsState = this;
    jobElementsState.formInfo = formInfo;
    // Create and load the Modal
    $ionicModal.fromTemplateUrl('./FormWizard/JobElements/new-job-element.html', {
        id: "1",
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.jobElementModal = modal;
    });
    $ionicModal.fromTemplateUrl('./FormWizard/JobElements/new-task.html', {
        id: "2",
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.TaskModal = modal;
    });
    $scope.jobElement = {};
    $scope.TempTask = {};
    $scope.editing = false;
    $scope.groupIndex = 0;
    $scope.TaskIndex = 0;
    $scope.ModalHeaderText = "";
    $scope.ModalButtonText = "";
    $scope.reorderShowing = false;
    $scope.numberList = [
        {title: "1 Task ", number: 1},
        {title: "2 Tasks", number: 2},
        {title: "3 Tasks", number: 3}
    ];
                                                                                   
    // Called when the form is submitted
    $scope.createTask = function (jobElement) {
        if (!$scope.editing) {
            jobElementsState.formInfo.jobelements.push({
                name: jobElement.title,
                tasks: []
            });
            for (var j=1; j<jobElement.number+1; j++) {
              //jobElementsState.formInfo.jobelements[jobElementsState.formInfo.jobelements.length - 1].tasks.push(jobElementsState.formInfo.jobelements.length-1 + '- Task #' + j);
                if (j == 1)
                    jobElementsState.formInfo.jobelements[jobElementsState.formInfo.jobelements.length - 1].tasks.push(jobElement.task1);
                if (j == 2)
                    jobElementsState.formInfo.jobelements[jobElementsState.formInfo.jobelements.length - 1].tasks.push(jobElement.task2);
                if (j == 3)
                    jobElementsState.formInfo.jobelements[jobElementsState.formInfo.jobelements.length - 1].tasks.push(jobElement.task3);
            }
        } else {
            jobElementsState.formInfo.jobelements.splice($scope.groupIndex, 1, {
                name: jobElement.title,
                tasks: []
            });
            for (var j=1; j<jobElement.number+1; j++) {
              //jobElementsState.formInfo.jobelements[jobElementsState.formInfo.jobelements.length - 1].tasks.push(jobElementsState.formInfo.jobelements.length-1 + '- Task #' + j);
                if (j == 1)
                    jobElementsState.formInfo.jobelements[$scope.groupIndex].tasks.push(jobElement.task1);
                if (j == 2)
                    jobElementsState.formInfo.jobelements[$scope.groupIndex].tasks.push(jobElement.task2);
                if (j == 3)
                    jobElementsState.formInfo.jobelements[$scope.groupIndex].tasks.push(jobElement.task3);
            }
        }
        $scope.jobElement = { number: 1,
                              task1: {}
                            };
        $scope.editing = false;
        $scope.jobElementModal.hide();
        if ($scope.editing)
            $scope.toggleGroup(jobElementsState.formInfo.jobelements[$scope.groupIndex]);
        else
            $scope.toggleGroup(jobElementsState.formInfo.jobelements[jobElementsState.formInfo.jobelements.length - 1]);
    };
      // Open our new task modal
    $scope.newTask = function() {
        $scope.jobElement = { number: 1,
                              task1: {} };
        $scope.ModalHeaderText = "New Job Element";
        $scope.ModalButtonText = "Create Job Element";
        $scope.jobElementModal.show();
    };
  
    // Close the new task modal
    $scope.closeNewTask = function() {
        if (!$scope.editing)
            $scope.jobElement = { number: 1,
                                  task1: {}};
        $scope.jobElementModal.hide();
        $scope.editing = false;
    };
                                                                                   
    $scope.checkModal = function() {
        if (($scope.jobElement.title !== "" && $scope.jobElement.title != null) 
                && ($scope.jobElement.task1.title !== '' && $scope.jobElement.task1.title != null)
                && ($scope.jobElement.task1.hazards !== '' && $scope.jobElement.task1.hazards != null)
                && ($scope.jobElement.task1.control !== '' && $scope.jobElement.task1.control != null))
                //&& ($scope.jobElement.task1.control !== '' && $scope.jobElement.task1.control != null) 
                //&& ($scope.jobElement.task1.hazards !== '' && $scope.jobElement.task1.hazards != null))
            return true;
        else
            return false;
    }
    
    $scope.checkTaskModal = function() {
        if ($scope.TempTask != null && $scope.TempTask.title != null && $scope.TempTask.hazards != null && $scope.TempTask.control != null
             && $scope.TempTask.title !== '' && $scope.TempTask.hazards !== '' && $scope.TempTask.control !== '')
            return true;
        else
            return false;
    }
    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }

    $scope.openJobElement = function(group, $event) {
        event.stopPropagation();
        $scope.ModalHeaderText = "Edit Job Element";
        $scope.ModalButtonText = "Save Element";
        $scope.editing = true;
        for (var j = 0; j < jobElementsState.formInfo.jobelements.length; j++) {
            if (group === jobElementsState.formInfo.jobelements[j])
                $scope.groupIndex = j;
        }
        $scope.jobElement.title = group.name;
        $scope.jobElement.number = group.tasks.length;
        if (group.tasks.length <= 0)
            $scope.jobElement.number = 1;
        if (group.tasks.length > 0)
            $scope.jobElement.task1 = group.tasks[0];
        if (group.tasks.length > 1)
            $scope.jobElement.task2 = group.tasks[1];
        if (group.tasks.length > 2)
            $scope.jobElement.task3 = group.tasks[2];
        $ionicListDelegate.closeOptionButtons();
        $scope.shownGroup = null;
        $scope.jobElementModal.show();
    }
    
    $scope.openTaskModal = function(group, item) {
        for (var j = 0; j < jobElementsState.formInfo.jobelements.length; j++) {
            if (group === jobElementsState.formInfo.jobelements[j])
                $scope.groupIndex = j;
        }
        for (var i = 0; i < jobElementsState.formInfo.jobelements[$scope.groupIndex].tasks.length; i++) {
            if (item == jobElementsState.formInfo.jobelements[$scope.groupIndex].tasks[i])
                $scope.TaskIndex = i;
        }
        $scope.TempTask = jobElementsState.formInfo.jobelements[$scope.groupIndex].tasks[$scope.TaskIndex];
        $scope.TaskModal.show();
    }
    
    $scope.closeTaskModal = function() {
        $scope.TaskModal.hide();
    }
    
    $scope.toggleReorder = function() {
        $scope.shownGroup = null;
        $scope.reorderShowing = !$scope.reorderShowing;
    }
    
    $scope.submitTaskChange = function() {
        jobElementsState.formInfo.jobelements[$scope.groupIndex].tasks.splice($scope.TaskIndex, 1, $scope.TempTask);
        $scope.TaskModal.hide();
    }
    
    $scope.deleteItem = function(group) {
        $scope.shownGroup = null;
        jobElementsState.formInfo.jobelements.splice(jobElementsState.formInfo.jobelements.indexOf(group), 1);
        $ionicListDelegate.closeOptionButtons();
    }

    $scope.deleteTask = function(group, task) {
        var idx = jobElementsState.formInfo.jobelements.indexOf(group);
        jobElementsState.formInfo.jobelements[idx].tasks.splice(
            jobElementsState.formInfo.jobelements[idx].tasks.indexOf(task), 1);
        
    }
    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function(group) {
        event.stopPropagation();
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