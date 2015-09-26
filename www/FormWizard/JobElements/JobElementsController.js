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
    $scope.groups = [];
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
                                                                                   
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.groups = angular.copy(formInfo.getjobelements());
    });
    // Called when the form is submitted
    $scope.createTask = function (jobElement) {
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
        $scope.jobElement = { number: 1,
                              task1: {}
                            };
        $scope.editing = false;
        $scope.jobElementModal.hide();
        if ($scope.editing)
            $scope.toggleGroup($scope.groups[$scope.groupIndex]);
        else
            $scope.toggleGroup($scope.groups[$scope.groups.length - 1]);
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
    
    function verify () {
        if($scope.groups.length > 0) {
            return "valid";
        } else {
            return "invalid";
        }
    }
                                                                                               
    $scope.check = function (state) {
        formInfo.setjobelementsComplete(verify());
        formInfo.setjobelements($scope.groups);
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
    $scope.openJobElement = function(group, $event) {
        event.stopPropagation();
        $scope.ModalHeaderText = "Edit Job Element";
        $scope.ModalButtonText = "Save Element";
        $scope.editing = true;
        for (var j = 0; j < $scope.groups.length; j++) {
            if (group === $scope.groups[j])
                $scope.groupIndex = j;
        }
        $scope.jobElement.title = group.name;
        $scope.jobElement.number = group.items.length;
        if (group.items.length <= 0)
            $scope.jobElement.number = 1;
        if (group.items.length > 0)
            $scope.jobElement.task1 = group.items[0];
        if (group.items.length > 1)
            $scope.jobElement.task2 = group.items[1];
        if (group.items.length > 2)
            $scope.jobElement.task3 = group.items[2];
        $ionicListDelegate.closeOptionButtons();
        $scope.shownGroup = null;
        $scope.jobElementModal.show();
    }
    
    $scope.openTaskModal = function(group, item) {
        for (var j = 0; j < $scope.groups.length; j++) {
            if (group === $scope.groups[j])
                $scope.groupIndex = j;
        }
        for (var i = 0; i < $scope.groups[$scope.groupIndex].items.length; i++) {
            if (item == $scope.groups[$scope.groupIndex].items[i])
                $scope.TaskIndex = i;
        }
        $scope.TempTask = $scope.groups[$scope.groupIndex].items[$scope.TaskIndex];
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
        $scope.groups[$scope.groupIndex].items.splice($scope.TaskIndex, 1, $scope.TempTask);
        $scope.TaskModal.hide();
    }
    
    $scope.deleteItem = function(group) {
        $scope.shownGroup = null;
        $scope.groups.splice($scope.groups.indexOf(group), 1);
        $ionicListDelegate.closeOptionButtons();
    }

    $scope.deleteTask = function(group, task) {
        var idx = $scope.groups.indexOf(group);
        $scope.groups[idx].items.splice(
            $scope.groups[idx].items.indexOf(task), 1);
        
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