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
// in navbar
		let caret = 0;
	$('#in-navbar').on('click', () => {
		var inNav = document.getElementById('in-navbar');
		var nav1 = document.getElementById('navbar-1');
		var listName = document.querySelectorAll('.list-name');
		var nameUser = document.getElementById('name-user');
		caret++;
		if(caret % 2 == 1) {
			inNav.setAttribute('class', 'fas fa-caret-square-right');
			nav1.setAttribute('class', 'col-lg-1 col-xl-1');
			listName.forEach(item => item.classList.add('list-name-hidden'))
			nameUser.classList.add('list-name-hidden')
			$('.body-categories')[0].style.display = 'flex';
			$('.body-categories')[0].style.flexDirection = 'column';
			$('.body-categories')[0].style.alignItems = 'center';
		}else {
			inNav.setAttribute('class', 'fas fa-caret-square-left');
			nav1.setAttribute('class', 'col-lg-2 col-xl-2');
			listName.forEach(item => item.classList.remove('list-name-hidden'))
			nameUser.classList.remove('list-name-hidden')
			$('.body-categories')[0].setAttribute('style', '');
		}
	})
})
