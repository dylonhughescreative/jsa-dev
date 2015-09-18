app.factory('jsPdfBuilder', function ($ionicLoading, $cordovaFile, formInfo) {
    'use strict';
    var doc = {},
        pdfOutput = {},
        blob = {},
        img64 = '';
    
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
        var gcinfo = angular.copy(formInfo.getgcinfo()),
            subinfo = angular.copy(formInfo.getgcinfo());
        
        doc.setFontSize(12);
        doc.text( 40, 23.5, gcinfo.subcontractor);
        doc.text( 47, 28, gcinfo.generalcontractor);
        doc.text( 132, 23.5, gcinfo.crewleader);
        doc.text( 142, 28, gcinfo.gcsuperintendent);
        doc.text( 221, 23.5, gcinfo.projectname);
        doc.text( 207, 28, gcinfo.basicinfostartdate);
        doc.text( 32, 32.5, gcinfo.jobscope);
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
        var gcinfo = angular.copy(formInfo.getgcinfo()),
            subinfo = angular.copy(formInfo.getgcinfo());
        
        doc.setFontSize(16);
        doc.text( 125, 64.5, gcinfo.basicinfostartdate);
        doc.text( 200, 64.5, gcinfo.basicinfoenddate);
    }
    
    function buildPDF() {
        doc.addImage(img64, 'JPEG', 10, 10, 275, 190);
        BasicInfo();
        PPEInfo();
        StartEndDate();
        
        doc.output('dataurlnewwindow');
        pdfOutput = doc.output("blob");      
        //doc.save("JSA_Form.pdf");
        //save("temp/JSA_Form.pdf");
    }
    
    function onLoaded () {
        buildPDF();
    }
    
    function convertImage2Base64 (url) {
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            var dataUrl;
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataUrl = canvas.toDataURL("image/jpeg", 0.8);
            img64 = dataUrl;
            canvas = null;
            onLoaded();
        };
        img.src = url;
    }
    
    return {
        createPdf: function () {
            doc = new jsPDF('landscape', 'mm', 'a4');
            convertImage2Base64('./img/Page1.png');
            return true;
        }
    };
});