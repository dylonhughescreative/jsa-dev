app.controller('LicReqCtrl', function ($rootScope, $scope, $ionicPopup, formInfo) {
    'use strict';
    
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
        $scope.tempLicReqs.None = false;
    };
    
    $scope.otherTextChanged = function () {
        if($scope.tempLicReqs.tb_Other != "") {
            $scope.tempLicReqs.None = false;
        }
    };
    
    $scope.checkchanged_none = function () {
        if($scope.tempLicReqs.None === false) {
            $scope.tempLicReqs = angular.copy(defaultLicReqs);
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
        if($scope.tempLicReqs.cb_Crane == "Other") {
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
                    $scope.tempLicReqs.cb_Crane = res;
                    
                    if(res != "N/A") {
                        $scope.tempLicReqs.None = false;
                    }
                }
            });
        }
        
        if($scope.tempLicReqs.cb_Crane != "N/A") {
            $scope.tempLicReqs.None = false;
        }
    };
    
    $scope.heavyequipTypeChanged = function () {
        if($scope.tempLicReqs.cb_HeavyEquip == "Other") {
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
                    $scope.tempLicReqs.cb_HeavyEquip = res;
                    
                    if(res != "N/A") {
                        $scope.tempLicReqs.None = false;
                    }
                }
            });
        }
        
        if($scope.tempLicReqs.cb_HeavyEquip != "N/A") {
            $scope.tempLicReqs.None = false;
        }
    };
    
});
