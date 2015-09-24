$(document).ready(function() {

    var dimensions;

    /*(function init() {
     dimensions = getSegmentHeights();
     $('body').height(dimensions.bodyHeight);
     $('#user-profile-photo-container').height(dimensions.bgPhotoHeight);
     })();*/

    $(window).resize(function(event) {
        dimensions = getSegmentHeights();
        $('body').height(dimensions.bodyHeight);
        $('main').height(dimensions.bodyHeight);
        $('#user-profile-photo-container').height(dimensions.bgPhotoHeight);
    });

    $('#slideMenuToggle').on('tap', function(event) {
        $('main').toggleClass('menu-active');
        return false;
    });

    $('body').on('touchstart', '.menu-active .content', function(event) {
        $('main').removeClass('menu-active');
        return false;
    });

    $('.menu-item').on('tap', function(event) {
        var target = $(this);
        var location = target.data('target');
        console.log("clicked");
        window.location.assign(location+'Menu.html');
    });

    $('#editBioInput').on('keyup', function(event) {
        var maxCharacter = 150;
        var val = $(this).val();
        var remainingChar = maxCharacter - val.length;
        $(this).closest('.field-edit-wrapper').find('.character-count').replaceWith('<div class="character-count badge">'+remainingChar+'</div>');
    });

    $('.toggle-field-edit').on('tap', function(event) {
        var targetInput = $(this).closest('.field-edit-wrapper').find('input, textarea');
        var attr = targetInput.attr('disabled');
        if (typeof attr !== typeof undefined && attr !== false) {
            targetInput.removeAttr('disabled');
            $(this).closest('.field-edit-wrapper').find('.status-badge').addClass('hidden');
        } else {
            targetInput.attr('disabled','');
            $(this).closest('.field-edit-wrapper').find('.status-badge').removeClass('hidden');
        };

        $(this).children('span').toggleClass('glyphicon-pencil');
        $(this).children('span').toggleClass('glyphicon-ok');
    });

    removeIOSRubberEffect(document.querySelector('.content'));
    removeIOSRubberEffect(document.querySelector('.slide-menu'));
});

function getSegmentHeights() {
    var dims = {};
    dims.bodyHeight = $(document).height();
    dims.bgPhotoHeight = $('#user-profile-bg-photo img').height();
    return dims;
};

function removeIOSRubberEffect(element) {
    element.addEventListener("touchstart", function () {

        var top = element.scrollTop, totalScroll = element.scrollHeight, currentScroll = top + element.offsetHeight;

        if ( top === 0 ) {
            element.scrollTop = 1;
        } else if ( currentScroll === totalScroll ) {
            element.scrollTop = top - 1;
        }

    } );

}
