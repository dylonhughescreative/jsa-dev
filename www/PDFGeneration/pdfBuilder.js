app.factory('jsPdfBuilder', function ($ionicLoading, $cordovaFile) {
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
    
    function onLoaded() {
        doc.setFontSize(40);
        doc.addImage(img64, 'JPEG', 10, 10, 275, 190);
        doc.text(35, 25, "New PDF");
        //doc.output('dataurlnewwindow');
        pdfOutput = doc.output("blob");
        
        //doc.save("JSA_Form.pdf");
        save("temp/JSA_Form.pdf");
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