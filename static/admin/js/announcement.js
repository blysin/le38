function comboList(render){
    $(render).each(function (i,v) {
        var wrap = $(this);
        var dataStore = wrap.find("input[type=hidden]"),
            menu = wrap.find(".comboListMenu"),
            selectedItem;
        menu.hide();
        wrap.on("mouseenter", function () {
            wrap.addClass("opened");
            menu.show();
        }).on("mouseleave", function () {
            wrap.removeClass("opened");
            menu.hide();
        }).on("click",".comboListMenu li", function () {
            itemClick($(this));
        });

        function itemClick(item){
            if(selectedItem && selectedItem[0]){
                selectedItem.removeClass("selected");
            }
            item.addClass("selected");
            dataStore.val(item.attr("value"));
            selectedItem = item;
        }
    });
}

function colorSelector(render){
    var wrap = $(render);
    wrap.each(function (i,v) {
        var $this = $(this);
        var colorSet = $this.find(".color-set-wrap"),
            colorInd = colorSet.find(".color-set-label b"),
            colorText = colorSet.find(".color-set-text"),
            colorSelect = colorSet.find(".color-set-select"),
            dataStore = $this.find("input[type=hidden]");
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

        function setData(){
            var v = colorText.val(),
                value;
            if($.trim(v) == ""){
                value = "";
            }else{
                value = "#"+v;
            }
            dataStore.val(value);

        }
    });
}


function fontStyler(render){
    $(render).each(function (i,v) {
        var wrap = $(this);
        var itemSize = wrap.find(".fs-item-size a"),
            dropmenu = wrap.find(".fs-dropmenu"),
            itemWeight = wrap.find(".fs-item-weight a"),
            itemColor = wrap.find(".fs-item-color a"),
            colorInput = itemColor.find("input[type=color]"),
            fontSizeHidden = wrap.find("input[name='font.fontSize']"),
            fontWeightHidden = wrap.find("input[name='font.fontWeight']"),
            colorHidden = wrap.find("input[name='font.color']"),
            timer;
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

        function setData(){
            var size = dropmenu.find("li.selected").attr("data-value"),
                weight = itemWeight.hasClass("active") ? "bold" : "normal",
                color = colorInput.val();
            value = {
                "fontSize" : size,
                "fontWeight" : weight,
                "color" : color
            };
            fontSizeHidden.val(size);
            fontWeightHidden.val(weight);
            colorHidden.val(color);
            //dataStore.val(JSON.stringify(value));
        }
    });
}