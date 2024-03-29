
$(document).ready(function () {

    /** Close any open panels and reset classes to default */
    $('.close').click(function (event) {
        $('.is-visible').removeClass('is-visible');
        $('.shift-left').removeClass('shift-left');
        $('main').removeClass('no-scroll');
        $('.nav-back button').addClass('hidden');
    });

    /** Slide open the message conversation thread panel when user clicks on a message thread */
    /** This needs to pass the thread ID to a function that will load the conversation thread from server*/
    $('.msg-panel .msg-conversation-list .well').on('tap', function (e) {
        $('.msg-panel').addClass('shift-left');
        $('.title-panel .hidden').removeClass('hidden');
    });

    /** Show hide the navigation buttons */
    $('.title-panel .nav-back').on('tap', function (e) {
        $('.msg-panel').removeClass('shift-left');
        $('.nav-back button').addClass('hidden');
    });

    $('main').height(window.innerHeight - ($('.menu-bar.top').height() + $('.menu-bar.bottom').height())); //* Init height of main content panel */

    $(window).resize(function (event) { //Update height of main content panel after resize
        var usableHeight = window.innerHeight;
        $('main').height(usableHeight - ($('.menu-bar.top').height() + $('.menu-bar.bottom').height()));
    });

    $('#msg-new-conversation #addRecipient').on('tap', function (event) {
        if ($('#nickname').val() != '') {
            $('.msg-recipient-list ul').append('<li class="recipient">' + $('#nickname').val() + '&nbsp;&nbsp;<span class="glyphicon glyphicon-remove"></span></li>');
        }
        $('#nickname').val('');
    });



    $('.msg-recipient-list').on('tap', '.recipient', function (e) {
        $(this).remove();
        return false;
    });

    $('#postMessage').on('tap', function (e) {
        $('.msg-panel').addClass('shift-left');
        $('.title-panel .hidden').removeClass('hidden');
    });

    $('.friend-action .accept').on('tap', function (e) {
        $(this).parent('.input-group').remove();
        $(this).parents('.well').remove();
    });

    $('.jcarousel').jcarousel();
    $('.jcarousel img').on('tap', function (event) {
        $('.jcarousel').jcarousel('scroll', '+=1');
    });
    $('.jcarousel img').on('swipeleft', function (event) {
        $('.jcarousel').jcarousel('scroll', '+=1');
    });
    $('.jcarousel img').on('swiperight', function (event) {
        $('.jcarousel').jcarousel('scroll', '-=1');
    });

    $('.subsection-selector a').on('tap', function (event) {
        $('.subsection-selector a').toggleClass('active');
        $('.subsection-panel').toggleClass('visible').toggleClass('hidden');
    });
    
    $('.menu-item').on('tap', function(event) {
        var target = $(this);
        var location = target.data('target');
        console.log("clicked");
        window.location.assign(location+'Menu.html');
    });

    /***** Popup menu display controls *****/
    /*$('.menu-bar .icon').click(function(event) {
     var target = $(this);
     var targetMenu, activeItem;
     
     $('.menu-bar .icon.active').each(function(index, e) {
     if ($(e).is(target)) {
     targetMenu = $('#'+target.data('menu')+'-menu');
     $(e).removeClass('active');
     targetMenu.removeClass('is-visible');
     activeItem = true;
     } else {
     targetMenu = $('#'+$(e).data('menu')+'-menu');
     $(e).removeClass('active');
     targetMenu.removeClass('is-visible');
     }
     });
     if (!activeItem) {
     target.addClass('active');
     $('#'+target.data('menu')+'-menu').addClass('is-visible');
     }
     
     });*/

 $('body').on('touchstart', '.menu-active .content', function(event) {
        $('main').removeClass('menu-active');
        return false;
    });

    $('body').on('touchstart', '.sitewide-nav .menu-item', function(event) {
         $('.sitewide-nav  .menu-item').removeClass('active');
         $('#' + event.currentTarget.id).toggleClass('active');    
    });

});

