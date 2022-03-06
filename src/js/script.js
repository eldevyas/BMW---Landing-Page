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
});



//Navigation


$('document').ready(function() {
    scroll();

    let Switch = document.querySelector('#Switch'),
        Navigate = document.querySelector('.navigation'),
        Fade = document.querySelector('#fade')
        Nav = Navigate.querySelector('.nav'),
        Visible = false;
        Link = Nav.querySelectorAll('a');
    console.log(Switch)
    console.log(Link);

    Switch.onclick = () => {
        if(Visible == true){
            Visible = false;
            Fade.style.opacity = 0;
            Fade.style.visibility = "hidden";
            Navigate.style.transform = "translateX(-200vw)";
            Switch.classList.remove('close');
            Switch.classList.add('open');
        }
        else if(Visible == false){
            Visible = true;
            Fade.style.opacity = 1;
            Fade.style.visibility = "visible";
            Navigate.style.transform = 'translateX(0vw)';
            Switch.classList.remove('open');
            Switch.classList.add('close');
        }
    }

})


function scroll() {
    container = document.querySelector('.scrollwrapper')
    function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        container.scrollLeft -= (delta*40); // Multiplied by 40
        container.scrollLeft -= (delta*40); // Multiplied by 40
    }
    if (window.addEventListener) {
        // IE9, Chrome, Safari, Opera
        window.addEventListener("mousewheel", scrollHorizontally, false);
        // Firefox
        window.addEventListener("DOMMouseScroll", scrollHorizontally, false);
    } else {
        // IE 6/7/8
        window.attachEvent("onmousewheel", scrollHorizontally);
    }
};

