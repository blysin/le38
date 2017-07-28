define(["jquery","handlebars","./linkSelector","./imageDialog"],function ($,handlebars,linkSelector,imageDialog) {
    var list_html = '<div class="image-select-list"><input type="hidden"></div>',
        row_html = '<div class="img-upload-row{{#if newRow}} img-upload-row-nopic{{/if}}" data-size="{{size}}">' +
            '<div class="imgbox" style="width:{{width}}px;height:{{height}}px;">' +
                '<div class="img">{{#if newRow}}+添加图片{{else}}<img src="{{img}}" alt=""/>{{/if}}</div>' +
                '<div class="editbar">' +
                    '<a class="edit-up" href="javascript:void(0)"></a>' +
                    '<a class="edit-down" href="javascript:void(0)"></a>' +
                    '<a class="edit-delete" href="javascript:void(0)"></a>' +
                '</div>' +
            '</div>' +
            '<div class="row-info">' +
                '<div class="row row-link"><span class="t">链接至</span><div class="img-upload-link" data-value="{{json link}}"></div></div>' +
                '{{#if size}}<div class="row row-size"><span class="t">建议尺寸</span>{{size}}像素</div>{{/if}}' +
            '</div>' +
        '</div>',
        row_tmpl = handlebars.compile(row_html),
        group_html = '<div class="img-upload-group">' +
                '<div class="editbar group-editbar">' +
                    '<a class="edit-up" href="javascript:void(0)"></a>' +
                    '<a class="edit-down" href="javascript:void(0)"></a>' +
                    '<a class="edit-delete" href="javascript:void(0)"></a>' +
                '</div>' +
            '</div>',
        groupClass = ".img-upload-group",
        rowClass = ".img-upload-row";

    function imageList(render,callback){
        $(render).each(function (i,v) {
            var wrap = $(this),
                name = wrap.attr("data-name"),
                tag = wrap.attr("data-tag"),
                value = wrap.attr("data-value"),
                sizes = wrap.attr("data-sizes"),
                pixelratio = parseFloat(wrap.attr("data-pixelratio")) || 1,
                multiple = wrap.attr("data-multiple") == "1" ? true : false;

            if(wrap.data("init") == true) return;

            try{
                sizes = $.parseJSON(sizes);
            }catch (e){};

            wrap.html(list_html);

            var dataStore = wrap.find("input[type=hidden]"),
                list = wrap.find(".image-select-list");
            if(name) dataStore.attr("name",name);
            if(tag) dataStore.attr("data-tag",tag);

            if(multiple){
                var btnAddGroup = $('<div class="list-add"><a href="javascript:void(0)">+ 添加一组</a></div>');
                btnAddGroup.on("click", function () {
                    addGroup();
                });
                wrap.append(btnAddGroup);

                wrap.on("click",".group-editbar a", function () {
                    var group = $(this).closest(groupClass),
                        type = $(this).attr("class"),
                        target;

                    if(type == "edit-up"){
                        target = group.prev(groupClass);
                        target.before(group);
                    }else if(type == "edit-down"){
                        target = group.next(groupClass);
                        target.after(group);
                    }else if(type == "edit-delete"){
                        group.remove();
                    }
                    fixOrder();
                    setData();
                });
            }

            if(value){
                var v;
                try{
                    v = $.parseJSON(value);
                }catch (e){}
                if(multiple){
                    for(var i = 0; i < v.length; i++){
                        addGroup(v[i]);
                    }
                }else{
                    renderGroup(v,list);
                }
                dataStore.val(value);
            }

            /*img*/
            wrap.on("click",".imgbox", function () {
                var img = $(this).find(".img"),
                    row = img.closest(rowClass);
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
                var row = $(this).closest(rowClass),
                    type = $(this).attr("class"),
                    target;

                if(type == "edit-up"){
                    target = row.prev(rowClass);
                    target.before(row);
                }else if(type == "edit-down"){
                    target = row.next(rowClass);
                    target.after(row);
                }else if(type == "edit-delete"){
                    fixRow(row);
                }

                if(target && target[0]){
                    var targImg = target.find(".imgbox"),
                        sourceImg = row.find(".imgbox"),
                        targetDimension = targImg[0].style.cssText,
                        sourceDimension = sourceImg[0].style.cssText,
                        targSize = target.find(".row-size"),
                        sourceSize = row.find(".row-size"),
                        targSizeCon = targSize.html(),
                        sourceSizeCon = sourceSize.html();
                    targImg[0].style.cssText = sourceDimension;
                    sourceImg[0].style.cssText = targetDimension;
                    targSize.html(sourceSizeCon);
                    sourceSize.html(targSizeCon);
                }
                setData();
            });

            wrap.data("init",true);


            function fixRow(row){
                row.addClass("img-upload-row-nopic");
                row.find(".img").html("+添加图片");
            }
            function fixOrder(){
                wrap.find(groupClass).each(function (i) {
                    $(this).find(".group-title").html("第"+(i+1)+"组");
                });
            }
            function insertRow(group,data,before){
                var row = row_tmpl(data);
                row = $(row);
                if(before){
                    $(before).before(row);
                }else{
                    group.append(row);
                }
                linkSelector(row.find(".img-upload-link"),  function (data) {
                    setData();
                });
            }
            function insertNewRow(group,data,before){
                if(data){
                    $.extend(data,{"newRow":true});
                }
                insertRow(group,data,before);
            }
            function renderGroup(data,group){
                if(!sizes) sizes = [''];
                for(var i=0; i < sizes.length; i++){
                    var dim = sizes[i].split("x"),
                        width = dim[0]/pixelratio,
                        height = dim[1]/pixelratio,
                        dat = {"size":sizes[i]};

                    if(width) dat.width = width;
                    if(height) dat.height = height;

                    if(data && data[i] && data[i].img){
                        if(sizes[i]){
                            $.extend(data[i],dat);
                        }
                        insertRow(group,data[i]);
                    }else{
                        insertNewRow(group,dat);
                    }
                }
            }
            function addGroup(data){
                var groupCount = wrap.find(groupClass).length + 1,
                    group = $(group_html);
                group.append('<div class="group-title">第'+ groupCount +'组</div>');

                renderGroup(data,group);
                list.append(group);
            }

            function setData(){
                var data = [];
                if(multiple){
                    wrap.find(groupClass).each(function (i) {
                        var d = getRowData(this);
                        data.push(d);
                    });
                }else{
                    data = getRowData(list);
                }

                var dataStore = wrap.find(".image-select-list > input[type=hidden]");
                dataStore.val(JSON.stringify(data));

                if(callback && wrap.data("init") == true)
                    callback.call(dataStore[0],data);

                function getRowData(group){
                    var d = [];
                    $(group).find(rowClass).each(function () {
                        var row = $(this),
                            rowdata = {};
                        if(!row.hasClass("img-upload-row-nopic")){
                            var value_img = row.find(".img img").attr("src"),
                                value_link = row.find(".img-upload-link input[type=hidden]").val()
                            rowdata = {
                                "img" : value_img,
                                "link" : $.parseJSON(value_link)
                            };
                        }
                        d.push(rowdata);
                    });
                    return d;
                }
            }
        });
    }

    return imageList;
});
