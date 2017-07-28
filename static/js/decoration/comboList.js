define(["jquery"],function ($) {
    function comboList(render,callback){
        $(render).each(function (i,v) {
            var wrap = $(this),
                name = wrap.attr("data-name"),
                tag = wrap.attr("data-tag"),
                value = wrap.attr("data-value");
            if(wrap.data("init") == true) return;

            var dataStore = $('<input type="hidden">'),
                menu = wrap.find(".comboListMenu"),
                selectedItem;
            wrap.append(dataStore);
            menu.hide();

            if(name) dataStore.attr("name",name);
            if(tag) dataStore.attr("data-tag",tag);
            if(value){
                dataStore.val(value);
                selectedItem = wrap.find(".comboListMenu li[value="+ value +"]");
                itemClick(selectedItem);
            }

            wrap.on("mouseenter", function () {
                wrap.addClass("opened");
                menu.show();
            }).on("mouseleave", function () {
                wrap.removeClass("opened");
                menu.hide();
            }).on("click",".comboListMenu li", function () {
                itemClick($(this));
                if(callback)
                    callback.call(dataStore[0],dataStore.val());
            });

            function itemClick(item){
                if(selectedItem && selectedItem[0]){
                    selectedItem.removeClass("selected");
                }
                item.addClass("selected");
                dataStore.val(item.attr("value"));
                selectedItem = item;
            }

            wrap.data("init",true);
        });
    }
    return comboList;
});
