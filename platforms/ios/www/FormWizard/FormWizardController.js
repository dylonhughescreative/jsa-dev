app.controller('FormWizardCtrl', function ($scope, $state, $ionicSideMenuDelegate, formInfo) {
    'use strict';
    $scope.next = function (state) {
        $state.go(state);
    };
    
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
           },
           {
               title: 'Overview',
               link: 'overview'
           },
    ];
    
    $scope.GoToPage = function (state)
    {
        if(state == "formWizard.GCorSub") {
            if(formInfo.getBasicInfo().gcorsub != "") {
                state = formInfo.getBasicInfo().gcorsub;
            }
        }
            
        $state.go(state);
        $ionicSideMenuDelegate.toggleLeft(false);
    }
});