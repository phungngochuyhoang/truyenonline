$(document).ready(function() {
// effect login
    $('.input-effect-username').on('change', function(e) {
        if(e.target.value) {
            $('#username').css({
                top: '-15px',
                opacity: 1
            })
        }else {
            $('#username').css({
                top: '0',
                opacity: 0
            })
        }
    })
    $('.input-effect-password').on('change', function(e) {
        if(e.target.value) {
            $('#password').css({
                top: '-15px',
                opacity: 1
            })
        }else {
            $('#password').css({
                top: '0',
                opacity: 0
            })
        }
    })
    $('.input-effect-email').on('change', function(e) {
        if(e.target.value) {
            $('#email').css({
                top: '-15px',
                opacity: 1
            })
        }else {
            $('#email').css({
                top: '0',
                opacity: 0
            })
        }
    })
    $('.input-effect-password-retype').on('change', function(e) {
        if(e.target.value) {
            $('#password-retype').css({
                top: '-15px',
                opacity: 1
            })
        }else {
            $('#password-retype').css({
                top: '0',
                opacity: 0
            })
        }
    })
// effect login
})
