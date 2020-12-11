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
// xoa dau
function xoa_dau(str) {
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
	str = str.replace(/đ/g, "d");
	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
	str = str.replace(/Đ/g, "D");
	str = str.replace(/\s+/g, '');
	return str.trim();
}