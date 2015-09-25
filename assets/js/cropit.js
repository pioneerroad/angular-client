$(document).ready(function() {

    $('#editProfilePhoto').cropit();
    $('#editProfilePhoto').cropit('imageSrc', 'https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/matt-profile-200x200.jpg');

    $('#editBackgroundPhoto').cropit();
    $('#editBackgroundPhoto').cropit('imageSrc', 'https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/profile-photos/1/background-photos/1441153542313_414x140.jpg');

    $('.btn-file-input').click(function() {
        $(this).closest('.photo-edit-wrapper').children('.cropit-image-input').click();
    });
    
    $('.btn-file-upload').click(function() {
        var imageData = $(this).closest('.field-edit-wrapper').cropit('export', {
            type: 'image/jpeg',
            quality: .9,
            originalSize: true
        });
        var formData = new FormData();
        formData.append("imageFile", imageData);

        $.ajax({
            url: 'http://localhost:8081/api/v1/temp/photo',
            //headers: headers,
            data: formData,
            type: "POST",
            contentType: false,
            processData: false,
            success: function (response) {
                console.log(response);
            }
        });
    });
});
