define(["jquery","handlebars","./imageDialog"],function ($,handlebars,imageDialog) {
    var row_html = '<div class="img-upload-row{{#unless img}} img-upload-row-nopic{{/unless}}" data-size="{{size}}">' +
            '<div class="imgbox" style="width:{{width}}px;height:{{height}}px;">' +
                '<div class="img">{{#unless img}}+添加图片{{else}}<img src="{{img}}" alt=""/>{{/unless}}</div>' +
                '<div class="editbar">' +
                    '<a class="edit-delete" href="javascript:void(0)"></a>' +
                '</div>' +
            '</div><input type="hidden">' +
        '</div>',
        row_tmpl = handlebars.compile(row_html);

    function imageSelector(render,callback){
        $(render).each(function (i,v) {
            var wrap = $(this),
                name = wrap.attr("data-name"),
                tag = wrap.attr("data-tag"),
                value = wrap.attr("data-value"),
                size = wrap.attr("data-size"),
                pixelratio = parseInt(wrap.attr("data-pixelratio")) || 1;

            if(wrap.data("init") == true) return;

            var dimension = size && size.split("x"),
                width = dimension && dimension[0]/pixelratio,
                height = dimension && dimension[1]/pixelratio
                data = {
                    "img" : value,
                    "size" : size,
                    "width" : width,
                    "height" : height
                };
            wrap.html(row_tmpl(data));

            var dataStore = wrap.find("input[type=hidden]");
            if(name) dataStore.attr("name",name);
            if(tag) dataStore.attr("data-tag",tag);

            if(value){
                dataStore.val(value);
            }

            /*img*/
            wrap.on("click",".imgbox", function () {
                var img = $(this).find(".img"),
                    row = img.closest(".img-upload-row");
                imageDialog({
                    showTab : [0,1],
                    callback: function (value) {
                        img.html('<img src="'+value.content+'">');
                        row.removeClass("img-upload-row-nopic");
                        setData();
                    }
                });
            });
            wrap.on("click",".img-upload-row .editbar a", function (e) {
                e.stopPropagation();
                var row = $(this).closest(".img-upload-row"),
                    type = $(this).attr("class");

                if(type == "edit-delete"){
                    row.addClass("img-upload-row-nopic");
                    row.find(".img").html("+添加图片");
                }
                setData();
            });

            wrap.data("init",true);

            function setData(){
                var value = wrap.find(".img img").attr("src");
                dataStore.val(value);

                if(callback && wrap.data("init") == true)
                    callback.call(dataStore[0],value);
            }
        });
    }

    return imageSelector;
});
