app.factory('jsPdfBuilder', function ($ionicLoading, $cordovaFile, formInfo) {
    'use strict';
    var doc = {},
        pdfOutput = {},
        blob = {},
        page1 = '',
        page2 = '';
    
    function save (filepath) {
        $cordovaFile.createFile(cordova.file.documentsDirectory, "JSA_Form.pdf", true);
        $cordovaFile.writeFile(cordova.file.documentsDirectory, "JSA_Form.pdf", pdfOutput, true)
            .then(function (success) {
                console.log("works");
            }, function (error) {
                console.log("doesnt work");
            });
    }
    
    function BasicInfo () {
        var basicinfo = angular.copy(formInfo.getBasicInfo());
        
        doc.setFontSize(12);
        if (basicinfo.subcontractor)
            doc.text( 40, 23.5, basicinfo.subcontractor);
        if (basicinfo.generalcontractor)
            doc.text( 47, 28, basicinfo.generalcontractor);
        if (basicinfo.crewleader)
            doc.text( 132, 23.5, basicinfo.crewleader);
        if (basicinfo.gcsuperintendent)
            doc.text( 142, 28, basicinfo.gcsuperintendent);
        if (basicinfo.projectname)
            doc.text( 221, 23.5, basicinfo.projectname);
        if (basicinfo.startdate)    
            doc.text( 207, 28, basicinfo.startdate.toString()); // This doesn't work
        if (basicinfo.jobscope)
            doc.text( 32, 32.5, basicinfo.jobscope);
    }
    
    function PPEInfo () {
        var ppeinfo = angular.copy(formInfo.getppeinfo());
        if (ppeinfo.cm_EyeProtection)
            doc.text( 12.5, 43.5, "x");
        if (ppeinfo.cm_ChemGoggles)
            doc.text(12.5, 48.5, "x");
        if (ppeinfo.cm_HardHat)
            doc.text(12.5, 52.5, "x");
        if (ppeinfo.cb_RespiratorType)
            doc.text(62.5, 43.5, "x");
        if (ppeinfo.cb_GlovesType)
            doc.text(62.5, 48.5, "x");
        if (ppeinfo.cb_Clothing)
            doc.text(62.5, 52.5, "x");
        if (ppeinfo.cm_ProtectiveToe)
            doc.text(141, 43.5, "x");
        if (ppeinfo.cm_HearingProtection)
            doc.text(141, 48.5, "x");
        if (ppeinfo.cb_ChemClothing)
            doc.text(141, 52.5, "x");
        if (ppeinfo.cm_HarnessLanyard)
            doc.text(220, 43.5, "x");
        if (ppeinfo.cm_FaceShield)
            doc.text(220, 48.5, "x");
        if (ppeinfo.tb_Other)
            doc.text(220, 52.5, "x");
        
    
        doc.setFontSize(12);
        doc.text( 94, 44.5, ppeinfo.cb_RespiratorType);
        doc.text( 89, 49, ppeinfo.cb_GlovesType);
        doc.text( 84, 53.5, ppeinfo.cb_Clothing);
        doc.text( 173, 53.5, ppeinfo.cb_ChemClothing);
        doc.text( 236, 53.5, ppeinfo.tb_Other);
    }
    
    function StartEndDate () {
        var basicinfo = angular.copy(formInfo.getBasicInfo());
        
        doc.setFontSize(16);
        doc.text( 125, 64.5, basicinfo.startdate.toString());
        doc.text( 200, 64.5, basicinfo.enddate.toString());
    }
    
    function JobElements () {
        doc.setFontSize(12);
        var jobelements = angular.copy(formInfo.getjobelements());
        
        for (var i=0; i < jobelements.length;i++) {
             for(var j=0; j <jobelements[i].items.length; j++) {
                 if (i==0) {
                     doc.text(12, 84.5, jobelements[0].name);
                    if(j==0) {
                        doc.text(57, 84.5, jobelements[0].items[0].title);
                        doc.text(110, 84.5, jobelements[0].items[0].hazards);
                        doc.text(192, 84.5, jobelements[0].items[0].control);
                    }
                    if(j==1) {
                        doc.text(57, 93.5, jobelements[0].items[1].title);
                        doc.text(110, 93.5, jobelements[0].items[1].hazards);
                        doc.text(192, 93.5, jobelements[0].items[1].control);
                    }
                    if(j==2) {
                        doc.text(57, 102.5, jobelements[0].items[2].title);
                        doc.text(110, 102.5, jobelements[0].items[2].hazards);
                        doc.text(192, 102.5, jobelements[0].items[2].control);
                    }
                 }
                 if (i==1) {
                     doc.text(12, 115.5, jobelements[1].name);
                    if(j==0) {
                        doc.text(57, 115.5, jobelements[1].items[0].title);
                        doc.text(110, 115.5, jobelements[1].items[0].hazards);
                        doc.text(192, 115.5, jobelements[1].items[0].control);
                    }
                    if(j==1) {
                        doc.text(57, 124.5, jobelements[1].items[1].title);
                        doc.text(110, 124.5, jobelements[1].items[1].hazards);
                        doc.text(192, 124.5, jobelements[1].items[1].control);
                    }
                    if(j==2) {
                        doc.text(57, 133.5, jobelements[1].items[2].title);
                        doc.text(110, 133.5, jobelements[1].items[2].hazards);
                        doc.text(192, 133.5, jobelements[1].items[2].control);
                    }
                 }
                 if (i==2) {
                     doc.text(12, 146.5, jobelements[2].name);
                    if(j==0) {
                        doc.text(57, 146.5, jobelements[2].items[0].title);
                        doc.text(110, 146.5, jobelements[2].items[0].hazards);
                        doc.text(192, 146.5, jobelements[2].items[0].control);
                    }
                    if(j==1) {
                        doc.text(57, 155.5, jobelements[2].items[1].title);
                        doc.text(110, 155.5, jobelements[2].items[1].hazards);
                        doc.text(192, 155.5, jobelements[2].items[1].control);
                    }
                    if(j==2) {
                        doc.text(57, 164.5, jobelements[2].items[2].title);
                        doc.text(110, 164.5, jobelements[2].items[2].hazards);
                        doc.text(192, 164.5, jobelements[2].items[2].control);
                    }
                 }
                 
                 if (i==3) {
                     doc.text(12, 177.5, jobelements[3].name);
                    if(j==0) {
                        doc.text(57, 177.5, jobelements[3].items[0].title);
                        doc.text(110, 177.5, jobelements[3].items[0].hazards);
                        doc.text(192, 177.5, jobelements[3].items[0].control);
                    }
                    if(j==1) {
                        doc.text(57, 186.5, jobelements[3].items[1].title);
                        doc.text(110, 186.5, jobelements[3].items[1].hazards);
                        doc.text(192, 186.5, jobelements[3].items[1].control);
                    }
                    if(j==2) {
                        doc.text(57, 195.5, jobelements[3].items[2].title);
                        doc.text(110, 195.5, jobelements[3].items[2].hazards);
                        doc.text(192, 195.5, jobelements[3].items[2].control);
                    }
                 }
                 
             }
         }
        //nested job elements for loop
      
    
    }
    
    function buildPDF() {
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
        //why is doc.save here?
        //doc.save("JSA_Form.pdf");
        save("temp/JSA_Form.pdf");
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
    
    function TrainReqs () {
        var trainReqs = angular.copy(formInfo.getTrainReqs());
        
        if (trainReqs.RedTag)
            doc.text( 12.5, 20.5, "x");
        
        if (trainReqs.ConfinedSpace)
            doc.text( 12.5, 25.5, "x");
        
        if (trainReqs.Scaffold)
            doc.text( 12.5, 30.5, "x");
        
        if (trainReqs.FireWatch)
            doc.text( 49.5, 20.5, "x");
        
        if (trainReqs.Flagger)
            doc.text( 49.5, 25.5, "x");
        
        if (trainReqs.AerialLift)
            doc.text( 49.5, 30.5, "x");
        
        if (trainReqs.DriverSafety)
            doc.text( 79.5, 20.5, "x");
        
        if (trainReqs.SWP)
            doc.text( 79.5, 25.5, "x");
        
        if (trainReqs.SPO)
            doc.text( 79.5, 30.5, "x");
        
        if (trainReqs.Rigger)
            doc.text( 109.5, 20.5, "x");
        
        if (trainReqs.ForkLift)
            doc.text( 109.5, 25.5, "x");
        
        if (trainReqs.cm_Other)
            doc.text( 109.5, 29.5, "x");
        
        if (trainReqs.tb_Other)
            doc.text( 109.5, 29.5, "x");
        
    }
    
    function LicReqs () {
        var licReqs = angular.copy(formInfo.getLicReqs());
        
        if (licReqs.ForkLift)
            doc.text( 157.5, 20.5, "x");
        
        if (licReqs.AerialLift)
            doc.text( 157.5, 25.5, "x");
        
        if (licReqs.cm_Crane)
            doc.text( 157.5, 29.5, "x");
        
        if (licReqs.cb_Crane)
            doc.text( 157.5, 20.5, "x");
        
        if (licReqs.cm_HeavyEquip)
            doc.text( 220.5, 20.5, "x");
        
        if (licReqs.cm_Other)
            doc.text( 220.5, 25.5, "x");
        
        if (licReqs.tb_Other)
            doc.text( 220.5, 25.5, "x");
    }
    
    function AreaConcerns () {
        var areaConcerns = angular.copy(formInfo.getAreaConcerns());
        
       for (var i=0; i < areaConcerns.lineofFire.length;i++) {
           if (i==0) {
               doc.text(12.5,46.5, areaConcerns.lineofFire[0]);
           }
           if (i==1) {
               doc.text(12.5,51.5, areaConcerns.lineofFire[1]);
           }
           if (i==2) {
               doc.text(12.5,55.5, areaConcerns.lineofFire[2]);
           }
           
       }
       for (var i=0; i < areaConcerns.sensEquip.length;i++) {
           if (i==0) {
                doc.text(102.5,46.5,areaConcerns.sensEquip[0]);
           }
           if (i==1) {
                doc.text(102.5,51.5,areaConcerns.sensEquip[1]);
           }
           if (i==2) {
                doc.text(102.5,55.5,areaConcerns.sensEquip[2]);
           }
       }         
    
      for (var i=0; i < areaConcerns.fallHazards.length;i++) {
           if (i==0) {
                doc.text(194.5,46.5,areaConcerns.fallHazards[0]);
           }
           if (i==1) {
                doc.text(194.5,51.5,areaConcerns.fallHazards[1]);
           }
           if(i==2) {
                doc.text(194.5,55.5,areaConcerns.fallHazards[2]);
          }
           
       }
     }
    
    function AddTraining () {
        var addTraining = angular.copy(formInfo.getAddTraining());
       
        for (var i=0; i < addTraining.AddTraining.length;i++) {
           if (i==0) {
               doc.text(16.5,71,addTraining.AddTraining[0].name);
               doc.text(235.5,71,addTraining.AddTraining[0].date | "MM/dd/yyyy");
           }
           if (i==1) {
               doc.text(16.5,75.5,addTraining.AddTraining[1].name);
               doc.text(235.5,75.5,addTraining.AddTraining[1].date | "MM/dd/yyyy");
           }
           if (i==2) {
               doc.text(16.5,80.5,addTraining.AddTraining[2].name);
               doc.text(235.5,80.5,addTraining.AddTraining[2].date | "MM/dd/yyyy");
           }
           if (i==3) {
               doc.text(16.5,85.5,addTraining.AddTraining[3].name);
               doc.text(235.5,85.5,addTraining.AddTraining[3].date | "MM/dd/yyyy");
           }
           if (i==4) {
               doc.text(16.5,90.5,addTraining.AddTraining[4].name);
               doc.text(235.5,90.5,addTraining.AddTraining[4].date | "MM/dd/yyyy");
           }
           if (i==5) {
               doc.text(16.5,94.5,addTraining.AddTraining[5].name);
               doc.text(235.5,94.5,addTraining.AddTraining[5].date | "MM/dd/yyyy"); 
           }
           
       }  
}
    
    function Signatures () {
        var signatures = angular.copy(formInfo.getSignatures());        
        var signImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAEcArkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiivKf2rvFF74L/Zl+KnibTJb6G+sfCGqtaTWKM00Fw1s6xSjbyoR2Vy38KqWPAoA/Mb4+/wDBQ39r74i/tLeJPhP+y34hnTSYNQutD0bTtC0a01G41JbbeJbtZZIZJPmEckgZCqpGAf4S563wV+yT/wAFavGnhK11jVP2l77wm94Gf+zNb8a6it/EpOQXNrFMqZByF8zcvRgpGBzP/BFP4S6V4k+Kvjf4w6ogkn8F6bbadpkclvkLcX5l8ydJM/K6Q27x7cHK3R5GBn9iKAPyvsv2GP8AgqvbzJKn7ZMSlTv/AH/j/XJVzgHBVrZgepGMY+U+2cnxR+xd/wAFZoLyW6t/2n9R1d5P3h/sv4ianbR5OflCSLCq9OgAHI96/WaigD8l7T4r/wDBYz9m/SdOu/Gnw4vvG2jWtvJaJDeWFtr74UFvOuJtMlN2CoH+slkCnuSa1PB3/BarxP4evU8MfHb9njyNWsb2S11ifR7+SzktdrlWQWF0jMJUwQVe4XJB+70r9VK5T4h/Cn4a/FrQm8M/EzwNoviXTGnS6+zalZpMqzorKkqkjKuFd1DKQdrsM4YggHkH7M/7en7Pv7U1zeaT4H1i80PXbWVY49E8R/ZrS/vFKM3mW0aTSCdQEfdsYsmAWChlJ+iq/O74zf8ABGT4QeMPEcOvfBj4han8N4JGY3emy2bavar8iBDbF5o5ovmV2YPJICZBt8sKFPgkdp/wVW/Ya0aHw14b0+/8RfDrw/q7w2C22nWmtWt3E7sykpGHvraB9pOCYgjSAZVnGQD9jKK/Ov8AZh/4K8eHPij440n4bfG/wPpngO6vIZIpPEQ1jZp32xQSEkimQG2RsFQWmkw+0HrkfokjpIiyRsGVgCrA5BHqKAHUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXyV/wVP8ZW3hH9inxratq81hfeI7jTdGsfKLK07veRSzQ5XorW0NzuzwVBXvg/Wtfmf/wW+8balp/w4+GHw6htrY2Gu61f6zPMwPnJLYwRxRqpzjawv5S2QTlEwRyCAdn/AMEXfDi6Z+zD4h8QSWxSfWvGN0Vk3kiSCK1tkX5c4GH87kDJzznAx9+18r/8EvY3i/YW+GSuuCV1hvwOr3hH6GvqigAooooAKKKKACiiigD4D/4KofsXXfxt8HR/HP4c2FiPFvgzT531mN2kWXU9IhjeXbEBlWmibeVUqC6yMN+UjRrv/BI39onWPi78ENV+HHjDW7rUte+HlzBbwTXLBnbSpkP2ZA33n8toZkyc4XyxnoB91XVrbXttNZXtvFcW9xG0UsUqB0kRhhlZTwQQSCD1r8XfgLY3f7FH/BUeT4Xo9xp/hnWdYn8PQxSSh/P0vUAJNODOc7isjWhZuuY3BwcigD9p6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8c/+CyviiTxp+0T4B+FehXdzqV3o2iqDp0K7vLvL64wEUAZMjpFBkc8eXjnNfsZX5GftpW+lx/8ABWj4PvZaj5802r+DJL2PcD9nnGpACPA6ZjWJ8H/npnvQB+r3hbwv4e8E+G9M8IeE9It9L0bR7WOysbO3XbHBCihVUD2A6nk9Tk1q0UUAFFFFABRRRQAUUUUAFfjT/wAFkPDdr4d/ae8E+NdGL29/rPh63edkD8z211IqSg9N2wxrhTx5YOBnJ/ZavyR/4LVaiyfFr4R2j294Y7XTLu53GU+Q5e5jBVFx8rjyxubJyGj4G3kA/W6iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArP17xBoPhXRrvxF4o1uw0fSrCMzXd9f3KW9vbxjq8kjkKi+5IFaFeB/t7eDT47/Y5+LOiC7Nt9m8OTazvBxn7Ay3uzofvfZtv/Au3WgD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2f2irxn9qr9lz4f/ALV3wxuvAfjKFbTUrcPPoWtxRBrjSrsgYdc/ejbCrJFkB1HVWVHQA9U8NeJNB8Y+HtN8V+F9Vt9T0jV7WO9sby3fdHPBIoZHU+hBFaVfmh+wX+xj+2t+zj8d7YeNfF8Fp8L9NS+a+sLPxC9xYarJJC6RPBaYG1xL5Um+SONtqEZydp/S+gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9k=';
        
        //Load Default Signature Panel Values
        var defaultSignature = { };
        for(var i=0; i <= 12; i++) {
            defaultSignature.name = "Patrick";
            defaultSignature.date = "10/05/15";
            defaultSignature.tb_AtRisk = "YES";
            defaultSignature.signature = signImage;
            
            signatures.push(defaultSignature);
        }
        
        for (var i=0; i < signatures.length;i++) {
           if (i==0) {
               doc.text(16.5,100.5, signatures[0].name);
               doc.text(235.5,100.5,signatures[0].date);
               doc.text(194.5,100.5,signatures[0].tb_AtRisk);
               doc.addImage(signImage, 'JPEG', 102.5, 106.5, 60, 4);
           }
           if (i==1) {
               doc.text(16.5,105.5,signatures[1].name);
               doc.text(235.5,105.5,signatures[1].date);
               doc.text(194.5,105.5,signatures[1].tb_AtRisk);
               //doc.text(102.5,105.5,signatures[1].signature,signImage);
               //doc.addImage(signImage, 'JPEG', 102.5, 100.5, 100, 100);
           }
           if (i==2) {
               doc.text(16.5,110.5,signatures[2].name);
               doc.text(235.5,110.5,signatures[2].date);
               doc.text(194.5,110.5,signatures[2].tb_AtRisk);
               //doc.text(102.5,110.5,signatures[2].signature,signImage);
               //doc.addImage(signImage, 'JPEG', 102.5, 100.5, 100, 100);
           }
           if (i==3) {
               doc.text(16.5,114.5,signatures[3].name);
               doc.text(235.5,114.5,signatures[3].date);
               doc.text(194.5,114.5,signatures[3].tb_AtRisk);
               //doc.text(102.5,114.5,signatures[3].signature,signImage);
               //doc.addImage(signImage, 'JPEG', 102.5, 100.5, 100, 100);
           }
           if (i==4) {
               doc.text(16.5,120.5,signatures[4].name);
               doc.text(235.5,120.5,signatures[4].date);
               doc.text(194.5,120.5,signatures[4].tb_AtRisk);
               //doc.text(102.5,120.5,signatures[4].signature,signImage);
               //doc.addImage(signImage, 'JPEG', 102.5, 100.5, 100, 100);
           }
           if (i==5) {
               doc.text(16.5,124.5,signatures[5].name);
               doc.text(235.5,124.5,signatures[5].date);
               doc.text(194.5,124.5,signatures[5].tb_AtRisk);
               //doc.text(102.5,124.5,signatures[5].signature,signImage);
               //doc.addImage(signImage, 'JPEG', 102.5, 100.5, 100, 100);
           }
            if (i==6) {
               doc.text(16.5,129.5,signatures[6].name);
               doc.text(235.5,129.5,signatures[6].date);
               doc.text(194.5,129.5,signatures[6].tb_AtRisk);
               //doc.text(102.5,129.5,signatures[6].signature);
               //doc.addImage(signImage, 'JPEG', 102.5, 100.5, 100, 100);
           }
           if (i==7) {
               doc.text(16.5,134.5,signatures[7].name);
               doc.text(235.5,134.5,signatures[7].date);
               doc.text(194.5,134.5,signatures[7].tb_AtRisk);
               //doc.text(102.5,134.5,Signatures[7].signature,signImage);
               //doc.addImage(signImage, 'JPEG', 102.5, 100.5, 100, 100);
           }
           if (i==8) {
               doc.text(16.5,139.5,signatures[8].name);
               doc.text(235.5,139.5,signatures[8].date);
               doc.text(194.5,139.5,signatures[8].tb_AtRisk);
               //doc.text(102.5,139.5,Signatures[8].signature,signImage);
               //doc.addImage(signImage, 'JPEG', 102.5, 100.5, 100, 100);
           }
           if (i==9) {
               doc.text(16.5,144.5,signatures[9].name);
               doc.text(235.5,144.5,signatures[9].date);
               doc.text(194.5,144.5,signatures[9].tb_AtRisk);
               //doc.text(102.5,144.5,signatures[9].signature,signImage);
               //doc.addImage(signImage, 'JPEG', 102.5, 100.5, 100, 100);
           }
           if (i==10) {
               doc.text(16.5,149.5,signatures[10].name);
               doc.text(235.5,149.5,signatures[10].date);
               doc.text(194.5,149.5,signatures[10].tb_AtRisk);
               //doc.text(102.5,149.5,signatures[10].signature,signImage);
               //doc.addImage(signImage, 'JPEG', 102.5, 100.5, 100, 100);
           }
           if (i==11) {
               doc.text(16.5,154.5,signatures[11].name);
               doc.text(235.5,154.5,signatures[11].date);
               doc.text(194.5,154.5,signatures[11].tb_AtRisk);
               //doc.text(102.5,154.5,signatures[11].signature,signImage);
               //doc.addImage(signImage, 'JPEG', 102.5, 100.5, 100, 100);
           }
           
       }  
}
    
    return {
        createPdf: function () {
            doc = new jsPDF('landscape', 'mm', 'a4');
            page1 = convertImage2Base64('./img/page1.PNG');
            page2 = convertImage2Base64('./img/page2.PNG')
            buildPDF();
            return true;
        }
    };
});