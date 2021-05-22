(function () {
    
 

    $(document).on('click', '.btn-product-image', function () {
        // console.log('uploading image');
        var btn = $(this);
        var uploadInp = btn.next('input[type=file]');
        uploadInp.change(function () {
            if (validateImgFile(this)) {
                btn.html('');
                previewURL(btn, this);
            }
        }).click();
    });

    function previewURL(btn, input) {
        if (input.files && input.files[0]) {
            // collecting the file source
            var file = input.files[0];
            // preview the image
            var reader = new FileReader();
            reader.onload = function (e) {
                var src = e.target.result;
                btn.attr('src', src);
            };
            reader.readAsDataURL(file);
        }
    }

    function validateImgFile(input) {
            if (input.files && input.files[0]) {

                // collecting the file source
                var file = input.files[0];
                // validating the image name
                if (file.name.length < 1) {
                    alert("The file name couldn't be empty");
                    return false;
                }
               
                else if (file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg') {
                    alert("The file does not match png, jpg or gif");
                    return false;
                }
                return true;
            }
    }
    ///////////////////// multi images //////////////////
    /***********************************************************************
         * loading new file image and uploading files
         **********************************************************************/

    $(document).on('click', '.file-generate', function () {
        var $this = $(this);
        var fileBox = $this.closest('.file-box');
        var newBox = $('div.file-box:first').clone();  // clone makes a copy of all the selected element
        // newBox.find('img').prop('src', 'https://placeholdit.imgix.net/~text?txtsize=33&txt=290%C3%97180%20or%20larger&w=290&h=180');
        newBox.find('.caption').append('<button type="button" class="file-remove btn btn-danger"><i class="fa fa-minus" aria-hidden="true"></i>-</button>');
        fileBox.after(newBox);

    });

    $(document).on('click', '.file-remove', function () {
        var $this = $(this);
        $this.closest('.file-box').remove();
    });


    $(document).on('click', '.file-btn', function () {
        $(this).closest('.file-box').find('input[type=file]').click();
    });

    $(document).on('change', '.file-box input[type=file]', function () {
        var fileBtn = $(this).closest('.file-box').find('.file-btn');
        if (validateImgFile(this)) {
            previewURL(fileBtn, this);
        }
    });
   
    /////////////////////////////////////////////////////
    $(document).on('click', ".ajax-delete", function (e) {
        // console.log('fknikn');
        e.preventDefault();
        var $this = $(this);
      
        $.ajax({
            method: "POST",
            dataType: 'json',
            url: $(this).data('url'),
            data: {
                _token: $(this).data('csrf'),
            },
            success: function (response) {
                $this.closest('.ajax-target').remove();
            },
            error: function () {
                alert('Internal Server Error.');
            }    
        });

    });
    ////////////////////////////////////////////////////////////

    function request(url, data, completeHandler, errorHandler, progressHandler) {
        if (typeof progressHandler === 'string' || progressHandler instanceof String) {
            method = progressHandler;
        } else {
            method = "POST"
        }

        $.ajax({
            url: url, //server script to process data
            type: method,
            xhr: function () {  // custom xhr
                myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload && $.isFunction(progressHandler)) { // if upload property exists
                    myXhr.upload.addEventListener('progress', progressHandler, false); // progressbar
                }
                return myXhr;
            },
            // Ajax events
            success: completeHandler,
            error: errorHandler,
            // Form data
            data: data,
            // Options to tell jQuery not to process data or worry about the content-type
            cache: false,
            contentType: false,
            processData: false
        }, 'json');
    }
    
    /***********************************************************************
     * Notify with a message in shape of fancy alert
     **********************************************************************/

   
    /***************************************************************************
     * identify Tinymce
     **************************************************************************/
    if (typeof tinymce !== "undefined") {
        /*Text area Editors
         =========================*/

        tinymce.init({
            selector: '.tiny-editor',
            height: 300,
            theme: 'modern',
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code'
            ],
            toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            content_css: '//www.tinymce.com/css/codepen.min.css'
        });

    }

})(); 