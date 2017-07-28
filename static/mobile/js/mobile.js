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

    $('.mui-icon-left-nav').click(function(){
        history.back(-1);
    });
});

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

//时间格式化
Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

//设置Cookie
function setCookie(name, value,time) {
    document.cookie = name + '=' + encodeURIComponent(value) + ';path=/';
}
//获取cookie
function getCookie(name) {
    var arr = document.cookie.split('; ');
    var i = 0;
    for (i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');

        if (arr2[0] == name) {
            var getC = decodeURIComponent(arr2[1]);
            return getC;
        }
    }

    return '';
}

//删除cookie
function delCookie(name) {
    var LT = new Date();
    LT.setTime(LT.getTime() - 10000);
    var XN = getCookie(name);
    if (XN != null) document.cookie = name + "=" + XN + ";path=/;expires=" + LT.toGMTString();
}