var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor2');

document.addEventListener('mousemove', function(e) {
    var x = e.clientX;
    var y = e.clientY;
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function(e) {
    var x = e.clientX;
    var y = e.clientY;
    cursorinner.style.left = x + 'px';
    cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function() {
    cursor.classList.add('click');
    cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function() {
    cursor.classList.remove('click')
    cursorinner.classList.remove('cursorinnerhover')
});


$('document').ready(function() {

    var a = document.querySelectorAll('a');
    var change = document.querySelectorAll('.change');


    a.forEach(item => {
        item.addEventListener('mouseover', () => {
            cursor.classList.add('hover');
            cursorinner.classList.add('cursorinnerhide')
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorinner.classList.remove('cursorinnerhide')
        });
    })

    change.forEach(item => {
        item.addEventListener('mouseover', () => {
            cursor.classList.add('hover');
            cursorinner.classList.add('cursorinnerhide')
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorinner.classList.remove('cursorinnerhide')
        });
    })
})


$('document').ready(function() {
    let next = document.querySelector('#next'),
        back = document.querySelector('#back'),
        Home = document.querySelector('#home'),
        Models = document.querySelector('#models');

    next.addEventListener('click', function() {
        Models.scrollIntoView();
    });

    back.addEventListener('click', function() {
        Home.scrollIntoView();
    });
})