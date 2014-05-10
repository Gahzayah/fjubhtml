var form                   = '#upload';                       // Define the FORM-Selector
var uploadButton           = "input[type='button']";          // Define the tpye of <input type=button.
var inputFile              = "input[type='file']";            // Define the type of <input type=file 
var selectedOutput         = '#upload div';                    // Define the Output of <ul>


$(function() {
    /** Use 2 Buttons to Simuluate a Click to 
     *  show the File Browser Dialog
     */

    $(uploadButton).click(function() {
        $(this).parent().find(inputFile).click();
    }); 

    $(form).fileupload({
       
        
    }).bind('fileuploadadd', function (e, data) {
        
        var tpl = $('<p><i class="icon icon-picture"></i><span></span></p>');

        // Append the file name and file size
        tpl.find('span').text(data.files[0].name)
                     .append('<i>' + formatFileSize(data.files[0].size) + '</i>');

        // Add the HTML to the UL element
        data.context = tpl.appendTo(selectedOutput);
            
    });;


});

 function formatFileSize(bytes) {
        if (typeof bytes !== 'number') { return '';}
        if (bytes >= 1000000000) {return (bytes / 1000000000).toFixed(2) + ' GB';}
        if (bytes >= 1000000) { return (bytes / 1000000).toFixed(2) + ' MB';}

        return (bytes / 1000).toFixed(2) + ' KB';
    }