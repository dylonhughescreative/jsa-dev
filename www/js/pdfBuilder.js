app.factory('jsPdfBuilder', function ($ionicLoading) {
    var instance = {},
        doc = {},
        pdfOutput = '',
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
        //var pdfOutput = doc.output();
        doc.save("JSA_Form.pdf");
        //save("temp/JSA_Form.pdf");
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
    
    //function save(filepath) {
    //    $ionicLoading.show({
    //        template: 'Saving...'
    //    });
    //    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    //        fs.root.getDirectory("temp", { create: true },
    //                function (dirEntry) {
    //                dirEntry.getFile("JSA_Form.pdf", { create: true, exclusive: false },
    //                        function gotFileEntry(fe) {
    //                        var fileEntry = fe.toURL();
    //                        fileTransfer = new FileTransfer();
    //                        fileTransfer.download(pdfOutput,
    //                            fileEntry,
    //                            function (entry) {
    //                                $ionicLoading.hide();
    //                                //$scope.imgFile = entry.toURL();
    //                            },
    //                            function(error) {
    //                                $ionicLoading.hide();
    //                                alert("Download Error Source -> " + error.source);
    //                            },
    //                            false,
    //                            null
    //                            );
    //                                                        
    //                    });
    //            },
    //            function () {
    //                $ionicLoading.hide();
    //                console.log("Request for filesystem failed");
    //            });
    //    });
    //}
});