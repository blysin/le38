define(["jquery"],function ($) {
    var style_html = '<div class="font-styler">' +
            '<div class="fs-item fs-item-size"><a href="javascript:void(0)" title="字体大小"></a></div>' +
            '<div class="fs-item fs-item-weight"><a href="javascript:void(0)" title="加粗"></a></div>' +
            '<div class="fs-item fs-item-color"><a href="javascript:void(0)" title="字体颜色"><label><input class="fs-color-input" type="color"/><b></b></label></a></div>' +
            '<div class="fs-dropmenu">' +
                '<ul><li data-value="12px"><span class="l fs-s">小号</span><span class="r">12px</span></li><li data-value="14px"><span class="l fs-m">中号</span><span class="r">14px</span></li><li data-value="16px"><span class="l fs-l">大号</span><span class="r">16px</span></li><li data-value="18px"><span class="l fs-xl">超大号</span><span class="r">18px</span></li></ul>' +
            '</div><input type="hidden">' +
        '</div>';

    function fontStyler(render,callback){
        $(render).each(function (i,v) {
            var wrap = $(this),
                name = wrap.attr("data-name"),
                tag = wrap.attr("data-tag"),
                value = wrap.attr("data-value");

            if(wrap.data("init") == true) return;

            wrap.html(style_html);
            var itemSize = wrap.find(".fs-item-size a"),
                dropmenu = wrap.find(".fs-dropmenu"),
                itemWeight = wrap.find(".fs-item-weight a"),
                itemColor = wrap.find(".fs-item-color a"),
                colorInput = itemColor.find("input[type=color]"),
                dataStore = wrap.find("input[type=hidden]"),
                timer;

            if(name) dataStore.attr("name",name);
            if(tag) dataStore.attr("data-tag",tag);
            if(value && value!="null"){
                value = $.parseJSON(value);
                dropmenu.find("li[data-value="+ value.fontSize +"]").addClass("selected");
                if(value.fontWeight == "bold") itemWeight.addClass("active");
                itemColor.find("b").css("background-color",value.color);
                colorInput.val(value.color);
                dataStore.val(JSON.stringify(value));
            }

            itemSize.add(dropmenu).on("mouseenter", function () {
                clearTimeout(timer);
                itemSize.addClass("opened");
                dropmenu.show();
            }).on("mouseleave", function () {
                timer = setTimeout(function () {
                    itemSize.removeClass("opened");
                    dropmenu.hide();
                },50);
            });
            dropmenu.on("click","li", function () {
                dropmenu.find("li").removeClass("selected");
                $(this).addClass("selected");
                setData();
            });

            itemWeight.on("click", function () {
                itemWeight.toggleClass("active");
                setData();
            });

            colorInput.on("change", function () {
                itemColor.find("b").css("background-color",this.value);
                setData();
            });

            wrap.data("init",true);

            function setData(){
                var size = dropmenu.find("li.selected").attr("data-value"),
                    weight = itemWeight.hasClass("active") ? "bold" : "normal",
                    color = colorInput.val();
                    value = {
                        "fontSize" : size,
                        "fontWeight" : weight,
                        "color" : color
                    };

                dataStore.val(JSON.stringify(value));
                if(callback && wrap.data("init") == true)
                    callback.call(dataStore[0],value);
            }
        });
    }
    return fontStyler;
});
