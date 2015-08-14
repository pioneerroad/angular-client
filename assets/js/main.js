$(document).ready(function() {

    /** Open the notification panel when user clicks on the notification icon */
    $('#notificationPanelCtrl').on('tap', function(event) {
        $('#notification-panel').toggleClass('is-visible');
    });

    /** Open the messages panel when user clicks on the messages icon */
    $('#messagesPanelCtrl').click(function(event) {
        $('#messages-panel').toggleClass('is-visible');
        $('main').toggleClass('no-scroll');
    });

    $('.friend-actions #new-message').on('tap', function(event) {
        $('#messages-panel').toggleClass('is-visible');
        $('main').toggleClass('no-scroll');
    });

    $('#user-profile-rig-img').on('tap', function(event) {
        $('#user-profile-rig-img-panel').addClass('is-visible');
        $('main').toggleClass('no-scroll');
    });

    /** Close any open panels and reset classes to default */
    $('.close').click(function(event) {
        $('.is-visible').removeClass('is-visible');
        $('.shift-left').removeClass('shift-left');
        $('main').removeClass('no-scroll');
        $('.nav-back button').addClass('hidden');
    });

    /** Slide open the message conversation thread panel when user clicks on a message thread */
    /** This needs to pass the thread ID to a function that will load the conversation thread from server*/
    $('.msg-panel .msg-conversation-list .well').on('tap', function(e) {
        $('.msg-panel').addClass('shift-left');
        $('.title-panel .hidden').removeClass('hidden');
    });

    /** Show hide the navigation buttons */
    $('.title-panel .nav-back').on('tap', function(e) {
        $('.msg-panel').removeClass('shift-left');
        $('.nav-back button').addClass('hidden');
    });

    $('main').height(window.innerHeight - ($('.menu-bar.top').height() + $('.menu-bar.bottom').height())); //* Init height of main content panel */

    $(window).resize(function(event) { //Update height of main content panel after resize
        var usableHeight = window.innerHeight;
        $('main').height(usableHeight - ($('.menu-bar.top').height() + $('.menu-bar.bottom').height()));
    });

    $('#msg-new-conversation #addRecipient').on('tap', function(event) {
        if ($('#nickname').val() != '') {
            $('.msg-recipient-list ul').append('<li class="recipient">'+$('#nickname').val()+'&nbsp;&nbsp;<span class="glyphicon glyphicon-remove"></span></li>');
        }
        $('#nickname').val('');
    });

    $('#startNewConversation').on('tap', function(event) {
        $('#msg-new-conversation .body').toggleClass('show');
        $(this).children('.glyphicon').toggleClass('glyphicon-pencil');
        $(this).children('.glyphicon').toggleClass('glyphicon-remove');
        return false;
    });

    $('.msg-recipient-list').on('tap', '.recipient', function(e) {
        $(this).remove();
        return false;
    });

    $('#postMessage').on('tap', function(e) {
        $('.msg-panel').addClass('shift-left');
        $('.title-panel .hidden').removeClass('hidden');
    });

    $('.friend-action .accept').on('tap', function(e) {
        $(this).parent('.input-group').remove();
        $(this).parents('.well').remove();
    });

    $('.jcarousel').jcarousel();
    $('.jcarousel img').on('tap', function(event) {
        $('.jcarousel').jcarousel('scroll','+=1');
    })
    $('.jcarousel img').on('swipeleft', function(event) {
        $('.jcarousel').jcarousel('scroll','+=1');
    });
    $('.jcarousel img').on('swiperight', function(event) {
        $('.jcarousel').jcarousel('scroll','-=1');
    })

});
