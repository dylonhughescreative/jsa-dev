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
            doc.text( 207, row2, formInfo.basicinfo.startdate.toLocaleDateString("en-US"));
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