var form            = '#upload';                                // Define the FORM-Selector
var btnAdd          = "input[name='add']";                      // Define the ADD-Button
var btnFileType     = "input[name='files']";                    // Define the FILE-TYPE-Button
var btnUpload       = "input[name='upload']";                   // Define the UPLOAD-Button
var selectedOutput  = '#upload #prevUpload';                    // Define the Output of <ul>
var filenameLength  = 35;
var data_ = null;



$(function() {
    /** Use 2 Buttons to Simuluate a Click to 
     *  show the File Browser Dialog
     */

    $(btnAdd).click(function() {
        $(this).parent().find(btnFileType).click();
    });

    $(form).fileupload({
        url: '/path/to/upload/handler.json',
        sequentialUploads: true,
        
        add: function(e, data) {
            // e.preventDefault()       Keine Weiterleitung
            data_ = data;
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
                // Add the HTML to the DIV element
                tpl.appendTo(selectedOutput);

                $(btnUpload).prop('type', 'submit'); 
                
                tpl.find('a i').on("click", function() {
                   
                   tpl.remove();
                   if($(selectedOutput).children().length===0){
                       $(btnUpload).prop('type', 'hidden');
                   } 
                });
            }
        }
    })
});
;
$(btnUpload).on('click',function(e){
    e.preventDefault();
    
        alert("assa")
        var formData = new FormData($(this)[0]);
       $.ajax({
            url: 'http://localhost:8084/Sandbox/databasetest',
            type: "POST",
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false
        }).done(function() {
            alert( "success" );
        }).fail(function() {
            alert( "error" );
        }).always(function() {
            alert( "complete" );
        });

});

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


function checkFileName(filename,filetype,length){   
    if (filename.length > length) {
        filename = filename.substring(0, length) + "...";
    }   
    return filename;
};
