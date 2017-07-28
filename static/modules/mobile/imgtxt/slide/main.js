define([
    "text!./main.hbs",
    "text!./setting.hbs",
    "iSlider",
    "iSliderDot"
],function(template,setting,iSlider){
    return {
        tmpl: template,
        setting:setting,
        init: function () {
            var mod = $('.J_Module[data-module-name=imgtxt-slide]');
            mod.each(function () {
                var module = $(this).find(".module");
                if(!module[0] || module.data("init")==true) return;

                var slide = module.find(".slide-wrap"),
                    picDom = slide.find(".slide-data li"),
                    itemPiclist = [];

                if(picDom.length <= 1){
                    picDom.parent().show();
                }else{
                    picDom.each(function () {
                        itemPiclist.push({content:this.innerHTML});
                    });

                    var S = new iSlider({
                        dom: slide[0],
                        data: itemPiclist,
                        isLooping: 1,
                        isAutoplay: 1,
                        fixPage : 0,
                        animateTime: 600,
                        plugins: ["dot"]
                    });
                    S.on("slideChange", function (index,item) {
                        $(item).find("img").each(function () {
                            this.src = this.getAttribute("data-src");
                        });
                    });
                }

                module.data("init",true);
            });
        },
        data:{
            "size": "large",
            "list" : [
                [{"img":"","link":{"category":"no","isNew":false}}]
            ]
        }
    }
});