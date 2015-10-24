app.controller('HomeCtrl', function ($rootScope, $scope, $state, $ionicSideMenuDelegate, $cordovaSplashscreen, $ionicPlatform, formInfo, savedForms, outbox, jsPdfBuilder) {
    'use strict';
    $scope.helpShow = false;
    $scope.outbox = outbox;
    $scope.pendingforms = outbox.filenames.length;
    var formInfo = formInfo;
    var savedForms = savedForms;
    
    $rootScope.$on('$viewContentLoading', function(event, viewConfig){
        outbox.setOutbox($localstorage.getObject("outbox"));
        $scope.pendingforms = outbox.filenames.length;
    });
    
    $scope.GoTo = function (state) {
        $state.go(state);
    };
    
    $ionicPlatform.ready(function() {
        setTimeout(function() {
            $cordovaSplashscreen.hide();
            $scope.$digest;
        }, 2000);
    });
    
    function clearForm () {
        formInfo.basicinfo = {
        gcorsub: ""
    },
        formInfo.jobelements = [],
        formInfo.ppeinfo = { },
        formInfo.trainReqs = {
            RedTag: false,
            ConfinedSpace: false,
            Scaffold: false,
            FireWatch: false,
            Flagger: false,
            AerialLift: false,
            DriverSafety: false,
            SWP: false,
            SOP: false,
            Rigger: false,
            ForkLift: false,
            cm_Other: false,
            tb_Other: ''
        },
        formInfo.licReqs = {
            ForkLift: false,
            AerialLift: false,
            cm_Crane: false,
            cb_Crane: 'N/A',
            cm_HeavyEquip: false,
            cb_HeavyEquip: 'N/A',
            cm_Other: true,
            tb_Other: ''
        },
        formInfo.areaConcerns = {
            lineofFire: [],
            sensEquip: [],
            fallHazards: []
        },
        formInfo.addTraining = {
            AddTraining: [],     
            None: false
        },
        formInfo.signatures = [],
        formInfo.completedElements = {
            BasicInfo: "pending",
            PPEAssess: "pending",
            JobElements: "pending",
            TrainReqs: "pending",
            LicReqs:   "pending",
            AreaConcerns: "pending",
            AddTraining: "pending"
        },
        formInfo.formComplete = false,
        formInfo.stateController = {
            nextstate: "",
            previousstate: ""
        };
    }
    
    $scope.TestingDefaults = function () {
        outbox.filenames.push("plus one");
        $scope.pendingforms = outbox.filenames.length;
        
        clearForm();
        
        //GENERAL INFO
        formInfo.basicinfo.username = "USERNAME";
        formInfo.basicinfo.generalcontractor = "GC NAME";
        formInfo.basicinfo.subscontractor = "SUB NAME";
        formInfo.basicinfo.gcsuperintendent = "GC SUPER";
        formInfo.basicinfo.sitesupervisor = "SITE SUPER";
        formInfo.basicinfo.projectname = "PROJECT NAME";
        formInfo.basicinfo.startdate = "10/10/2015";
        formInfo.basicinfo.enddate = "10/22/2015";
        formInfo.basicinfo.jobscope = "JOB SCOPE";
        
        //PPE
        formInfo.ppeinfo.None = false;
        formInfo.ppeinfo.cm_EyeProtection = true;
        formInfo.ppeinfo.cm_ChemGoggles = true;
        formInfo.ppeinfo.cm_HardHat = false;
        formInfo.ppeinfo.cm_RespiratorType = true;
        formInfo.ppeinfo.cb_RespiratorType = "Mouth Bit";
        formInfo.ppeinfo.cm_GlovesType = false;
        formInfo.ppeinfo.cb_GlovesType = "N/A";
        formInfo.ppeinfo.cm_Clothing = false;
        formInfo.ppeinfo.cb_Clothing = "N/A";
        formInfo.ppeinfo.cm_ProtectiveToe = true;
        formInfo.ppeinfo.cm_HearingProtection = true;
        formInfo.ppeinfo.cm_ChemClothing = false;
        formInfo.ppeinfo.cb_ChemClothing = "N/A";
        formInfo.ppeinfo.cm_HarnessLanyard = true;
        formInfo.ppeinfo.cm_FaceShield = true;
        formInfo.ppeinfo.cm_Other = true;
        formInfo.ppeinfo.tb_Other = "OTHER";
        
        //JOB ELEMENTS 
        for(var i=0; i<4; i++) {
            var jobelement = {
                name: '',
                tasks: []
            };
            jobelement.name = "JOB ELEMENT " + i;
            formInfo.jobelements.push(jobelement);
            for(var ii=0; ii<3; ii++) {
                var task = {};
                task.title = "TASK " + ii;
                task.hazards = "HAZARDS " + ii;
                task.control = "CONTROL " + ii;
                formInfo.jobelements[i].tasks.push(task);
            }
        }
        
        //TRAINING REQUIREMENTS
        formInfo.trainReqs.None = false;
        formInfo.trainReqs.RedTag = true;
        formInfo.trainReqs.ConfinedSpace = true;
        formInfo.trainReqs.Scaffold = true;
        formInfo.trainReqs.FireWatch = true;
        formInfo.trainReqs.Flagger = true;
        formInfo.trainReqs.AerialLift = true;
        formInfo.trainReqs.DriverSafety = true;
        formInfo.trainReqs.SWP = true;
        formInfo.trainReqs.SOP = true;
        formInfo.trainReqs.Rigger = true;
        formInfo.trainReqs.ForkLift = true;
        formInfo.trainReqs.cm_Other = true;
        formInfo.trainReqs.tb_Other = "OTHER";
        
        //LICENSE REQUIREMENTS
        formInfo.licReqs.None = false;
        formInfo.licReqs.ForkLift = true;
        formInfo.licReqs.AerialLift = true;
        formInfo.licReqs.cm_Crane = false;
        formInfo.licReqs.cb_Crane = "N/A";
        formInfo.licReqs.cm_HeavyEquip = false;
        formInfo.licReqs.cb_HeavyEquip = "N/A";
        formInfo.licReqs.cm_Other = true;
        formInfo.licReqs.tb_Other = "OTHER";
        
        //AREA OF CONCERNS
        formInfo.areaConcerns.lof_none = false;
        for(var i=0; i<3; i++) {
            var lineofFire = "LINE OF FIRE " + i;
            formInfo.areaConcerns.lineofFire.push(lineofFire);
        }
        formInfo.areaConcerns.sensequip_none = false;
        for(var i=0; i<3; i++) {
            var sensEquip = "SENS. EQUIPTMENT " + i;
            formInfo.areaConcerns.sensEquip.push(sensEquip);
        }
        formInfo.areaConcerns.fallhaz_none = false;
        for(var i=0; i<3; i++) {
            var fallHazards = "FALL HAZARD " + i;
            formInfo.areaConcerns.fallHazards.push(fallHazards);
        }
        
        //ADDITIONAL TRAINING
        formInfo.addTraining.None = false;
        for(var i=0; i<6; i++) {
            var addTraining = { };
            addTraining.name = "ADD. TRAINING " + i;
            addTraining.date = "10/10/2015";
            formInfo.addTraining.AddTraining.push(addTraining);  
        }
        
        savedForms.formNames.push('Default Testing Form');
        savedForms.forms.push(formInfo);
        
        //jsPdfBuilder.createPdf();
    }
});