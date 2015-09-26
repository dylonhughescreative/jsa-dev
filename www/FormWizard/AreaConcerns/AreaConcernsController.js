app.controller('AreaConcernsCtrl', function ($scope, $state, formInfo, $rootScope) {
    'use strict';         
    $scope.AreaConcerns = {
        lineofFire: [],
        lof_none: false,
        sensEquip: [],
        sensequip_none: false,
        fallHazards: [],
        fallhaz_none: false
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
        if (($scope.AreaConcerns.lof_none === true || $scope.AreaConcerns.lineofFire.length > 0) &&
           ($scope.AreaConcerns.sensequip_none === true || $scope.AreaConcerns.sensEquip.length > 0) &&
           ($scope.AreaConcerns.fallhaz_none === true || $scope.AreaConcerns.fallHazards.length > 0)) {
            return "valid";
        } else {
            return "invalid";
        }
    }
    
    $scope.check = function (state) {
        formInfo.setAreaConcernsComplete(verify());
        formInfo.setAreaConcerns($scope.AreaConcerns);
        $scope.next(state);
    };
    
    $scope.LOFcheckchanged_none = function () {
        if($scope.AreaConcerns.lof_none === false) {
            $scope.AreaConcerns.lineofFire = [];
        }
    };
    
    $scope.LOFTextChanged = function () {
        if($scope.AreaConcerns.lineofFire[0] != "") {
            $scope.AreaConcerns.lof_none = false;
        }
    };
    
    $scope.SensEquipcheckchanged_none = function () {
        if($scope.AreaConcerns.sensequip_none === false) {
            $scope.AreaConcerns.sensEquip = [];
        }
    };
    
    $scope.SensEquipTextChanged = function () {
        if($scope.AreaConcerns.sensEquip[0] != "") {
            $scope.AreaConcerns.sensequip_none = false;
        }
    };
    
    $scope.FallHazcheckchanged_none = function () {
        if($scope.AreaConcerns.fallhaz_none === false) {
            $scope.AreaConcerns.fallHazards = [];
        }
    };
    
    $scope.FallHazTextChanged = function () {
        if($scope.AreaConcerns.fallHazards[0] != "") {
            $scope.AreaConcerns.fallhaz_none = false;
        }
    };
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.AreaConcerns = angular.copy(formInfo.getAreaConcerns());
    });

});