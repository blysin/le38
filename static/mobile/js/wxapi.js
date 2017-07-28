(function(w){
    "use strict";
    var wxapi = {
        isWx: (function (userAgent) {   // 判断是否是微信内置浏览器，只执行一次
            return /MicroMessenger/i.test(userAgent);
        }(w.navigator.userAgent)),
        on: function (target, method, hander) {
            if (target.addEventListener) {
                target.addEventListener(method, hander);
            } else if (target.attachEvent) {
                target.attachEvent("on" + method, hander);
                target.attachEvent(method, hander);
            }
            return this;
        }
    };
    w.wxapi = wxapi;
    /////////////////////////// CommonJS /////////////////////////////////
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        if (define.amd) {
            // AMD 规范，for：requirejs
            define(function () {
                return wxapi;
            });
        } else if (define.cmd) {
            // CMD 规范，for：seajs
            define(function (require, exports, module) {
                module.exports = wxapi;
            });
        }
    }
    if (!wxapi.isWx) return;
    var _script_ = document.createElement("script");
    var url = location.href.split("#")[0];
    url = encodeURIComponent(url);
    console.log("encodeURIComponent(url) ==== "+url);
    _script_.src = "/m/weixin/injection/js?url=" + url;
    //document.body && document.body.appendChild(_script_);
    if(document.body){
        document.body.appendChild(_script_);
    }else{
    }
}(window));
