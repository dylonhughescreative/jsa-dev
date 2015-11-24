app.controller('LicReqCtrl', function ($rootScope, $scope, $ionicPopup, formInfo) {
    'use strict';
    
    var licReqState = this;
    licReqState.formInfo = formInfo;
    
    $scope.craneOptions = ['N/A', 'Other'];
    $scope.heavyequipOptions = ['N/A', 'Other'];
    
    var defaultLicReqs = {
            None: false,
            ForkLift: false,
            AerialLift: false,
            cm_Crane: false,
            cb_Crane: 'N/A',
            cm_HeavyEquip: false,
            cb_HeavyEquip: 'N/A',
            cm_Other: false,
            tb_Other: ''
        };
    
    $scope.checkchanged = function () {
        licReqState.formInfo.licReqs.None = false;
    };
    
    $scope.otherTextChanged = function () {
        if(licReqState.formInfo.licReqs.tb_Other != "") {
            licReqState.formInfo.licReqs.None = false;
        }
    };
    
    $scope.checkchanged_none = function () {
        if(licReqState.formInfo.licReqs.None === false) {
            licReqState.formInfo.licReqs = angular.copy(defaultLicReqs);
        }
    };
    
    function OtherPopup (type) {
        $scope.data = {}
        
        var other = $ionicPopup.show({
            template: '<input type="text" ng-model="data.other">',
            title: 'Enter Other Option',
            subTitle: 'Additional ' + type,
            scope: $scope,
            buttons: [
                { text: 'Cancel',
                  onTap: function() {
                      return "cancel";
                  }
                },
                {
                    text: '<b>OK</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.other) {
                        //don't allow the user to close unless he enters wifi password
                        e.preventDefault();
                        } else {
                            return $scope.data.other;
                        }
                    }
                }
            ]
        });
        
        return other;
    }
    
    $scope.craneTypeChanged = function () {
        if(licReqState.formInfo.licReqs.cb_Crane == "Other") {
            var addToArray = true,
                other = OtherPopup("Crane Type");
            other.then(function(res) {
                if (res != "cancel")
                {
                    for(var i=0; i<$scope.craneOptions.length; i++) {
                        if($scope.craneOptions[i] === res) {
                            addToArray = false;
                        }
                    }
                    if(addToArray) {
                        $scope.craneOptions.splice($scope.craneOptions.length-1, 0, res);
                    }
                    licReqState.formInfo.licReqs.cb_Crane = res;
                    
                    if(res != "N/A") {
                        licReqState.formInfo.licReqs.None = false;
                    }
                }
            });
        }
        
        if(licReqState.formInfo.licReqs.cb_Crane != "N/A") {
            licReqState.formInfo.licReqs.None = false;
        }
    };
    
    $scope.heavyequipTypeChanged = function () {
        if(licReqState.formInfo.licReqs.cb_HeavyEquip == "Other") {
            var addToArray = true,
                other = OtherPopup("Heavy Equip. Type");
            other.then(function(res) {
                if(res != "cancel")
                {
                    for(var i=0; i<$scope.heavyequipOptions.length; i++) {
                        if($scope.heavyequipOptions[i] === res) {
                            addToArray = false;
                        }
                    }
                    if(addToArray) {
                        $scope.heavyequipOptions.splice($scope.heavyequipOptions.length-1, 0, res);
                    }
                    licReqState.formInfo.licReqs.cb_HeavyEquip = res;
                    
                    if(res != "N/A") {
                        licReqState.formInfo.licReqs.None = false;
                    }
                }
            });
        }
        
        if(licReqState.formInfo.licReqs.cb_HeavyEquip != "N/A") {
            licReqState.formInfo.licReqs.None = false;
        }
    };
    
});
