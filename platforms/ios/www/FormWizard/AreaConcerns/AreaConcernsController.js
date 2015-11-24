app.controller('AreaConcernsCtrl', function ($scope, $state, formInfo, $rootScope) {
    'use strict';         
    var areaConcernsState = this;
    areaConcernsState.formInfo = formInfo;
    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }
    
    $scope.LOFcheckchanged_none = function () {
        if(areaConcernsState.formInfo.areaConcerns.lof_none === false) {
            areaConcernsState.formInfo.areaConcerns.lineofFire = [];
        }
    };
    
    $scope.LOFTextChanged = function () {
        if(areaConcernsState.formInfo.areaConcerns.lineofFire[0] != "") {
            areaConcernsState.formInfo.areaConcerns.lof_none = false;
        }
    };
    
    $scope.SensEquipcheckchanged_none = function () {
        if(areaConcernsState.formInfo.areaConcerns.sensequip_none === false) {
            areaConcernsState.formInfo.areaConcerns.sensEquip = [];
        }
    };
    
    $scope.SensEquipTextChanged = function () {
        if(areaConcernsState.formInfo.areaConcerns.sensEquip[0] != "") {
            areaConcernsState.formInfo.areaConcerns.sensequip_none = false;
        }
    };
    
    $scope.FallHazcheckchanged_none = function () {
        if(areaConcernsState.formInfo.areaConcerns.fallhaz_none === false) {
            areaConcernsState.formInfo.areaConcerns.fallHazards = [];
        }
    };
    
    $scope.FallHazTextChanged = function () {
        if(areaConcernsState.formInfo.areaConcerns.fallHazards[0] != "") {
            areaConcernsState.formInfo.areaConcerns.fallhaz_none = false;
        }
    };

});