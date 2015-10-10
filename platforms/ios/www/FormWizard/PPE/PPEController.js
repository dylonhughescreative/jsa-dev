app.controller('PPECtrl', function ($rootScope, $scope, $ionicPopup, formInfo) {
    'use strict';
    
    var ppeState = this;
    ppeState.formInfo = formInfo;
    
    $scope.respiratorOptions = ['N/A', 'Mouth Bit', 'Quarter-Mask', 'Half-Face Mask', 'Full Facepiece', 'Other'];
    $scope.gloveOptions = ['N/A', 'Leather', 'Canvas', 'Metal Mesh', 'Other'];
    $scope.clothingOptions = ['N/A', 'Other'];
    $scope.chemclothingOptions = ['N/A', 'Other'];
    
    var ppeinfo = {},
        defaultPPEinfo = {
        None: false,
        cm_EyeProtection: false,
        cm_ChemGoggles: false,
        cm_HardHat: false,
        cb_RespiratorType: 'N/A',
        cb_GlovesType: 'N/A',
        cb_Clothing: 'N/A',
        cm_ProtectiveToe: false,
        cm_HearingProtection: false,
        cb_ChemClothing: 'N/A',
        cm_HarnessLanyard: false,
        cm_FaceShield: false,
        tb_Other: ''
    };
    
    $scope.checkchanged = function () {
        ppeState.formInfo.ppeinfo.None = false;
    };
    
    $scope.otherTextChanged = function () {
        if(ppeState.formInfo.ppeinfo.tb_Other != "") {
            ppeState.formInfo.ppeinfo.None = false;
        }
    };
    
    $scope.checkchanged_none = function () {
        if(ppeState.formInfo.ppeinfo.None === false) {
            ppeState.formInfo.ppeinfo = angular.copy(defaultPPEinfo);
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
    
    $scope.respiratorTypeChanged = function () {
        if(ppeState.formInfo.ppeinfo.cb_RespiratorType == "Other") {
            var addToArray = true,
                other = OtherPopup("Respirator Type");
            other.then(function(res) {
                if(res != "cancel") {
                    for(var i=0; i<$scope.respiratorOptions.length; i++) {
                        if($scope.respiratorOptions[i] === res) {
                            addToArray = false;
                        }
                    }
                    if(addToArray) {
                        $scope.respiratorOptions.splice($scope.respiratorOptions.length-1, 0, res);
                    }
                    ppeState.formInfo.ppeinfo.cb_RespiratorType = res;
                    
                    if(res != "N/A") {
                        ppeState.formInfo.ppeinfo.None = false;
                    }
                }
            });
        }
        
        if(ppeState.formInfo.ppeinfo.cb_RespiratorType != "N/A") {
            ppeState.formInfo.ppeinfo.None = false;
        }
    };
    
    $scope.gloveTypeChanged = function () {
        if(ppeState.formInfo.ppeinfo.cb_GlovesType == "Other") {
            var addToArray = true,
                other = OtherPopup("Glove Type");
            other.then(function(res) {
                if(res != "cancel") {
                    for(var i=0; i<$scope.gloveOptions.length; i++) {
                        if($scope.gloveOptions[i] === res) {
                            addToArray = false;
                        }
                    }
                    if(addToArray) {
                        $scope.gloveOptions.splice($scope.gloveOptions.length-1, 0, res);
                    }
                    ppeState.formInfo.ppeinfo.cb_GlovesType = res;
                    
                    if(res != "N/A") {
                        ppeState.formInfo.ppeinfo.None = false;
                    }
                }
            });
        }
        
        if(ppeState.formInfo.ppeinfo.cb_GlovesType != "N/A") {
            ppeState.formInfo.ppeinfo.None = false;
        }
    };
        
    $scope.clothingTypeChanged = function () {
        if(ppeState.formInfo.ppeinfo.cb_Clothing == "Other") {
            var addToArray = true,
                other = OtherPopup("Clothing Type");
            other.then(function(res) {
                if (res != "cancel") {
                    for(var i=0; i<$scope.clothingOptions.length; i++) {
                        if($scope.clothingOptions[i] === res) {
                            addToArray = false;
                        }
                    }
                    if(addToArray) {
                        $scope.clothingOptions.splice($scope.clothingOptions.length-1, 0, res);
                    }
                    ppeState.formInfo.ppeinfo.cb_Clothing = res;
                    
                    if(res != "N/A") {
                        ppeState.formInfo.ppeinfo.None = false;
                    }
                }
            });
        }
        
        if(ppeState.formInfo.ppeinfo.cb_Clothing != "N/A") {
            ppeState.formInfo.ppeinfo.None = false;
        }
    };
    
    $scope.chemclothingTypeChanged = function () {
        if(ppeState.formInfo.ppeinfo.cb_ChemClothing == "Other") {
            var addToArray = true,
                other = OtherPopup("Chem. Clothing Type");
            other.then(function(res) {
                if ( res != "cancel")
                {
                    for(var i=0; i<$scope.chemclothingOptions.length; i++) {
                        if($scope.chemclothingOptions[i] === res) {
                            addToArray = false;
                        }
                    }
                    if(addToArray) {
                        $scope.chemclothingOptions.splice($scope.chemclothingOptions.length-1, 0, res);
                    }
                    ppeState.formInfo.ppeinfo.cb_ChemClothing = res;
                    
                    if(res != "N/A") {
                        ppeState.formInfo.ppeinfo.None = false;
                    }
                }
            });
        }
        
        if(ppeState.formInfo.ppeinfo.cb_ChemClothing != "N/A") {
            ppeState.formInfo.ppeinfo.None = false;
        }
    }
    
});