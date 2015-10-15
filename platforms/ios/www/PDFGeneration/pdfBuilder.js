app.factory('jsPdfBuilder', function ($ionicLoading, $cordovaFile, formInfo) {
    'use strict';
    var doc = {},
        formInfo = formInfo,
        pdfOutput = {},
        blob = {},
        page1 = '',
        page2 = '';
    
    function save (filepath, callback) {
        $cordovaFile.createFile(cordova.file.documentsDirectory, "JSA_Form.pdf", true);
        $cordovaFile.writeFile(cordova.file.documentsDirectory, "JSA_Form.pdf", pdfOutput, true)
            .then(function (success) {
                console.log("works");
                callback();
            }, function (error) {
                console.log("doesnt work");
            });
    }
    
    function BasicInfo () {
        doc.setFontSize(12);
        
        var row1 = 23.5,
            row2 = 28,
            row3 = 32.5;
        
        if (formInfo.basicinfo.subcontractor)
            doc.text( 40, row1, formInfo.basicinfo.subcontractor);
        if (formInfo.basicinfo.generalcontractor)
            doc.text( 47, row2, formInfo.basicinfo.generalcontractor);
        if (formInfo.basicinfo.crewleader)
            doc.text( 132, row1, formInfo.basicinfo.crewleader);
        if (formInfo.basicinfo.gcsuperintendent)
            doc.text( 142, row2, formInfo.basicinfo.gcsuperintendent);
        if (formInfo.basicinfo.projectname)
            doc.text( 221, row1, formInfo.basicinfo.projectname);
        if (formInfo.basicinfo.startdate)    
            doc.text( 207, row2, formInfo.basicinfo.startdate.toLocaleDateString("en-US")); // This doesn't work
        if (formInfo.basicinfo.jobscope)
            doc.text( 32, row3, formInfo.basicinfo.jobscope);
    }
    
    function PPEInfo () {
        doc.setFontSize(12);
        
        var row1 = 44,
            row2 = 49,
            row3 = 53,
            column1 = 12,
            column2 = 62.5,    
            column3 = 141,
            column4 =220;
        
        if (formInfo.ppeinfo.cm_EyeProtection)
            doc.text( column1, row1, "x");
        if (formInfo.ppeinfo.cm_ChemGoggles)
            doc.text(column1, row2, "x");
        if (formInfo.ppeinfo.cm_HardHat)
            doc.text(column1, row3, "x");
        if (formInfo.ppeinfo.cb_RespiratorType)
            doc.text(column2, row1, "x");
        if (formInfo.ppeinfo.cb_GlovesType)
            doc.text(column2, row2, "x");
        if (formInfo.ppeinfo.cb_Clothing)
            doc.text(column2, row3, "x");
        if (formInfo.ppeinfo.cm_ProtectiveToe)
            doc.text(column3, row1, "x");
        if (formInfo.ppeinfo.cm_HearingProtection)
            doc.text(column3, row2, "x");
        if (formInfo.ppeinfo.cb_ChemClothing)
            doc.text(column3, row3, "x");
        if (formInfo.ppeinfo.cm_HarnessLanyard)
            doc.text(column4, row1, "x");
        if (formInfo.ppeinfo.cm_FaceShield)
            doc.text(column4, row2, "x");
        if (formInfo.ppeinfo.tb_Other)
            doc.text(column4, row3, "x");
        
        doc.text( 94, row1, formInfo.ppeinfo.cb_RespiratorType);
        doc.text( 89, row2, formInfo.ppeinfo.cb_GlovesType);
        doc.text( 84, row3, formInfo.ppeinfo.cb_Clothing);
        doc.text( 173, row3, formInfo.ppeinfo.cb_ChemClothing);
        doc.text( 236, row3, formInfo.ppeinfo.tb_Other);
    }
    
    function StartEndDate () {
        doc.setFontSize(16);
        
        var row = 64.5;
        
        doc.text( 125, row, formInfo.basicinfo.startdate.toLocaleDateString("en-US"));
        doc.text( 200, row, formInfo.basicinfo.enddate.toLocaleDateString("en-US"));
    }
    
    function JobElements () {
        doc.setFontSize(12);
        
        var row1 = 84.5,
            row2 = 93.5,
            row3 = 102.5,
            row4 = 115.5,
            row5 = 124.5,
            row6 = 133.5,
            row7 = 146.5,
            row8 = 155.5,
            row9 = 164.5,
            row10 = 177.5,
            row11 = 186.5,
            row12 = 195.5,
            column1 = 12,
            column2 = 57,
            column3 = 110,
            column4 = 192;
        
        for (var i=0; i < formInfo.jobelements.length;i++) {
             for(var j=0; j <formInfo.jobelements[i].tasks.length; j++) {
                 if (i==0) {
                     doc.text(column1, row1, formInfo.jobelements[0].name);
                    if(j==0) {
                        doc.text(column2, row1, formInfo.jobelements[0].tasks[0].title);
                        doc.text(column3, row1, formInfo.jobelements[0].tasks[0].hazards);
                        doc.text(column4, row1, formInfo.jobelements[0].tasks[0].control);
                    }
                    if(j==1) {
                        doc.text(column2, row2, formInfo.jobelements[0].tasks[1].title);
                        doc.text(column3, row2, formInfo.jobelements[0].tasks[1].hazards);
                        doc.text(column4, row2, formInfo.jobelements[0].tasks[1].control);
                    }
                    if(j==2) {
                        doc.text(column2, row3, formInfo.jobelements[0].tasks[2].title);
                        doc.text(column3, row3, formInfo.jobelements[0].tasks[2].hazards);
                        doc.text(column4, row3, formInfo.jobelements[0].tasks[2].control);
                    }
                 }
                 if (i==1) {
                     doc.text(column1, row4, formInfo.jobelements[1].name);
                    if(j==0) {
                        doc.text(column2, row4, formInfo.jobelements[1].tasks[0].title);
                        doc.text(column3, row4, formInfo.jobelements[1].tasks[0].hazards);
                        doc.text(column4, row4, formInfo.jobelements[1].tasks[0].control);
                    }
                    if(j==1) {
                        doc.text(column2, row5, formInfo.jobelements[1].tasks[1].title);
                        doc.text(column3, row5, formInfo.jobelements[1].tasks[1].hazards);
                        doc.text(column4, row5, formInfo.jobelements[1].tasks[1].control);
                    }
                    if(j==2) {
                        doc.text(column2, row6, formInfo.jobelements[1].tasks[2].title);
                        doc.text(column3, row6, formInfo.jobelements[1].tasks[2].hazards);
                        doc.text(column4, row6, formInfo.jobelements[1].tasks[2].control);
                    }
                 }
                 if (i==2) {
                     doc.text(column1, row7, formInfo.jobelements[2].name);
                    if(j==0) {
                        doc.text(column2, row7, formInfo.jobelements[2].tasks[0].title);
                        doc.text(column3, row7, formInfo.jobelements[2].tasks[0].hazards);
                        doc.text(column4, row7, formInfo.jobelements[2].tasks[0].control);
                    }
                    if(j==1) {
                        doc.text(column2, row8, formInfo.jobelements[2].tasks[1].title);
                        doc.text(column3, row8, formInfo.jobelements[2].tasks[1].hazards);
                        doc.text(column4, row8, formInfo.jobelements[2].tasks[1].control);
                    }
                    if(j==2) {
                        doc.text(column2, row9, formInfo.jobelements[2].tasks[2].title);
                        doc.text(column3, row9, formInfo.jobelements[2].tasks[2].hazards);
                        doc.text(column4, row9, formInfo.jobelements[2].tasks[2].control);
                    }
                 }
                 
                 if (i==3) {
                     doc.text(column1, row10, formInfo.jobelements[3].name);
                    if(j==0) {
                        doc.text(column2, row10, formInfo.jobelements[3].tasks[0].title);
                        doc.text(column3, row10, formInfo.jobelements[3].tasks[0].hazards);
                        doc.text(column4, row10, formInfo.jobelements[3].tasks[0].control);
                    }
                    if(j==1) {
                        doc.text(column2, row11, formInfo.jobelements[3].tasks[1].title);
                        doc.text(column3, row11, formInfo.jobelements[3].tasks[1].hazards);
                        doc.text(column4, row11, formInfo.jobelements[3].tasks[1].control);
                    }
                    if(j==2) {
                        doc.text(column2, row12, formInfo.jobelements[3].tasks[2].title);
                        doc.text(column3, row12, formInfo.jobelements[3].tasks[2].hazards);
                        doc.text(column4, row12, formInfo.jobelements[3].tasks[2].control);
                    }
                 }
                 
             }
         }
        //nested job elements for loop
    }
    
    function TrainReqs () {
        
        var row1 = 21.5,
            row2 = 25.5,
            row3 = 30.5,
            column1 = 12.5,
            column2 = 49.5,
            column3 = 79.5,
            column4 = 109.5;
        
        if (formInfo.trainReqs.RedTag)
            doc.text( column1, row1, "x");
        
        if (formInfo.trainReqs.ConfinedSpace)
            doc.text( column1, row2, "x");
        
        if (formInfo.trainReqs.Scaffold)
            doc.text( column1, row3, "x");
        
        if (formInfo.trainReqs.FireWatch)
            doc.text( column2, row1, "x");
        
        if (formInfo.trainReqs.Flagger)
            doc.text( column2, row2, "x");
        
        if (formInfo.trainReqs.AerialLift)
            doc.text( column2, row3, "x");
        
        if (formInfo.trainReqs.DriverSafety)
            doc.text( column3, row1, "x");
        
        if (formInfo.trainReqs.SWP)
            doc.text( column3, row2, "x");
        
        if (formInfo.trainReqs.SPO)
            doc.text( column3, row3, "x");
        
        if (formInfo.trainReqs.Rigger)
            doc.text( column4, row1, "x");
        
        if (formInfo.trainReqs.ForkLift)
            doc.text( column4, row2, "x");
        
        if (formInfo.trainReqs.cm_Other)
            doc.text( column4, row3, "x");
        
        if (formInfo.trainReqs.tb_Other)
            doc.text( column4, row3, "x");
        
    }
    
    function LicReqs () {
        
        var row1 = 21.5,
            row2 = 25.5,
            row3 = 30.5,
            column1 = 157.5,
            column2 = 220.5;
        
        if (formInfo.licReqs.ForkLift)
            doc.text( column1, row1, "x");
        
        if (formInfo.licReqs.AerialLift)
            doc.text( column1, row2, "x");
        
        if (formInfo.licReqs.cm_Crane)
            doc.text( column1, row3, "x");
        
        if (formInfo.licReqs.cb_Crane)
            doc.text( column1, row1, "x");
        
        if (formInfo.licReqs.cm_HeavyEquip)
            doc.text( column2, row1, "x");
        
        if (formInfo.licReqs.cm_Other)
            doc.text( column2, row2, "x");
        
        if (formInfo.licReqs.tb_Other)
            doc.text( column2, row2, "x");
    }
    
    function AreaConcerns () {
        
       var row1 = 46.5,
           row2 = 51.5,
           row3 = 55.5,
           column1 = 12.5,
           column2 = 102.5,
           column3 = 194.5;
        
       for (var i=0; i < formInfo.areaConcerns.lineofFire.length;i++) {
           if (i==0) {
               doc.text(column1, row1, formInfo.areaConcerns.lineofFire[0]);
           }
           if (i==1) {
               doc.text(column1, row2, formInfo.areaConcerns.lineofFire[1]);
           }
           if (i==2) {
               doc.text(column1, row3, formInfo.areaConcerns.lineofFire[2]);
           }
           
       }
       for (var i=0; i < formInfo.areaConcerns.sensEquip.length;i++) {
           if (i==0) {
                doc.text(column2, row1, formInfo.areaConcerns.sensEquip[0]);
           }
           if (i==1) {
                doc.text(column2, row2, formInfo.areaConcerns.sensEquip[1]);
           }
           if (i==2) {
                doc.text(column2, row3, formInfo.areaConcerns.sensEquip[2]);
           }
       }         
    
      for (var i=0; i < formInfo.areaConcerns.fallHazards.length;i++) {
           if (i==0) {
                doc.text(column3, row1, formInfo.areaConcerns.fallHazards[0]);
           }
           if (i==1) {
                doc.text(column3, row2, formInfo.areaConcerns.fallHazards[1]);
           }
           if(i==2) {
                doc.text(column3, row3, formInfo.areaConcerns.fallHazards[2]);
          }
           
       }
     }
    
    function AddTraining () {
        
        var row1 = 71.25,
            row2 = 75.75,
            row3 = 80.75,
            row4 = 85.5,
            row5 = 90.25,
            row6 = 94.5,
            column1 = 20,
            column2 = 248;
        
        for (var i=0; i < formInfo.addTraining.AddTraining.length;i++) {
           if (i==0) {
               doc.text(column1, row1, formInfo.addTraining.AddTraining[0].name);
               doc.text(column2, row1, formInfo.addTraining.AddTraining[0].date.toLocaleDateString("en-US"));
           }
           if (i==1) {
               doc.text(column1, row2, formInfo.addTraining.AddTraining[1].name);
               doc.text(column2, row2, formInfo.addTraining.AddTraining[1].date.toLocaleDateString("en-US"));
           }
           if (i==2) {
               doc.text(column1, row3, formInfo.addTraining.AddTraining[2].name);
               doc.text(column2, row3, formInfo.addTraining.AddTraining[2].date.toLocaleDateString("en-US"));
           }
           if (i==3) {
               doc.text(column1, row4, formInfo.addTraining.AddTraining[3].name);
               doc.text(column2, row4, formInfo.addTraining.AddTraining[3].date.toLocaleDateString("en-US"));
           }
           if (i==4) {
               doc.text(column1, row5, formInfo.addTraining.AddTraining[4].name);
               doc.text(column2, row5, formInfo.addTraining.AddTraining[4].date.toLocaleDateString("en-US"));
           }
           if (i==5) {
               doc.text(column1, row6, formInfo.addTraining.AddTraining[5].name);
               doc.text(column2, row6, formInfo.addTraining.AddTraining[5].date.toLocaleDateString("en-US")); 
           }
           
       }  
    }
    
    function Signatures () {      
        //var signImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApAAAAEcCAYAAABwL4RuAAAgAElEQVR4Xu3dC8w2aX0X4H+raUulpRhNIEHoQaUxxW2xCpFsaVOxlYLLigfQJgv1VC26bNKGYpXlEBWidiFppUp1XUMLJDXLWkBDjbB0G4Nat5imUpXQrRZttN0CpRJixPxkbpm++33f+87z3PPM4bkm+fKxy8w9M9c98P7e+/g55SBAgAABAgQIECAwQeBzJpzrVAIECBAgQIAAAQIlQPoICBAgQIAAAQIEJgkIkJO4nEyAAAECBAgQICBA+gYIECBAgAABAgQmCQiQk7icTIAAAQIECBAgIED6BggQIECAAAECBCYJCJCTuJxMgAABAgQIECAgQPoGCBAgQIAAAQIEJgkIkJO4nEyAAAECBAgQICBA+gYIECBAgAABAgQmCQiQk7icTIAAAQIECBAgIED6BggQIECAAAECBCYJCJCTuJxMgAABAgQIECAgQPoGCBAgQIAAAQIEJgkIkJO4nEyAAAECBAgQICBA+gYIECBAgAABAgQmCQiQk7icTIAAAQIECBAgIED6BggQIECAAAECBCYJCJCTuJxMgAABAgQIECAgQPoGCBAgQIAAAQIEJgkIkJO4nEyAAAECBAgQICBA+gYIECBAgAABAgQmCQiQk7icTIAAAQIECBAgIED6BggQIECAAAECBCYJCJCTuJxMgAABAgQIECAgQPoGCBAgQIAAAQIEJgkIkJO4nEyAAAECBAgQICBA+gYIECBAgAABAgQmCQiQk7icTIAAAQIECBAgIED6BggQIECAAAECBCYJCJCTuJxMgAABAgQIECAgQPoGCBAgQIAAAQIEJgkIkJO4nEyAAAECBAgQICBA+gYIECBAgAABAgQmCQiQk7icTIAAAQIECBAgIED6BggQIECAAAECBCYJCJCTuJxMgAABAgQIECAgQPoGCBAgQIAAAQIEJgkIkJO4nEyAAAECBAgQICBA+gYIECBAgAABAgQmCQiQk7icTIAAAQIECBAgIED6BggQIECAAAECBCYJCJCTuJxMgAABAgQIECAgQPoGCBAgQIAAAQIEJgkIkJO4nEyAAAECBAgQICBA+gYIECBAgAABAgQmCQiQk7icTIAAAQIECBAgIED6BggQIECAAAECBCYJCJCTuJxMgAABAgQIECAgQPoGCBAgQIAA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';
        //var holloway = 'data:image/png;base64,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';
        //
        ////Load Default Signature Panel Values
        //for(var i=0; i <= 12; i++) {
        //    var defaultSignature = { };
        //    defaultSignature.name = "Patrick";
        //    defaultSignature.date = "10/05/15";
        //    defaultSignature.tb_AtRisk = "YES";
        //    if(i%2 == 0) {
        //        defaultSignature.signature = holloway;
        //    } else {
        //        defaultSignature.signature = signImage;
        //    }
        //    
        //    formInfo.signatures.push(defaultSignature);
        //}
        
        var row2 = 110.5,
            row3 = 115,
            row4 = 120,
            row5 = 124.5,
            row6 = 129,
            row7 = 133.5,
            row8 = 138.5,
            row9 = 143,
            row10 = 147.5,
            row11 = 152,
            row12 = 157,
            row13 = 161.5,
            column1 = 20,
            column2 = 102.5,
            column3 = 210,
            column4 = 250;
        
        for (var i=0; i < formInfo.signatures.length; i++) {
           if (i==0) {
               doc.text(65, 195, formInfo.signatures[0].name);
               doc.setFontSize(16);
               doc.text(180, 190, formInfo.signatures[0].date.toLocaleDateString("en-US"));
               doc.setFontSize(12);
               doc.addImage(formInfo.signatures[0].signature, 'PNG', 65, 180, 80, 10);
           }
           if (i==1) {
               doc.text(column1, row2, formInfo.signatures[1].name);
               doc.text(column4,row2, formInfo.signatures[1].date.toLocaleDateString("en-US"));
               //doc.text(column3,row2, formInfo.signatures[1].tb_AtRisk);
               doc.addImage(formInfo.signatures[1].signature, 'PNG', column2, row2 - 4, 60, 4);
           }
           if (i==2) {
               doc.text(column1,row3, formInfo.signatures[2].name);
               doc.text(column4,row3, formInfo.signatures[2].date.toLocaleDateString("en-US"));
               //doc.text(column3,row3, formInfo.signatures[2].tb_AtRisk);
               doc.addImage(formInfo.signatures[2].signature, 'PNG', column2, row3 - 4, 60, 4);
           }
           if (i==3) {
               doc.text(column1,row4, formInfo.signatures[3].name);
               doc.text(column4,row4, formInfo.signatures[3].date.toLocaleDateString("en-US"));
               //doc.text(column3,row4, formInfo.signatures[3].tb_AtRisk);
               doc.addImage(formInfo.signatures[3].signature, 'JPEG', column2, row4 - 4, 60, 4);
           }
           if (i==4) {
               doc.text(column1,row5, formInfo.signatures[4].name);
               doc.text(column4,row5, formInfo.signatures[4].date.toLocaleDateString("en-US"));
               //doc.text(column3,row5, formInfo.signatures[4].tb_AtRisk);
               doc.addImage(formInfo.signatures[4].signature, 'JPEG', column2, row5 - 4, 60, 4);
           }
           if (i==5) {
               doc.text(column1,row6, formInfo.signatures[5].name);
               doc.text(column4,row6, formInfo.signatures[5].date.toLocaleDateString("en-US"));
               //doc.text(column3,row6, formInfo.signatures[5].tb_AtRisk);
               doc.addImage(formInfo.signatures[5].signature, 'JPEG', column2, row6 - 4, 60, 4);
           }
            if (i==6) {
               doc.text(column1,row7, formInfo.signatures[6].name);
               doc.text(column4,row7, formInfo.signatures[6].date.toLocaleDateString("en-US"));
               //doc.text(column3,row7, formInfo.signatures[6].tb_AtRisk);
               doc.addImage(formInfo.signatures[6].signature, 'JPEG', column2, row7 - 4, 60, 4);
           }
           if (i==7) {
               doc.text(column1,row8, formInfo.signatures[7].name);
               doc.text(column4,row8, formInfo.signatures[7].date.toLocaleDateString("en-US"));
               //doc.text(column3,row8, formInfo.signatures[7].tb_AtRisk);
               doc.addImage(formInfo.signatures[7].signature, 'JPEG', column2, row8 - 4, 60, 4);
           }
           if (i==8) {
               doc.text(column1,row9, formInfo.signatures[8].name);
               doc.text(column4,row9, formInfo.signatures[8].date.toLocaleDateString("en-US"));
               //doc.text(column3,row9, formInfo.signatures[8].tb_AtRisk);
               doc.addImage(formInfo.signatures[8].signature, 'JPEG', column2, row9 - 4, 60, 4);
           }
           if (i==9) {
               doc.text(column1,row10, formInfo.signatures[9].name);
               doc.text(column4,row10, formInfo.signatures[9].date.toLocaleDateString("en-US"));
               //doc.text(column3,row10, formInfo.signatures[9].tb_AtRisk);
               doc.addImage(formInfo.signatures[9].signature, 'JPEG', column2, row10 - 4, 60, 4);
           }
           if (i==10) {
               doc.text(column1, row11, formInfo.signatures[10].name);
               //doc.text(column4, row11, formInfo.signatures[10].date.toLocaleDateString("en-US"));
               doc.text(column3, row11, formInfo.signatures[10].tb_AtRisk);
               doc.addImage(formInfo.signatures[10].signature, 'JPEG', column2, row11 - 4, 60, 4);
           }
           if (i==11) {
               doc.text(column1, row12, formInfo.signatures[11].name);
               doc.text(column4, row12, formInfo.signatures[11].date.toLocaleDateString("en-US"));
               //doc.text(column3, row12, formInfo.signatures[11].tb_AtRisk);
               doc.addImage(formInfo.signatures[11].signature, 'JPEG', column2, row12 - 4, 60, 4);
           }
           if (i==12) {
               doc.text(column1, row13, formInfo.signatures[12].name);
               doc.text(column4, row13, formInfo.signatures[12].date.toLocaleDateString("en-US"));
               //doc.text(column3, row13, formInfo.signatures[12].tb_AtRisk);
               doc.addImage(formInfo.signatures[12].signature, 'JPEG', column2, row13 - 4, 60, 4);
           }
           
       }  
}
    
    function buildPDF(callback) {
        doc.addImage(page1, 'JPEG', 10, 10, 275, 190);
        BasicInfo();
        PPEInfo();
        StartEndDate();
        JobElements();
        doc.addPage();
        doc.addImage(page2, 'JPEG', 10, 10, 275, 190);
        TrainReqs();
        LicReqs();
        AddTraining();
        AreaConcerns();
        Signatures();
        
        //doc.output('dataurlnewwindow');
        pdfOutput = doc.output("blob");
        //window.open(URL.createObjectURL(pdfOutput));
        //doc.save("JSA_Form.pdf");
        save("temp/JSA_Form.pdf",callback);
    }
    
    function convertImage2Base64 (url) {
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            img = new Image(),
            dataUrl;
        
        img.src = url;
        img.crossOrigin = 'Anonymous';
        var dataUrl;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        canvas = null;
        return dataUrl;
    }
    
    return {
        createPdf: function (callback) {
            doc = new jsPDF('landscape', 'mm', 'a4');
            page1 = convertImage2Base64('./img/page1.PNG');
            page2 = convertImage2Base64('./img/page2.PNG');
            buildPDF(callback);
        }
    };
});