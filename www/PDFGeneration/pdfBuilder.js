app.factory('jsPdfBuilder', function ($ionicLoading, $cordovaFile, formInfo) {
    'use strict';
    var doc = {},
        pdfOutput = {},
        blob = {},
        img64 = '';
    
    function save(filepath) {
        $cordovaFile.createFile(cordova.file.documentsDirectory, "JSA_Form.pdf", true);
        $cordovaFile.writeFile(cordova.file.documentsDirectory, "JSA_Form.pdf", pdfOutput, true)
            .then(function (success) {
                console.log("works");
            }, function (error) {
                console.log("doesnt work");
            });
    }
    
    function BasicInfo() {
        var gcinfo = angular.copy(formInfo.getgcinfo()),
            subinfo = angular.copy(formInfo.getgcinfo());
        
        doc.setFontSize(12);
        doc.text( 40, 21.5, gcinfo.subcontractor);
        doc.text( 47, 26, gcinfo.generalcontractor);
        doc.text( 132, 21.5, gcinfo.crewleader);
        doc.text( 142, 26, gcinfo.gcsuperintendent);
        doc.text( 221, 21.5, gcinfo.projectname);
        doc.text( 207, 26, gcinfo.basicinfostartdate);
        doc.text( 32, 30.5, gcinfo.jobscope);
    }
    
    function PPEInfo() {
        var ppeinfo = angular.copy(formInfo.getppeinfo());
        
        doc.setFontSize(12);
        doc.text( 94, 41.5, ppeinfo.cb_RespiratorType);
        doc.text( 89, 46, ppeinfo.cb_GlovesType);
        doc.text( 84, 50.5, ppeinfo.cb_Clothing);
        doc.text( 173, 50.5, ppeinfo.cb_ChemClothing);
        doc.text( 236, 50.5, ppeinfo.tb_Other);
    }
    
    function buildPDF() {
        doc.addImage(img64, 'JPEG', 10, 10, 275, 190);
        BasicInfo();
        PPEInfo();
        
        doc.output('dataurlnewwindow');
        pdfOutput = doc.output("blob");      
        //doc.save("JSA_Form.pdf");
        //save("temp/JSA_Form.pdf");
    }
    
    function onLoaded() {
        buildPDF();
    }
    
    function convertImage2Base64(url) {
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
            convertImage2Base64('./img/Page1.jpg');
            return true;
        }
    };
});