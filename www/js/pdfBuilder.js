app.factory('pdfBuilder', function() {
    var instance = {};
    var docDefinition = { };
    var img64 = '';
    instance.createPdf = function() {
        convertImage2Base64('./img/page1.PNG');
        formatPDF();
        pdfMake.createPdf(docDefinition).open();
    }
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
            dataUrl = canvas.toDataURL();
            img64 = dataUrl;
            canvas = null;
        }
        img.src = url;
    }

    function formatPDF () {
        docDefinition = {
            pageOrientation: 'landscape',
            content: [
                {
                    image: img64,
                    width: 750,
                },
            ],
        }
    }
});