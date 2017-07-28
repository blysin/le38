define(["jquery","ueditor"],function ($) {
    function richText(render,callback){
        $(render).each(function (i,v) {
            var editorID = "richmedia_"+(new Date().getTime());
            var html = '<script id="'+editorID+'" type="text/plain"></script><input type="hidden">';
            var wrap = $(this),
                name = wrap.attr("data-name"),
                tag = wrap.attr("data-tag"),
                value = wrap.attr("data-value"),
                width = parseInt(wrap.attr("data-width"));

            width && (width+=16);

            wrap.html(html);

            var dataStore = wrap.find("input[type=hidden]"),
                editbox = wrap.find("script");
            if(name) dataStore.attr("name",name);
            if(tag) dataStore.attr("data-tag",tag);

            if(value){
                dataStore.val(value);
            }

            var css = ".view{font:12px/1.5 tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif; color: #000;}img{max-width:100%; width:auto; height:auto;}";
            var editor = UE.getEditor(editorID,{
                initialFrameWidth : width,
                initialContent : value,
                initialStyle : css,
                allowDivTransToP : false,
                autoClearEmptyNode : false
            });

            editor.addListener("contentChange", function () {
                setData();
            });

            function setData(){
                var html = editor.getContent();
                dataStore.val(html);

                if(callback)
                    callback.call(dataStore[0],dataStore.val());
            }
        });
    }

    return richText;
});
