import "./mobilemenu";


//lightGallery(document.getElementById('gallery-items'));

/*
$(document).ready(function()
{
    $('#menu > li').on('click', 'a', function(e) {
        if($(this).attr('href').charAt(0) == '#') {
            e.preventDefault();
        }
    
        $(this).parent().find('#menu_sub').first().slideToggle(100); 
        
    });

    function insertPreloader (to, how) {
        var preloader_html = '<img src="/core/adminpanel/img/preloader.gif" class="preloader">';
        if(how) {
            $(preloader_html).insertAfter(to);
        } else {
            $(preloader_html).insertBefore(to);
        }
    }

    function Get_Form_Menu_Created () { // Запрос формы создания меню с сервера через AJAX
        ServerRequest.Get_Form_Menu_Created();
    }
    function Get_Form_News_Created () { // Запрос формы создания новостей с сервера через AJAX
        ServerRequest.Get_Form_News_Created();
    }
    function Get_Form_Pages_Created () { // Запрос формы создания страниц с сервера через AJAX
        ServerRequest.Get_Form_Pages_Created();
    }
    function Get_Form_Objects_Created () { // Запрос формы создания объектов с сервера через AJAX
        ServerRequest.Get_Form_Objects_Created();
    }
    function Add_New_Menu () { // Создание нового меню
        ServerRequest.Add_New_Menu();
    }
    function Add_New_Menu_Item (data) { // Создание нового элемента меню
        ServerRequest.Add_New_Menu_Item(data);
    }
    function Update_Data (data) { // Обновляем данные в БД
        ServerRequest.Update_Data(data);
    }
    function Delete_Data (data) { // Обновляем данные в БД
        ServerRequest.Delete_Data(data);
    }



    $("body").on("click", "[id]", function(e) {
        if($(this).attr("id") == "slideToggle") {
            $(this).parent().find('#slideToggleTarget').first().slideToggle(100);

        } else if($(this).attr('id') == 'addnewmenu') {
            insertPreloader('.main-content-menudata > input[id="addnewmenu"]', true);
            Add_New_Menu();

        } else if($(this).attr('id') == 'addnewmenuitem') {
            var data = {};
            data.Add_New_Menu_Item = 1;
            data.menuid = $(this).parents('[database-name]').first().attr('database-name');
            insertPreloader('input[id="addnewmenuitem"]', false);
            Add_New_Menu_Item(data);

        } else if($(this).attr('id') == 'changetext') {
            $(this).parent().children('input[type="hidden"]').attr('type', 'text').css('width', $(this).css('width')).val($(this).text()).focus().select();
            $(this).hide();

        } else if($(this).attr("id") == "deletemenuitem") {
            
            if(confirm("Удалить элемент ?")) {
                var elem = $(this).parents('[database-id]').first();
                elem.addClass('animated fadeOut');
                
                var data = {};
                data.Delete_Data = 1;
                data.id = elem.attr('database-id');
                data.table_name = elem.attr('database-table-name');
                Delete_Data(data);

                setTimeout(function(){ elem.remove(); }, 400);
            }
            e.prer(); // блочим ложное разварачивание списка

        } else if($(this).attr("id") == "deletemenu") {
            
            if(confirm("Удалить элемент ?")) {
                var elem = $(this).parents('[database-id]').first();
                elem.addClass('animated fadeOut');
                
                var data = {};
                data.Delete_Data = 1;
                data.id = elem.attr('database-id');
                data.table_name = elem.attr('database-table-name');
                Delete_Data(data);

                setTimeout(function(){ elem.remove(); }, 400);
            }
            e.prer(); // блочим ложное разварачивание списка
        }


    });

    
    $('body').on('blur', '.main-content-menudata input[type="text"]', function(){
        var valu = $(this).val();
        if (valu.length == 0) {
            valu = "пусто";
        }
        $(this).parent().children('span').show().text(valu);
        $(this).attr('type', 'hidden');

        var data = {};
        data.Update_Data = 1;
        data.id = $(this).parents('[database-id]').first().attr('database-id');
        data.table_name = $(this).parents('[database-table-name]').first().attr('database-table-name');
        data.field_name = $(this).attr('database-field-name');
        data.value = $(this).val();
        Update_Data(data); 
        
    }).on('keypress', 'input[type="text"]', function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13' || keycode == '27') {
            $(this).blur();
        }
    });
});


var ServerRequest = {

    link_admin_core : '/core/core.admin.php',
    link_core : '/core/core.php',

    Event_Handler : function(type, text) {
        var color = 'red';
        if(type == 'error') {
            color = 'red';
        } else if(type == 'successful') {
            color = 'white';
        }

        var html = '<notification id="notification" class="animated fadeInUp notification" style="color:'+color+'">'+text+'</notification>';
        $(html).insertAfter('header');
        setTimeout(function(){
            $('notification').toggleClass('fadeInUp fadeOutDown');
            setTimeout(function(){
                $('notification').remove();
            }, 1000);
        }, 3000);

    },

    Get_Form_Menu_Created : function() {
        $.ajax({
            type: "POST",
            url: ServerRequest.link_admin_core,
            data: ({Get_Form_Menu_Created : 1}),
            success: function(data) // jQuery.parseJSON(data)
            {
                if(data != 'undefined') {
                    $(".main-content").empty();
                }
                $(".main-content").prepend(data);
            },
            error: function()
            {
                ServerRequest.Event_Handler('error', 'Ошибка обновления данных');
            }
      });
    },

    Get_Form_News_Created : function() {
        $.ajax({
            type: "POST",
            url: ServerRequest.link_admin_core,
            data: ({Get_Form_News_Created : 1}),
            success: function(data) // jQuery.parseJSON(data)
            {
                if(data != 'undefined') {
                    $(".main-content").empty();
                }
                $(".main-content").prepend(data);
            },
            error: function()
            {
                ServerRequest.Event_Handler('error', 'Ошибка обновления данных');
            }
      });
    },

    Get_Form_Pages_Created : function() {
        $.ajax({
            type: "POST",
            url: ServerRequest.link_admin_core,
            data: ({Get_Form_Pages_Created : 1}),
            success: function(data) // jQuery.parseJSON(data)
            {
                if(data != 'undefined') {
                    $(".main-content").empty();
                }
                $(".main-content").prepend(data);
            },
            error: function()
            {
                ServerRequest.Event_Handler('error', 'Ошибка обновления данных');
            }
      });
    },

    Get_Form_Objects_Created : function() {
        $.ajax({
            type: "POST",
            url: ServerRequest.link_admin_core,
            data: ({Get_Form_Objects_Created : 1}),
            success: function(data) // jQuery.parseJSON(data)
            {
                if(data != 'undefined') {
                    $(".main-content").empty();
                }
                $(".main-content").prepend(data);
            },
            error: function()
            {
                ServerRequest.Event_Handler('error', 'Ошибка обновления данных');
            }
      });
    },
    
    Add_New_Menu : function() {
        $.ajax({
            type: "POST",
            url: ServerRequest.link_admin_core,
            data: ({Add_New_Menu : 1}),
            success: function(data) // jQuery.parseJSON(data)
            {
                $('main').find('.preloader').remove();
                $(data).insertAfter('.main-content-menudata > input[id="addnewmenu"]');
            },
            error: function()
            {
                ServerRequest.Event_Handler('error', 'Ошибка обновления данных');
            }
      });
    },

    Add_New_Menu_Item : function(data_) {
        $.ajax({
            type: "POST",
            url: ServerRequest.link_admin_core,
            data: data_,
            success: function(data) // jQuery.parseJSON(data)
            {
                $('main').find('.preloader').remove();
                $(data).insertBefore('input[id="addnewmenuitem"]'); // ВСтавить HTML форму элемента меню в нужное меню <- это надо сделать будет, я забил хуй и лег спать
            },
            error: function()
            {
                ServerRequest.Event_Handler('error', 'Ошибка обновления данных');
            }
      });
    },


    Update_Data : function(data_) {
        $.ajax({
            type: "POST",
            url: ServerRequest.link_admin_core,
            data: data_,
            success: function(data) // jQuery.parseJSON(data)
            {
                ServerRequest.Event_Handler('successful', data);
            },
            error: function()
            {
                ServerRequest.Event_Handler('error', 'Ошибка обновления данных');
            }
      });
    },
    
    Delete_Data : function(data_) {
        $.ajax({
            type: "POST",
            url: ServerRequest.link_admin_core,
            data: data_,
            success: function(data) // jQuery.parseJSON(data)
            {
                ServerRequest.Event_Handler('successful', data);
            },
            error: function()
            {
                ServerRequest.Event_Handler('error', 'Ошибка обновления данных');
            }
      });
    },
}*/