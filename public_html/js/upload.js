var form                   = '#upload';                       // Define the FORM-Selector
var uploadButton           = "input[type='button']";          // Define the tpye of <input type=button.
var inputFile              = "input[type='file']";            // Define the type of <input type=file 
var selectedOutput         = '#upload div';                    // Define the Output of <ul>
var counter = 0;


$(function() {
    /** Use 2 Buttons to Simuluate a Click to 
     *  show the File Browser Dialog
     */

    $(uploadButton).click(function() {
        $(this).parent().find(inputFile).click();
    }); 

    $(form).fileupload({
       
        
    }).bind('fileuploadadd', function (e, data) {
        
        var tpl = $('<p><i class="fa fa-picture-o"></i><span></span><a href=""><i class="fa fa-times-circle"></i></a></p>');

        // Append the file name and file size
        tpl.find('span').text(data.files[0].name)
                     .append('<code>' + formatFileSize(data.files[0].size) + '</code>');

        // Add the HTML to the P element
        data.context = tpl.appendTo(selectedOutput);
        
        tpl.find('a').click(function(){
                
            tpl.fadeOut(function(){
                tpl.find('p').remove();
            });
            
        });
        
        counter = counter + 1;

            
    });;


});

 function formatFileSize(bytes) {
        if (typeof bytes !== 'number') { return '';}
        if (bytes >= 1000000000) {return (bytes / 1000000000).toFixed(2) + ' GB';}
        if (bytes >= 1000000) { return (bytes / 1000000).toFixed(2) + ' MB';}

        return (bytes / 1000).toFixed(2) + ' KB';
    }