//Responsive design font size setting
$(function(){
    $(".input-wrap").each(function () {
        var wrap = $(this),
            input = wrap.find("input"),
            del = wrap.find(".delete");
        del.on("click", function () {
            input.val("").focus();
            del.hide();
        });
        input.on("input propertychange", function () {
            if($.trim(this.value) != ""){
                del.show();
            }else{
                del.hide();
            }
        });
    });

    $(".gotop").on("click", function() {
        //goTop();
        mui.scrollTo(0,100);
    });
})


/*function goTop(acceleration, time) {
    acceleration = acceleration || 0.1;
    time = time || 16;
    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var x3 = 0;
    var y3 = 0;
    if (document.documentElement) {
        x1 = document.documentElement.scrollLeft || 0;
        y1 = document.documentElement.scrollTop || 0;
    }
    if (document.body) {
        x2 = document.body.scrollLeft || 0;
        y2 = document.body.scrollTop || 0;
    }
    var x3 = window.scrollX || 0;
    var y3 = window.scrollY || 0;
    var x = Math.max(x1, Math.max(x2, x3));
    var y = Math.max(y1, Math.max(y2, y3));
    var speed = 1 + acceleration;
    window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
    if (x > 0 || y > 0) {
        var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
        window.setTimeout(invokeFunction, time);
    }
}*/


//以对象方式获取地址中的参数
var getUrlParams = (function () {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
})();

var app = {
    extend : function(a, b) {
        var _extend_ = function(a, b) {
            for (var key in b) {
                a[key] = b[key];
            }
            return a;
        };
        return _extend_(_extend_({}, a), b);
    }
};

app.formatDateTimeStrToDate = function(datetimeStr) {
    var a = datetimeStr.split(" ");
    var d = a[0].split("-");
    var t = a[1].split(":");
    return new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);
};

app.cookieUtils = {
    addCookie: function(objName, objValue, objHours){
        var str = objName + "=" + escape(objValue);
        if(objHours > 0){//为0时不设定过期时间，浏览器关闭时cookie自动消失
            var date = new Date();
            var ms = objHours * 3600 * 1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();
        }
        document.cookie = str+";path=/";
    },
    getCookieValue: function(objName){
        var arrStr = document.cookie.split("; ");
        for(var i = 0;i < arrStr.length;i ++){
            var temp = arrStr[i].split("=");
            if(temp[0] == objName) return unescape(temp[1]);
        }
    }
};

app.showTip = function (txt,autohide) {
    var wrap = app._tip;
    if(!wrap){
        wrap = $('<div class="tipBoxWrap"><div class="tipBox"></div></div>');
        wrap.on("click", function () {
            if(app._tiptimer) clearTimeout(app._tiptimer);
            app.hideTip();
        }).appendTo(document.body);
    }
    txt = txt || '加载中...';
    wrap.box = wrap.find('.tipBox');
    wrap.box.html(txt);

    wrap.box.css({
        opacity :0,
        "-webkit-transform":"translateY(10px)"
    }).animate({
        opacity : 1,
        translateY : 0
    },{
        duration : 200,
        easing : 'ease-in-out'
    });

    app._tip = wrap;

    if(autohide){
        app._tiptimer = setTimeout(function () {
            app.hideTip();
        },3000);
    }
};

app.hideTip = function () {
    if (app._tip) {
        var wrap = app._tip;
        wrap.box.animate({opacity: 0}, {
            duration: 200,
            easing: 'ease-in-out',
            complete: function () {
                wrap.remove();
                app._tip = null;
            }
        });
    }
};


(function(){
    var timer,
        setRootFontSize = function () {
            var winWidth = document.documentElement.getBoundingClientRect().width,
            //var winWidth = app.isWx ? window.innerWidth : document.documentElement.offsetWidth,
                rootFontSize = (winWidth / 320 *20)+"px";
            $("html").css("font-size",rootFontSize);
        };
    window.addEventListener("resize", function() {
        clearTimeout(timer);
        timer = setTimeout(setRootFontSize, 300);
    }, false);
    window.addEventListener("orientationchange", function() {
        clearTimeout(timer);
        timer = setTimeout(setRootFontSize, 300);
    }, false);
    window.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(setRootFontSize, 300);
        }
    }, false);
    setRootFontSize();
})();



