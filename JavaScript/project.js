//header start

;(function() {

   var headerPage = document.querySelector('.header-page');
   
   window.addEventListener('scroll', function() {
       if(window.pageYOffset > 0)
       {
           headerPage.classList.add('is_active');
       }
       else{
           headerPage.classList.remove('is_active')
       }
   } );

})();

//header end

//popup start

;(function(){

    var body = document.querySelector('body');

    var closestItemByClass = function(item, className){
        var node = item;

        while(node){
            if(node.classList.contains(className)){
                return node;
            }

            node = node.parentElement;
        }

        return null;
    };

    var closestAttr = function(item, attr){
        var node = item;

        while(node){
            var attrValue = node.getAttribute(attr);
            if(attrValue){
                return attrValue;
            }

            node = node.parentElement;
        }

        return null;
    };

    var showPopup = function(target){
        target.classList.add('is_active')
    };

    var closePopup = function(target){
        target.classList.remove('is_active')
    };

    var toggleScroll = function(){
        body.classList.toggle('no-scroll');
    };

    body.addEventListener('click', function(e){
        var target = e.target;
        var popupClass = closestAttr(target, 'data-popup');

        //closestAttr(target, 'data-popup');
        //target.getAttribute('data-popup');
        
        if(popupClass == null)
        {
            return;
        }

        e.preventDefault();
        var popup = document.querySelector('.' + popupClass);

        if(popup){
            showPopup(popup); 
            toggleScroll();  
        }

    });

    
    body.addEventListener('click', function(e){
        var target = e.target;

        if(target.classList.contains('popup_btn-close') || 
            target.classList.contains('popup_inner')){
                var popup = closestItemByClass(target, 'popup');

                closePopup(popup);
                toggleScroll();
            }
    }); 

    body.addEventListener('keydown', function(e){
        console.log(e.keyCode);
        if(e.keyCode !== 27){
            return;
        }

        var popup = document.querySelector('.popup.is_active')

        if(popup)
        {
            closePopup(popup);
            toggleScroll();
        }
    });

    //validate start

    const form = document.getElementById('form_');
    form.addEventListener('submit', formSend);

    async function formSend (e) {
        e.preventDefault();

        let error = formValidate(form);

        if(error === 0){
            body.addEventListener('click', function(e){
                var target = e.target;
        
                if(target.classList.contains('form_btn')){
                        var popup = closestItemByClass(target, 'popup');
        
                        closePopup(popup);
                        toggleScroll();
                    }
            });
        }
    }

    function formValidate (form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_name')){
                if(nameTest(input)){
                    formAddError(input);
                    alert("Введите коректное имя!");
                    error++;
                }
            }else if(input.classList.contains('_tel')){
                if(telTest(input)){
                    formAddError(input);
                    alert("Введите коректный номер!");
                    error++;
                }
            }else{
                if(input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input)
    {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function nameTest(input){
        var name = input.value;
        console.log(name.length);
        if(name.length == 0)
        {
            return true;
        }
        var sim = "!@#$%^&*()_+№;%:?*_+1234567890";
        for(var i = 0; i < name.length; i++){
            for(var j = 0; j < sim.length; j++){
                if(name[i] == sim[j])
                {
                    return true;
                }else if(i > 0 && (name[i].toUpperCase()==name[i]) == true){
                    return true;
                }
            }
        }
        return false;
    }
    function telTest(input){
        var tel = input.value;
        if(tel.length == 0)
        {
            return true;
        }
        var sim = "!@#$%^&*()_№;%:?*_";
        for(var i = 0; i < tel.length; i++){
            for(var j = 0; j < sim.length; j++){
                if(tel[i] == sim[j] || tel.length == 0)
                {
                    return true;
                }
                else if(tel.length > 13 || tel.length < 10 || tel.length == 11 || tel.length == 12){
                    return true;
                }
            }
        }
        return false;
    }

    //validate end 
    

})();

//popup end

//scrollTo start

;(function (){

    var body = document.querySelector('body');

    var closestAttr = function(item, attr){
        var node = item;

        while(node){
            var attrValue = node.getAttribute(attr);
            if(attrValue){
                return attrValue;
            }

            node = node.parentElement;
        }

        return null;
    };

    var scroll = function(target){
        var targetTop = target.getBoundingClientRect().top;
        var scrollTop = window.pageYOffset;
        var targetOffsetTop = targetTop + scrollTop;
        var headerOffset = document.querySelector('.header-page').clientHeight;
        
        window.scrollTo(0, targetOffsetTop - headerOffset);
    }

    body.addEventListener('click', function(e){
    var target = e.target;
    var scrollToItemClass = closestAttr(target, 'data-scroll-to');

    if(scrollToItemClass == null)
    {
        return;
    }

    e.preventDefault();
    var scrollToItem = document.querySelector('.' + scrollToItemClass);

    if(scrollToItem){
        scroll(scrollToItem)
    }

    });

})();

//scrollTo end

//catalog start

;(function(){

    closestItemByClass = function(item, className){
        var node = item;

        while(node){
            if(node.classList.contains(className)){
                return node;
            }

            node = node.parentElement;
        }

        return null;
    };

    var catalogSection = document.querySelector('.section-catalog');

    if(catalogSection === null){
        return;
    }

    var removeChildren = function(item){
        while(item.firstChild){
            item.removeChild(item.firstChild);
        }
    }

    var updateChildren = function(item, children){
        removeChildren(item);
        console.log(children);
        for(var i = 0; i < children.length; i += 1){
            item.appendChild(children[i]);
        }
    };

    var catalog = catalogSection.querySelector('.catalog');
    var catalogNav = catalogSection.querySelector('.catalog-nav');
    var catalogItems = catalogSection.querySelectorAll('.catalog_item');

    catalogNav.addEventListener('click', function(e){
        var target = e.target;
        var item = closestItemByClass(target, 'catalog-nav_btn');

        if(item === null || item.classList.contains('is-active'))
        {
            return;
        }

        e.preventDefault();

        var filterValue = item.getAttribute('data-filter');
        var previousBtnActive = catalogNav.querySelector('.catalog-nav_btn.is-active');

        previousBtnActive.classList.remove('is-active');
        item.classList.add('is-active');

        if(filterValue === 'all'){
            updateChildren(catalog, catalogItems);
            return;
        }

        var filteredItems = [];
        for(var i = 0; i < catalogItems.length; i += 1){
            var current = catalogItems[i];
            if(current.getAttribute('data-category') === filterValue){
                filteredItems.push(current);
            }
        }

        updateChildren(catalog, filteredItems);
    });
})();

//catalog end


//JQuery start

$(function() {

    $('.slider_rev').slick({
        arrows: false,
        dots: true,
        speed: 1000
    })

});

$(document).ready(function() {

    $('.panel-heading').click(function () {
        $(this).toggleClass('in').next().slideToggle();
        $('.panel-heading').not(this).removeClass('in').next().slideUp();
    })
});

$(document).ready(function() {

    $('.filter').sortable({
        revert: 100
    });
});

$(document).ready(function() {
	$(document).on("click", "#img_box", function() {
		$("#img_box>img").toggle();
	});
});

$(document).ready(function() {
	$(".content_bait div").hide(); // Скрываем содержание
	$(".tabs_bait li:first").attr("class","current"); // Активируем первую закладку
	$(".content_bait div:first").fadeIn(); // Выводим содержание

    $('.tabs_bait a').click(function(e) {
        e.preventDefault();
        $(".content_bait div").hide(); //Скрыть все сожержание
        $(".tabs_bait li").attr("class",""); //Сброс class
        $(this).parent().attr("class","current"); // Активируем закладку
        $('#' + $(this).attr('title')).fadeIn(); // Выводим содержание текущей закладки
    });
})();

//JQuery end



