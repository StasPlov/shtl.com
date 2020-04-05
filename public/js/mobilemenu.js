window.addEventListener('load', (e) => {
    var button_close_mobile_menu = document.querySelector('#close-mobile-menu');
    var button_open_mobile_menu = document.querySelector('#open-mobile-menu');

    var mobile_menu = document.querySelector('#mobile-menu');
    var mobile_menu_items = document.querySelectorAll('#mobile-menu > ul > li > a[href]');


    button_close_mobile_menu.addEventListener('click', (e) => {
        e.preventDefault();
        hide_element(mobile_menu);
    });

    var menu_is_open = false;
    button_open_mobile_menu.addEventListener('click', (e) => {
        e.preventDefault();
        
        if(!menu_is_open) {
            menu_is_open = !menu_is_open;
            hide_element(mobile_menu);
        }
    });


    mobile_menu_items.forEach(element => {
        element.addEventListener('click', (e) => {
            hide_element(mobile_menu);
        });
    });


    function hide_element(element) {
        element.classList.toggle('fadeIn');
        element.classList.toggle('fadeOut');

        if(element.classList.contains('hide')) {
            element.classList.toggle('hide');
        } else {
            setTimeout(() => {
                element.classList.toggle('hide');
            }, 500);
        }
        menu_is_open = false;
    }
});