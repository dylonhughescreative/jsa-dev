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
        doc.text( 40, 23.5, basicinfo.subcontractor);
        doc.text( 47, 28, basicinfo.generalcontractor);
        doc.text( 132, 23.5, basicinfo.crewleader);
        doc.text( 142, 28, basicinfo.gcsuperintendent);
        doc.text( 221, 23.5, basicinfo.projectname);
        doc.text( 207, 28, basicinfo.basicinfostartdate);
        doc.text( 32, 32.5, basicinfo.jobscope);
    }
    
    function PPEInfo () {
        var ppeinfo = angular.copy(formInfo.getppeinfo());
        
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
        doc.text( 125, 64.5, basicinfo.startdate);
        doc.text( 200, 64.5, basicinfo.enddate);
    }
    
    function buildPDF() {
        doc.addImage(page1, 'JPEG', 10, 10, 275, 190);
        //BasicInfo();
        PPEInfo();
        //StartEndDate();
        
        doc.addPage();
        doc.addImage(page2, 'JPEG', 10, 10, 275, 190);
        
        doc.output('dataurlnewwindow');
        pdfOutput = doc.output("blob");      
        //doc.save("JSA_Form.pdf");
        //save("temp/JSA_Form.pdf");
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
        createPdf: function () {
            doc = new jsPDF('landscape', 'mm', 'a4');
            page1 = convertImage2Base64('./img/page1.PNG');
            page2 = convertImage2Base64('./img/page2.PNG')
            buildPDF();
            return true;
        }
    };
});