app.controller('FormWizardCtrl', function ($rootScope, $scope, $state, $ionicSideMenuDelegate, formInfo) {
    'use strict';
  
    $scope.wizardSteps = [
           {
               title: 'General Information',
               link: 'formWizard.GCorSub'
           },
           {
               title: 'PPE Assessment',
               link: 'formWizard.PPE'
           },
           {
               title: 'Job Elements',
               link: 'formWizard.JobElements'
           },
           {
               title: 'Training Requirements',
               link: 'formWizard.TrainReq'
           },
           {
               title: 'License Requirements',
               link: 'formWizard.LicReq'
           },
           {
               title: 'Area Concerns',
               link: 'formWizard.AreaConcerns'
           },
           {
               title: 'Additional Training',
               link: 'formWizard.AddTraining'
           }
    ];
    $scope.basicinfo = angular.copy(formInfo.getBasicInfo());
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.completedElements = angular.copy(formInfo.getcompletedElements());
    });
    
    $scope.check = function (state) {
        switch (state) {
            case "formWizard.GCinfo":
                checkGCinfo();
                break;
        }
    };
    
    $scope.next = function (state) {
        $state.go(state);
    };
    
    $scope.GoToPage = function (state)
    {
        if(state == "formWizard.GCorSub") {
            if(formInfo.getBasicInfo().gcorsub != "") {
                state = formInfo.getBasicInfo().gcorsub;
            }
        }
            
        $state.go(state);
        $ionicSideMenuDelegate.toggleLeft(false);
    };
    
    function verifyGCinfo () {
        if (angular.isUndefined($scope.basicinfo.username) || $scope.basicinfo.username === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.generalcontractor) || $scope.basicinfo.generalcontractor === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.gcsuperintendent) || $scope.basicinfo.gcsuperintendent === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.projectname) || $scope.basicinfo.projectname === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.startdate) || $scope.basicinfo.startdate === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.enddate) || $scope.basicinfo.enddate === "") {
            return "invalid";
        } else if (angular.isUndefined($scope.basicinfo.jobscope) || $scope.basicinfo.jobscope === "") {
            return "invalid";
        } else {
            return "valid";
        }
    }
    
    function checkGCinfo () {
        formInfo.setBasicInfocomplete(verifyGCinfo());
        formInfo.setBasicInfo($scope.basicinfo)
        $scope.next(state);
    }
});