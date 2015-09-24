app.controller('AreaConcernsCtrl', function ($scope, $state, formInfo, $rootScope) {
    'use strict';         
    $scope.AreaConcerns = {
        lineofFire: [],
        sensEquip: [],
        fallHazards: []
    }

    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }
                                                                     
    $scope.check = function (state) {
        formInfo.setAreaConcerns($scope.AreaConcerns);
        $scope.next(state);
    };
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.AreaConcerns = angular.copy(formInfo.getAreaConcerns());
    });

});