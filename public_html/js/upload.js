var form = '#upload';                               // Define the FORM-Selector
var uploadButton = "input[type='button']";          // Define the tpye of <input type=button.
var inputFile = "input[type='file']";               // Define the type of <input type=file 
var selectedOutput = '#upload #prevUpload';         // Define the Output of <ul>
var filenameLength = 35;



$(function() {
    /** Use 2 Buttons to Simuluate a Click to 
     *  show the File Browser Dialog
     */

    $(uploadButton).click(function() {
        $(this).parent().find(inputFile).click();
    });

    $(form).fileupload({
        add: function(e, data) {
            // e.preventDefault()       Keine Weiterleitung
            
            var filetype = data.files[0].type.split('/');
            var filename = checkFileName(data.files[0].name,filetype,filenameLength);
            var filesize = formatFileSize(data.files[0].size);
                
            if (filetype[0] !== 'image') {
                // Show Error Msg
                var error = $('<div class="error" title="'+data.files[0].name+'><i class="fa fa-exclamation-triangle"></i>File: '+ checkFileName(data.files[0].name,filetype,20) +' </b>wird nicht unterstützt<span class="filesize"><a><i class="fa fa-times-circle"></i></a></span></div>');
               
                error.prependTo(selectedOutput).delay(5000);
                // Click function on Cancel Icon
                error.find('a i').on("click", function() {
                    error.remove();
                });
                error.fadeOut(800);
                // Destroy non Image Data
                data = null;
            }

            var tpl = $('<div class="borderclear"><i class="fa fa-picture-o"></i><span class="filename" title="'+data.files[0].name+'"></span><span class="filesize"></span></div>');
            
            if (data !== null) {

                // Append the file name and file size
                tpl.find('.filename').text(filename);
                tpl.find('.filesize').append(filesize + '<a><i class="fa fa-times-circle"></i></a>');
                // Add the HTML to the P element
                data.context = tpl.appendTo(selectedOutput);


                tpl.find('a i').on("click", function() {
                    tpl.remove();
                });
                
                

            }
        }


    })

});
;






function formatFileSize(bytes) {
    if (typeof bytes !== 'number') {
        return '';
    }
    if (bytes >= 1000000000) {
        return (bytes / 1000000000).toFixed(2) + ' GB';
    }
    if (bytes >= 1000000) {
        return (bytes / 1000000).toFixed(2) + ' MB';
    }

    return (bytes / 1000).toFixed(2) + ' KB';
}

function checkMimeType(filetype) {
    var type = filetype.split('/');
    
    switch (type[0]) {

        case 'text':        return type;break;
        case 'image':       return type;break;
        case 'video':       return type;break;
        case 'audio':       return type;break;
        case 'application': return type;break;
        case 'multipart':   return type;break;
        case 'model':       return type;break;
        default:            return type;


    }
}

function checkFileName(filename,filetype,length){   
    if (filename.length > length) {
        filename = filename.substring(0, length) + "...";
    }   
    return filename;
};
