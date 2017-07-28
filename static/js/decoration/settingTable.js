define(["jquery","handlebars","./linkSelector","./imageDialog"],function ($,handlebars,linkSelector,imageDialog) {
    var table_html = '<div class="setting-table"><table><tbody class="setting-table-body"></tbody><tbody class="setting-table-newbody"></tbody></table><input type="hidden"></div>',
        row_tmpl = handlebars.compile('<tr class="setting-table-row">' +
            '<td class="text-cell"><div class="cell"><input type="text" placeholder="{{placeholder}}" value="{{title}}"/></div></td>' +
            '{{#unless noImage}}<td class="img-cell"><div class="cell">' +
                '<div class="img-wrap{{#unless content}} img-add{{/unless}}" data-isimage="{{#if isImage}}1{{else}}0{{/if}}" data-content="{{content}}">' +
                    '<span class="img iconfont">' +
                        '{{#unless content}}' +
                            '+' +
                        '{{else}}' +
                            '{{#if isImage}}' +
                                '<img src="{{content}}"/>' +
                            '{{else}}' +
                                '{{content}}' +
                            '{{/if}}' +
                        '{{/unless}}' +
                    '</span><b class="close">✕</b>' +
                '</div></div></td>{{/unless}}' +
            '<td class="link-cell"><div class="cell"><div class="linkSelect" data-value=\'{{{json link}}}\'></div></div></td>' +
            '<td class="ctrl-cell"><div class="cell"><div class="editbar"><a class="edit-up" href="javascript:void(0)">向上</a><a class="edit-down" href="javascript:void(0)">向下</a><a class="edit-delete" href="javascript:void(0)">删除</a></div></div></td>' +
            '</tr>'),
        default_placeholder = "请输入图标名称";

    function settingTable(render,options){
        $(render).each(function (i,v) {
            var wrap = $(this),
                name = wrap.attr("data-name"),
                tag = wrap.attr("data-tag"),
                value = wrap.attr("data-value"),
                showImagetab = wrap.attr("data-showtab"),
                maxCount = wrap.attr("data-max-count"),
                noImage = parseInt(wrap.attr("data-noimage")) == 1 ? true : false,
                placeholder = wrap.attr("data-placeholder") || default_placeholder;

            if(wrap.data("init") == true) return;

            wrap.html(table_html);

            var setTableBody = wrap.find(".setting-table-body"),
                setTableNewBody = wrap.find(".setting-table-newbody");

            try{
                showImagetab = $.parseJSON(showImagetab)
            }catch (e){};

            var dataStore = wrap.find("input[type=hidden]");
            if(name) dataStore.attr("name",name);
            if(tag) dataStore.attr("data-tag",tag);

            if(value){
                var v = $.parseJSON(value);
                var html = "";
                for(var i = 0; i < v.length; i++){
                    if(noImage)
                        $.extend(v[i],{"noImage":noImage});
                    if(placeholder)
                        $.extend(v[i],{"placeholder":placeholder});
                    html+= row_tmpl(v[i]);
                }
                setTableBody.html(html);
                linkSelector(setTableBody.find(".linkSelect"), function (data) {
                    linkChange.apply(this,[data]);
                });
                dataStore.val(value);
            }

            addNewRow();
            /*add row*/
            wrap.on("change",".setting-table-newbody .text-cell input", function () {
                var row = $(this).closest(".setting-table-row");
                fixRow(row);
            });

            wrap.on("change",".text-cell input", function () {
                setData();
            });

            /*img*/
            wrap.on("click",".img-wrap .close", function () {
                var img = $(this).closest(".img-wrap");
                img.find(".img").html("+");
                img.addClass("img-add").attr("data-isimage",0).attr("data-content","");
                setData();
            });
            wrap.on("click",".img", function () {
                var img = $(this).closest(".img-wrap");

                imageDialog({
                    showTab : showImagetab,
                    callback : function (value) {
                        var isImage = parseInt(value.isImage),
                            content = decodeURIComponent(value.content);
                        img.removeClass("img-add")
                            .attr({
                                "data-isimage":isImage,
                                "data-content":content
                            });

                        if(isImage){
                            img.find(".img").html('<img src="'+content+'">');
                        }else{
                            img.find(".img").html(content);
                        }

                        if(img.closest(".setting-table-newbody")[0]){
                            var row = img.closest(".setting-table-row");
                            fixRow(row);
                        }
                        setData();
                    }
                });
            });

            /*ctrl*/
            wrap.on("click",".editbar a", function () {
                var row = $(this).closest(".setting-table-row"),
                    type = $(this).attr("class"),
                    count = setTableBody.find(".setting-table-row").length,
                    target,
                    opType,
                    opIndex = row.index();
                if(type == "edit-up"){
                    target = row.prev();
                    target.before(row);
                    opType = "moveup";
                }else if(type == "edit-down"){
                    target = row.next(":not(.row-new)");
                    target.after(row);
                    opType = "movedown";
                }else if(type == "edit-delete"){
                    if(options && typeof(options.beforeDelete) == "function"){
                        if(!options.beforeDelete.call(dataStore[0],opIndex)) return;
                    }
                    row.remove();
                    if(count == maxCount) addNewRow();
                    opType = "delete";
                }
                setData(opType,opIndex);
            });

            wrap.data("init",true);

            function fixRow(row){
                row.appendTo(setTableBody)
                if(row.is(":last-child"))
                    addNewRow();
            }
            function addRow(data,target){
                var row = row_tmpl(data),
                    tb = target || setTableBody,
                    count = wrap.find(".setting-table-row").length;

                if(count >= maxCount) return;
                row = $(row);
                tb.append(row);
                linkSelector(row.find(".linkSelect"),  function (data) {
                    linkChange.apply(this,[data]);
                });
            }
            function addNewRow(){
                var placeholder = wrap.attr("data-placeholder") || default_placeholder,
                    data = {"placeholder":placeholder,"noImage":noImage};
                addRow(data,setTableNewBody);
            }
            function linkChange(data){
                /*var row = $(this).closest(".setting-table-row");
                if(row.closest(".setting-table-newbody")[0]){
                    fixRow(row);
                }*/
                setData();
            }
            function setData(optype,opindex){
                var data = [];
                wrap.find(".setting-table-body .setting-table-row").each(function () {
                    var row = $(this),
                        value_text = row.find(".text-cell input").val(),
                        imgwrap = row.find(".img-cell .img-wrap"),
                        isimage = imgwrap.attr("data-isimage"),
                        value_link = row.find(".link-cell input[type=hidden]").val();

                    var rowdata = {
                        "title" : value_text,
                        "link" : $.parseJSON(value_link)
                    };
                    if(!noImage){
                        rowdata.content = imgwrap.attr("data-content");
                        rowdata.isImage = Boolean(parseInt(isimage));
                    }
                    data.push(rowdata);
                });
                var dataStore = wrap.find(".setting-table > input[type=hidden]");
                dataStore.val(JSON.stringify(data));

                var callback;
                if(typeof(options) == "function"){
                    callback = options;
                }else{
                    callback = options.callback;
                }
                if(callback && wrap.data("init") == true)
                    callback.call(dataStore[0],data,optype,opindex);
            }
        });
    }

    return settingTable;
});
