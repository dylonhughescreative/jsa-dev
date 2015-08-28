app.factory('jsPdfBuilder', function ($ionicLoading, $cordovaFile) {
    var instance = {},
        doc = {},
        pdfOutput = {},
        blob = {},
        img64 = '';
    
    instance.createPdf = function () {
        doc = new jsPDF('landscape', 'mm', 'a4');
        convertImage2Base64('./img/page1.PNG');
    };
    return instance;
    
    function onLoaded() {
        doc.setFontSize(40);
        doc.addImage(img64, 'JPEG', 10, 10, 279, 190);
        doc.text(35, 25, "This is our PDF");
        //doc.output('dataurlnewwindow');
        pdfOutput = doc.output();
        
        var buffer = new ArrayBuffer(pdfOutput.length);
        var array = new Uint8Array(buffer);
        
        for (var i=0; i<pdfOutput.length; i++)
        {
            array[i] = pdfOutput.charCodeAt(i);
        }
        
        blob = new Blob(
            [array],
            {type: 'application/pdf', enconding: 'raw'}
        );
        
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
            dataUrl = canvas.toDataURL("image/jpeg", 0.5);
            img64 = dataUrl;
            canvas = null;
            onLoaded();
        };
        img.src = url;
    }
    
    function save(filepath) {
        $cordovaFile.createFile(cordova.file.documentsDirectory, "JSA_Form.pdf", true);
        $cordovaFile.writeFile(cordova.file.documentsDirectory, "JSA_Form.pdf", blob, true)
            .then(function (success) {
                console.log("works");
            }, function (error) {
                console.log("doesnt work");
            });
    }
});