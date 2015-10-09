app.controller('PPECtrl', function ($rootScope, $scope, $ionicPopup, formInfo) {
    'use strict';
    
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
        ppeinfo.None = false;
        formInfo.setppeinfo(ppeinfo);
    };
    
    $scope.otherTextChanged = function () {
        if($scope.tempPPEinfo.tb_Other != "") {
            $scope.tempPPEinfo.None = false;
        }
    };
    
    $scope.checkchanged_none = function () {
        if($scope.tempPPEinfo.None === false) {
            $scope.tempPPEinfo = angular.copy(defaultPPEinfo);
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
    
    $scope.respiratorTypeChanged = function () {
        if($scope.tempPPEinfo.cb_RespiratorType == "Other") {
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
                    $scope.tempPPEinfo.cb_RespiratorType = res;
                    
                    if(res != "N/A") {
                        $scope.tempPPEinfo.None = false;
                    }
                }
            });
        }
        
        if($scope.tempPPEinfo.cb_RespiratorType != "N/A") {
            $scope.tempPPEinfo.None = false;
        }
    };
    
    $scope.gloveTypeChanged = function () {
        if($scope.tempPPEinfo.cb_GlovesType == "Other") {
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
                    $scope.tempPPEinfo.cb_GlovesType = res;
                    
                    if(res != "N/A") {
                        $scope.tempPPEinfo.None = false;
                    }
                }
            });
        }
        
        if($scope.tempPPEinfo.cb_GlovesType != "N/A") {
            $scope.tempPPEinfo.None = false;
        }
    };
        
    $scope.clothingTypeChanged = function () {
        if($scope.tempPPEinfo.cb_Clothing == "Other") {
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
                    $scope.tempPPEinfo.cb_Clothing = res;
                    
                    if(res != "N/A") {
                        $scope.tempPPEinfo.None = false;
                    }
                }
            });
        }
        
        if($scope.tempPPEinfo.cb_Clothing != "N/A") {
            $scope.tempPPEinfo.None = false;
        }
    };
    
    $scope.chemclothingTypeChanged = function () {
        if($scope.tempPPEinfo.cb_ChemClothing == "Other") {
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
                    $scope.tempPPEinfo.cb_ChemClothing = res;
                    
                    if(res != "N/A") {
                        $scope.tempPPEinfo.None = false;
                    }
                }
            });
        }
        
        if($scope.tempPPEinfo.cb_ChemClothing != "N/A") {
            $scope.tempPPEinfo.None = false;
        }
    }
    
});