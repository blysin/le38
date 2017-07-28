define(["jquery"],function ($) {
    var selector_html = '<div class="color-set-wrap">' +
            '<input class="control-text color-set-text" type="text" />' +
            '<label class="color-set-label"><input class="color-set-select" type="color"/><b></b><span>选色器</span></label>' +
            '<ul class="color-set-list"><li data-color="#8ed901"></li><li data-color="#f8a300"></li><li data-color="#e2312c"></li><li data-color="#737373"></li><li data-color="#7b64e3"></li><li data-color="#4dc3fd"></li><li data-color="#66e9d0"></li></ul>' +
        '<input type="hidden"></div>',
        default_color = "";
    function colorSelector(render,callback){
        var wrap = $(render);
        wrap.each(function (i,v) {
            var $this = $(this),
                name = $this.attr("data-name"),
                tag = $this.attr("data-tag"),
                value = $this.attr("data-value") || default_color;

            if($this.data("init") == true) return;

            $this.html(selector_html);
            var colorSet = $this.find(".color-set-wrap"),
                colorInd = colorSet.find(".color-set-label b"),
                colorText = colorSet.find(".color-set-text"),
                colorSelect = colorSet.find(".color-set-select"),
                dataStore = $this.find("input[type=hidden]");

            if(name) dataStore.attr("name",name);
            if(tag) dataStore.attr("data-tag",tag);
            colorInd.css("background-color",value);
            colorSelect.val(value);
            colorText.val(value.substring(1));

            colorText.on("change", function () {
                var color = '#'+this.value;
                if($.trim(this.value) == ""){
                    color = "transparent";
                }
                colorSelect.val(color);
                colorInd.css("background-color",color);
                setData();
            });
            colorSelect.on("change", function () {
                colorInd.css("background-color",this.value);
                colorText.val(this.value.substring(1));
                setData();
            });
            colorSet.on("click",".color-set-list li", function () {
                var color = this.getAttribute("data-color");
                colorSelect.val(color);
                colorInd.css("background-color",color);
                colorText.val(color.substring(1));
                setData();
            });

            $this.data("init",true);

            function setData(){
                var v = colorText.val(),
                    value;
                if($.trim(v) == ""){
                    value = "";
                }else{
                    value = "#"+v;
                }

                dataStore.val(value);
                if(callback && $this.data("init") == true){
                    callback.call(dataStore[0],value);
                }
            }
        });
    }
    return colorSelector;
});
