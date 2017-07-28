var imgReady = (function () {
    var list = [], intervalId = null,
        tick = function () {
            var i = 0;
            for (; i < list.length; i++) {
                list[i].end ? list.splice(i--, 1) : list[i]();
            };
            !list.length && stop();
        },

        stop = function () {
            clearInterval(intervalId);
            intervalId = null;
        };

    return function (url, ready, load, error) {
        var onready, width, height, newWidth, newHeight,
            img = new Image();

        img.src = url;
        if (img.complete) {
            ready.call(img);
            load && load.call(img);
            return;
        };

        width = img.width;
        height = img.height;

        // 加载错误后的事件
        img.onerror = function () {
            error && error.call(img);
            onready.end = true;
            img = img.onload = img.onerror = null;
        };

        // 图片尺寸就绪
        onready = function () {
            newWidth = img.width;
            newHeight = img.height;
            if (newWidth !== width || newHeight !== height ||
                newWidth * newHeight > 1024
            ) {
                ready.call(img);
                onready.end = true;
            };
        };
        onready();


        img.onload = function () {
            !onready.end && onready();
            load && load.call(img);
            img = img.onload = img.onerror = null;
        };


        if (!onready.end) {
            list.push(onready);
            if (intervalId === null) intervalId = setInterval(tick, 40);
        };
    };
})();

$(function(){
    var moduleSlides = $('.module-slides');
    if(moduleSlides[0]) {
        moduleSlides.each(function(){
            var $this = $(this);

            var sideitems = $this.find(".slide-side-item");
            var slides = $this.find('.switchable-slides');
            sideitems.eq(0).show();
            slides.switchable({
                triggers: '&bull;',
                putTriggers: 'insertAfter',
                effect: 'fade',
                easing: 'ease-in-out',
                loop: true,
                autoplay:true,
                panels:'li',
                prev: $this.find('.prev'),
                next: $this.find('.next'),
                onSwitch: function(event, currentIndex) {
                    sideitems.hide().eq(currentIndex).fadeIn();
                }
            });

            slides.find('img').each(function () {
                var img = this,
                    $img = $(img);
                $img.hide();
                imgReady(img.src, function () {
                    $img.show()
                        .closest('.item').css({
                        position : 'relative',
                        left : '50%',
                        marginLeft : '-'+ this.width/2 +'px'
                    });
                });
            });
        });
    }

    var mod = $('.module-itemshow');
    if(mod[0]) {
        mod.find('.picwrap').each(function(){
            var wrap = $(this),
                layer = wrap.find('.piclayer'),
                h = layer.height();
            wrap.hover(function(){
                layer.stop().animate({'bottom':0},100);
            },function(){
                layer.stop().animate({'bottom':-h},100);
            });
        })
    };

    $('input, textarea').placeholder();

    var globalNav = $("#nav .navWrap"),
        //navtop = globalNav.offset().top,
        catalogWrap = $('.catalog-wrap'),
        catalogBlock = $('.catalog-block');

    /*$(window).on("scroll",function(){
        var scrolltop = $(this).scrollTop();
        globalNav.removeAttr("style");
        if(scrolltop > navtop){
            globalNav.addClass("global-nav-fix");
        }else{
            globalNav.removeClass("global-nav-fix");
        }
    });*/

    catalogWrap.hover(function(){
        showGlobalCat();
    }, function(){
        hideGlobalCat();
    });
    function showGlobalCat(){
        catalogBlock.stop().slideDown(200);
    }
    function hideGlobalCat(){
        catalogBlock.stop().slideUp(200);
    }


    var GoTop = $("#Gotop"),
        win = $(window);
    win.scroll( function() {
        var scrollValue = win.scrollTop();
        scrollValue > 300 ? GoTop.fadeIn() : GoTop.fadeOut();
    });
    GoTop.click(function(){
        $("html,body").animate({scrollTop:0},300);
    });


    $('.pr-list li').hover(function () {
        $(this).addClass('hov');
    }, function () {
        $(this).removeClass('hov');
    });

})