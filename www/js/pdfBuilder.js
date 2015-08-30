app.factory('jsPdfBuilder', function ($ionicLoading, $cordovaFile) {
    var instance = {},
        doc = {},
        pdfOutput = '',
        img64 = '';
    
    instance.createPdf = function () {
        doc = new jsPDF('landscape', 'mm', 'a4');
        convertImage2Base64('./img/page1.PNG');
        save("Rick.pdf", pdfOutput);
    };
    return instance;
    
    function onLoaded() {
        doc.setFontSize(40);
        doc.addImage(img64, 'JPEG', 10, 10, 279, 190);
        doc.text(35, 25, "This is our PDF");
        //doc.output('dataurlnewwindow');
        pdfOutput = doc.output();
        //doc.save("Rick.pdf");
        //save("Rick.pdf", pdfOutput);
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
    
    function save(filepath, pdfString) {
        $cordovaFile.createFile(cordova.file.documentsDirectory, filepath, true);
        $cordovaFile.writeFile(cordova.file.documentsDirectory, filepath, pdfString, true)
            .then(function (success) {
                console.log("works");
            }, function (error) {
                console.log("doesnt work");
            });
    }
});