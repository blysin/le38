define(["jquery"],function ($) {
    var selector_html = '<div class="link-selector-wrap">' +
            '<select class="link-selector-cat"><option selected value="no">无链接</option><option value="url">URL链接</option></select>' +
            '<select class="link-selector-url"></select>' +
            '<input class="control-text" type="text" placeholder="输入URL链接"/>' +
            '<label class="link-selector-new"><input type="checkbox"/>新窗口打开</label><input type="hidden"/>' +
        '</div>',
        dfd = $.Deferred();

    $.ajax(window.getLinkUrl, {
        dataType : "json",
        success : function (linksData) {
            dfd.resolve(linksData);
        }
    });

    function linkSelector(render,callback){
        dfd.done(function (linksData) {
            init(render,callback,linksData);
        });
    }
    function init(render,callback,linksData){
        $(render).each(function (i,v) {
            var wrap = $(this),
                name = wrap.attr("data-name"),
                tag = wrap.attr("data-tag"),
                value = wrap.attr("data-value"),
                showNew = wrap.attr("data-new");

            if(wrap.data("init") == true) return;

            wrap.html(selector_html);
            var catSelect = wrap.find(".link-selector-cat"),
                urlSelect = wrap.find(".link-selector-url"),
                urlText = wrap.find(".control-text"),
                linkNew = wrap.find(".link-selector-new"),
                linkNewCtrl = linkNew.find("input:checkbox"),
                dataStore = wrap.find("input[type=hidden]");

            if(name) dataStore.attr("name",name);
            if(tag) dataStore.attr("data-tag",tag);
            if(value && value!="null"){
                value = $.parseJSON(value);
                var vType = value.category;
                catSelect.val(value.category);
                if(vType == "url"){
                    urlText.val(value.url);
                }else{
                    urlSelect.val(value.url);
                }
                linkNewCtrl.prop("checked",value.isNew);
                dataStore.val(JSON.stringify(value));
            }
            categoryChange.call(catSelect[0]);

            catSelect.on("change", categoryChange);

            function categoryChange(){
                var type = this.value;
                urlSelect.hide();
                urlText.hide();
                linkNew.hide();

                if(type == "no"){

                }else if(type == "url"){
                    urlText.show();
                }else{
                    var data = $.grep(linksData, function (v) {
                            return v.type == type;
                        })[0].data,
                        options = "";
                    for(var i = 0; i < data.length; i++){
                        var d = data[i],s = "&nbsp;&nbsp;";
                        if(!d.url && d.child)
                            options += '<optgroup label="'+ d.name +'">';
                        if(d.url)
                            options += '<option value="'+ d.url +'">' + d.name +'</option>';
                        if(d.child)
                            loop(d.child,s);
                        if(!d.url && d.child)
                            options += '</optgroup>';
                    }
                    urlSelect.html(options).show();
                    if (value && value.url) {
                        urlSelect.val(value.url);
                    }
                    if(showNew) linkNew.show();

                    function loop(dat,space){
                        for(var j=0; j < dat.length; j++){
                            options += '<option value="'+ dat[j].url +'">'+ space + dat[j].name +'</option>';
                            if(dat[j].child){
                                space+="&nbsp;&nbsp;";
                                loop(dat[j].child,space);
                            }
                        }
                    }
                }

                setData();
            }

            urlSelect.add(linkNewCtrl).on("change", function () {
                setData();
            });

            urlText.on("change", function () {
                setData();
            });

            wrap.data("init",true);

            function setData(){
                var dataStore = wrap.find("input[type=hidden]"),
                    category = catSelect.val(),
                    isnew = linkNewCtrl.prop("checked"),
                    url,
                    value;

                if(category == "no"){
                    url = "javascript:void(0)";
                }else if(category == "url"){
                    url = urlText.val();
                }else{
                    url = urlSelect.val();
                }

                value = {
                    "category" : category,
                    "url" : url,
                    "isNew" : isnew
                }

                dataStore.val(JSON.stringify(value));
                if(callback && wrap.data("init") == true)
                    callback.call(dataStore[0],value);
            }
        });
    }
    return linkSelector;
});
