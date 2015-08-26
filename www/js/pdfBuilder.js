app.factory('jsPdfBuilder', function() {
    'use strict';
    var instance = {};
    var img64 = '';
    
    instance.createPdf = function () {
        var doc = new jsPDF('landscape', 'mm', 'a4');
        
        convertImage2Base64('./img/page1.PNG');
        
        doc.setFontSize(40);
        doc.addImage(img64, 'JPEG', 10, 10, 279, 190);
        doc.text(35, 25, "This is our PDF");
        doc.output('dataurlnewwindow');
    };
    return instance;
    
    function convertImage2Base64(url) {
        var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            var dataUrl;
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataUrl = canvas.toDataURL("image/jpeg", 0.5);
            img64 = dataUrl;
            canvas = null;
        }
        img.src = url;
    };
});