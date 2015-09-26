app.controller('PPECtrl', function ($rootScope, $scope, $ionicPopup, formInfo) {
    'use strict';
    $scope.tempPPEinfo = {
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
    
    $scope.respiratorOptions = ['N/A', 'Mouth Bit', 'Quarter-Mask', 'Half-Face Mask', 'Full Facepiece', 'Other'];
    $scope.gloveOptions = ['N/A', 'Leather', 'Canvas', 'Metal Mesh', 'Other'];
    $scope.clothingOptions = ['N/A', 'Other'];
    $scope.chemclothingOptions = ['N/A', 'Other'];
    
    var defaultPPEinfo = {
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
    
    $scope.tempPPEinfo = angular.copy(formInfo.getppeinfo());
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        $scope.tempPPEinfo = angular.copy(formInfo.getppeinfo());;
    });
    
    function verify() {
        if ($scope.tempPPEinfo.cm_EyeProtection === true) {
            return "valid";
        } else if ($scope.tempPPEinfo.cm_ChemGoggles === true) {
            return "valid";
        } else if ($scope.tempPPEinfo.cm_HardHat === true) {
            return "valid";
        } else if ($scope.tempPPEinfo.cb_RespiratorType !== "N/A") {
            return "valid";
        } else if ($scope.tempPPEinfo.cb_GlovesType !== "N/A") {
            return "valid";
        } else if ($scope.tempPPEinfo.cb_Clothing !== "N/A") {
            return "valid";
        } else if ($scope.tempPPEinfo.cm_ProtectiveToe === true) {
            return "valid";
        } else if ($scope.tempPPEinfo.cm_HearingProtection === true) {
            return "valid";
        } else if ($scope.tempPPEinfo.cm_HarnessLanyard === true) {
            return "valid";
        } else if ($scope.tempPPEinfo.cm_FaceShield === true) {
            return "valid";
        } else if ($scope.tempPPEinfo.tb_Other !== "") {
            return "valid";
        } else {
            return "invalid";
        }
    }
    function format() {
        if ($scope.tempPPEinfo.cb_RespiratorType !== "N/A") {
            $scope.tempPPEinfo.cm_RespiratorType = true;
        } else {
            $scope.tempPPEinfo.cm_RespiratorType = false;
        }
        
        if ($scope.tempPPEinfo.cb_GlovesType !== "N/A") {
            $scope.tempPPEinfo.cm_GlovesType = true;
        } else {
            $scope.tempPPEinfo.cm_GlovesType = false;
        }
        
        if ($scope.tempPPEinfo.cb_Clothing !== "N/A") {
            $scope.tempPPEinfo.cm_Clothing = true;
        } else {
            $scope.tempPPEinfo.cm_Clothing = false;
        }
        
        if ($scope.tempPPEinfo.cb_ChemClothing !== "N/A") {
            $scope.tempPPEinfo.cm_ChemClothing = true;
        } else {
            $scope.tempPPEinfo.cm_ChemClothing = false;
        }
        
        if ($scope.tempPPEinfo.tb_Other !== "") {
            $scope.tempPPEinfo.cm_Other = true;
        } else {
            $scope.tempPPEinfo.cm_Other = false;
        }
    }
    
    $scope.check = function (state) {
        formInfo.setPPEcomplete(verify());
        //if(!gooddata)
        //  popup
        //else
        //  next
        format();
        formInfo.setppeinfo($scope.tempPPEinfo);
        $scope.next(state);
    };
    
    $scope.checkchanged = function () {
        $scope.tempPPEinfo.None = false;
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
                { text: 'Cancel' },
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
            });
        }
        
        if($scope.tempPPEinfo.cb_RespiratorType != "N/A") {
            $scope.tempPPEinfo.None = false;
        }
    };
    
    $scope.gloveTypeChanged = function () {
        if($scope.tempPPEinfo.cb_GlovesType == "Other") {
            var addToArray = true,
                other = OtherPopup("Respirator Type");
            other.then(function(res) {
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
            });
        }
        
        if($scope.tempPPEinfo.cb_GlovesType != "N/A") {
            $scope.tempPPEinfo.None = false;
        }
    };
        
    $scope.clothingTypeChanged = function () {
        if($scope.tempPPEinfo.cb_Clothing == "Other") {
            var addToArray = true,
                other = OtherPopup("Respirator Type");
            other.then(function(res) {
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
            });
        }
        
        if($scope.tempPPEinfo.cb_Clothing != "N/A") {
            $scope.tempPPEinfo.None = false;
        }
    };
    
    $scope.chemclothingTypeChanged = function () {
        if($scope.tempPPEinfo.cb_ChemClothing == "Other") {
            var addToArray = true,
                other = OtherPopup("Respirator Type");
            other.then(function(res) {
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
            });
        }
        
        if($scope.tempPPEinfo.cb_ChemClothing != "N/A") {
            $scope.tempPPEinfo.None = false;
        }
    }
    
});
