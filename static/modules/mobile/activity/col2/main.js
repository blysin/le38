define([
    "text!./main.hbs",
    "text!./setting.hbs"
],function(template,setting){
    return {
        tmpl: template,
        setting:setting,
        init: function () {
            var mod = $('.J_Module[data-module-name=auxiliary-title]');
            mod.each(function () {
                var module = $(this).find(".module");
                if(!module[0] || module.data("init")==true) return;
                var countdown = module.find("[data-countdown]");
                var flag = true;
                function GetRTime(obj,sTime,eTime){
                    var StartTime= new Date(sTime);
                    var EndTime= new Date(eTime);
                    var NowTime = new Date();
                    var t=0;
                    var d=0;
                    var h=0;
                    var m=0;
                    var s=0;
                    var ms=0;
                    var isShoudown = StartTime.getTime() - NowTime.getTime()>0;
                    if(isShoudown>0){
                        obj.find(".t_desc").html( "距离开始:");
                        t = StartTime.getTime() - NowTime.getTime();
                    }else if(isShoudown<=0&&flag){
                        obj.find(".t_desc").html( "距离结束:");
                        t = EndTime.getTime() - NowTime.getTime();
                        if(t<=0){
                            flag = false;
                            obj.html( "活动结束");
                        }
                    }
                    if(t>=0){
                        d = Math.floor(t/1000/60/60/24);
                        h = Math.floor(t/1000/60/60%24);
                        m = Math.floor(t/1000/60%60);
                        s = Math.floor(t/1000%60);
                        // ms = Math.floor(t%1000);
                        // ms = Math.floor(ms/100);
                    }
                    obj.find('.days_1').text(d);
                    obj.find('.hours_1').text(h)
                    obj.find('.minutes_1').text(m);
                    obj.find('.seconds_1').text(s);
                    // obj.find('.seconds_1').text(s+ '.' + ms);
                }

                countdown.each(function() {
                    var $this = $(this);
                    setInterval(function(){ GetRTime($this,$this.attr("data-start"),$this.attr("data-end")) },1);
                });

                module.data("init",true);
            });
        },
        data:{
            "list" : [
                [{"img":"/static/images/blank.gif","link":"","name":"商品标题1","priceReal":"99","priceOrigin":"299"},
                    {"img":"/static/images/blank.gif","link":"","name":"商品标题2","priceReal":"99","priceOrigin":"299"}]
            ],
            "type" : "1",
            "color" : "#d90000",
            "title" : "标题文字",
            //"link" : {"category":"no","isNew":false},
            "activity" : {"data-end":"","data-start":"","selectProId":""}
        }
    }
});