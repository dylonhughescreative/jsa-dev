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
        //NEXT SAVE IT TO THE DEVICE'S LOCAL FILE SYSTEM
        console.log("file system...");
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
            
            console.log(fileSystem.name);
            console.log(fileSystem.root.name);
            console.log(fileSystem.root.fullPath);
            
            fileSystem.root.getFile("test.pdf", {create: true}, function(entry) {
                var fileEntry = entry;
                console.log(entry);
                
                entry.createWriter(function(writer) {
                    writer.onwrite = function(evt) {
                        console.log("write success");
                    };
                    
                    console.log("writing to file");
                    writer.write( pdfOutput );
                }, function(error) {
                    console.log(error);
                });
                
            }, function(error){
                console.log(error);
            });
        },
        function(event){
            console.log( evt.target.error.code );
        });
    }
    
    function load() {
        $ionicLoading.show({
            template: 'Loading...'
        });
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
            fs.root.getFile(
            "test.pdf", 
            {
                create: false, 
                exclusive: false
            }, 
            function gotFileEntry(fe) {
                $ionicLoading.hide();
                $scope.imgFile = fe.toURL();
            }, 
            function(error) {
                $ionicLoading.hide();
                console.log("Error getting file");
            });
        },
        function() {
            $ionicLoading.hide();
            console.log("Error requesting filesystem");
        });
    }
});