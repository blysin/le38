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
            var mod = $('.J_Module[data-module-name=product-col3]');
            mod.each(function () {
                var module = $(this);
                if(!module[0] || module.data("init")==true) return;

                var slide = module.find(".mod-slider");
                if(slide[0]){
                    var picDom = slide.find(".slide-data .itemgroup"),
                        itemPiclist = [];
                    picDom.each(function () {
                        itemPiclist.push({content:this.outerHTML});
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
            "display" : "normal",
            "list" : [
                [{"img":"/static/images/blank.gif","link":"","name":"商品标题1","priceReal":"99","priceOrigin":"299"},
                    {"img":"/static/images/blank.gif","link":"","name":"商品标题2","priceReal":"99","priceOrigin":"299"},
                    {"img":"/static/images/blank.gif","link":"","name":"商品标题3","priceReal":"99","priceOrigin":"299"}]
            ]
        }
    }
});