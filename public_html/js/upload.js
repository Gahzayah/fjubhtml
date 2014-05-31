var form = '#upload';                                // Define the FORM-Selector
var btnAdd = "input[name='add']";                      // Define the ADD-Button
var btnFileType = "input[name='files']";                    // Define the FILE-TYPE-Button
var btnUpload = "input[name='upload']";                   // Define the UPLOAD-Button
var selectedOutput = '#upload #prevUpload';                    // Define the Output of <ul>
var filenameLength = 35;
var data_ = null;



$(function() {
    $(btnAdd).click(function() {
        $(this).parent().find(btnFileType).click();
    });

    $(form).fileupload({
        url: 'http://localhost:8084/Sandbox/databasetest',
        async: true,
        type: 'POST',
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request


        add: function(e, data) {
             // Form Is not submitted in Chrome and IE.. for firefox it submits the from to same url that i am in.

            var filetype = data.files[0].type.split('/');
            var filename = checkFileName(data.files[0].name, filetype, filenameLength);
            var filesize = formatFileSize(data.files[0].size);

            var tpl = $('<div class="borderclear">\n\
                            <i class="fa fa-picture-o"></i><span class="filename" title="' + data.files[0].name + '"></span><span class="filesize"></span>\n\
                        </div>');

            // Append the file name and file size
            tpl.find('.filename').text(filename);
            tpl.find('.filesize').append(filesize + '<a><i class="fa fa-times-circle"></i></a>');
            // Add the HTML to the DIV element
            tpl.appendTo(selectedOutput);

            if ($(selectedOutput).children().length !== 0) {
                $(btnUpload).prop('type', 'button');
                $("input[name='uploadXhr']").prop('type', 'button');
            }

            $(btnUpload).click(function() {
                data.submit();
            });

            $("input[name='uploadXhr']").click(function() {
                xhrFunc(data);
            });



        },
        done: function(e, data) {
            // $('#ajaxResponse').html('<p>Finish</p>');
        }
    });
});

$("input[name='uploadXhr']").click(function() {
    xhrFunc();
});

function xhrFunc(data) {

    var http = new XMLHttpRequest();
    var formData = new FormData();
    var file = data;
    
    var url = "http://localhost:8084/Sandbox/databasetest";
    var params = "lorem=ipsum&name=binny"; // String Pair Value
    
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Content-length", params.length);
    http.setRequestHeader("Connection", "close");

    http.onreadystatechange = function() {//Call a function when the state changes.
        if (http.status === 200) {
            alert(http.responseText);
        }
    };
   

    
    formData.append("thefile", file);
    http.send(formData);

}


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


function checkFileName(filename, filetype, length) {
    if (filename.length > length) {
        filename = filename.substring(0, length) + "...";
    }
    return filename;
}
;
