app.controller('AreaConcernsCtrl', function ($scope, $state, formInfo, $rootScope) {
    'use strict';         
    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }
    
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

});