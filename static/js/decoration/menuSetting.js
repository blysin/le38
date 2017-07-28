define(["jquery","handlebars","./linkSelector","./colorSelector","./fontStyler","./settingTable"],function ($,handlebars,linkSelector,colorSelector,fontStyler,settingTable) {
    var control_html = '<div class="menu-setting-wrap"><div class="menu-setting-grid"></div><div class="menu-setting-edit"></div><input type="hidden"></div>',
        edit_root = '<div class="menu-setting-edit-row"><!--<div class="colorSelect"></div>--></div><div class="menu-setting-edit-row"><div class="settingTable" data-showtab="[2]" data-placeholder="请输入导航名称"></div></div>',
        edit_sub = '<div class="menu-setting-edit-row"><input class="control-text input-large" type="text" placeholder="请输入标题">&nbsp;<div class="fontStyler"></div></div><div class="menu-setting-edit-row"><div class="linkSelect"></div></div>';

    function menuSetting(render,callback){
        $(render).each(function (i,v) {
            var wrap = $(this),
                name = wrap.attr("data-name"),
                tag = wrap.attr("data-tag"),
                value = wrap.attr("data-value");

            if(wrap.data("init") == true) return;

            wrap.html(control_html);

            var grid = wrap.find(".menu-setting-grid"),
                editArea = wrap.find(".menu-setting-edit"),
                dataStore = wrap.find("input[type=hidden]"),
                dataCol = wrap.attr("data-col") || 4,
                dataRow = wrap.attr("data-row") || 5,
                editCell;
            if(name) dataStore.attr("name",name);
            if(tag) dataStore.attr("data-tag",tag);

            renderGrid();
            if(value){
                dataStore.val(value);
                initValue();
            }

            grid.on("click",".menu-setting-col .cell", function () {
                var rootCells = grid.find(".menu-setting-root li"),
                    cell = $(this),
                    menuCol = cell.closest(".menu-setting-col"),
                    index = menuCol.index();

                if(rootCells.eq(index).find(".cell").html() == "") return;

                if(editCell && editCell[0]){
                    if(editCell[0] == this) return;
                    editCell.removeClass("selected");
                }
                cell.addClass("selected");
                editCell = cell;

                editArea.html(edit_sub);
                var data = cell.data("value") || {},
                    titleInput = editArea.find(".control-text"),
                    fontInput = editArea.find(".fontStyler"),
                    linkInput = editArea.find(".linkSelect");
                if(data){
                    if(data.title) titleInput.val(data.title);
                    if(data.font) fontInput.attr("data-value",JSON.stringify(data.font));
                    if(data.link) linkInput.attr("data-value",JSON.stringify(data.link));
                }
                titleInput.on("change", function () {
                    $.extend(data,{"title": $.trim(this.value)});
                    cell.html(this.value).data("value",data);
                    setData();
                });
                fontStyler(fontInput, function (value) {
                    $.extend(data,{"font":value});
                    cell.css(value).data("value",data);
                    setData();
                });
                linkSelector(linkInput, function (value) {
                    $.extend(data,{"link":value});
                    cell.data("value",data);
                    setData();
                });
            });

            grid.on("click",".menu-setting-root .cell", function () {
                if(editCell && editCell[0]){
                    if(editCell[0] == this) return;
                    editCell.removeClass("selected");
                }

                editArea.html(edit_root);
                var cell = $(this),
                    rootMenu = cell.closest(".menu-setting-root"),
                    data = rootMenu.data("value"),
                    //colorInput = editArea.find(".colorSelect"),
                    setTable = editArea.find(".settingTable");

                cell.addClass("selected");
                editCell = cell;

                if(data){
                    //if(data.bgcolor) colorInput.attr("data-value",data.bgcolor);
                    if(data.list) setTable.attr("data-value",JSON.stringify(data.list));
                }
                setTable.attr("data-max-count",dataCol);

                /*colorSelector(colorInput, function (value) {
                    $.extend(data,{"bgcolor":value});
                    rootMenu.data("value",data);
                    setData();
                });*/

                settingTable(setTable, {
                    callback : function (value,opType,opIndex) {
                        var menuCol = grid.find(".menu-setting-col").eq(opIndex);
                        $.extend(data,{"list":value});
                        rootMenu.data("value",data);
                        initRootValue(data);
                        if(opType == "movedown"){
                            menuCol.insertAfter(menuCol.next(".menu-setting-col"));
                        }else if(opType == "moveup"){
                            menuCol.insertBefore(menuCol.prev(".menu-setting-col"));
                        }else if(opType == "delete"){
                            menuCol.remove();
                            var html ='<ul class="menu-setting-col">';
                            for(var j=0; j < dataRow; j++){
                                html+='<li><div class="cell"></div></li>';
                            }
                            html +='</ul>';
                            grid.find(".menu-setting-root").before(html);
                        }
                        setData();
                    },
                    beforeDelete : function (index) {
                        var menuColCells = grid.find(".menu-setting-col").eq(index).find(".cell");
                        for(var i = 0; i < menuColCells.length; i++){
                            if(menuColCells.eq(i).html() != ""){
                                return confirm("这列菜单含有子菜单，将会删除所有子菜单，是否确定？");
                            }
                        }
                        return true;
                    }
                });
            });

            wrap.data("init",true);

            function renderGrid(){
                var html = "";

                for(var i = 0; i < dataCol; i++){
                    html+='<ul class="menu-setting-col">';
                    for(var j=0; j < dataRow; j++){
                        html+='<li><div class="cell"></div></li>';
                    }
                    html+='</ul>';
                }
                html+='<ul class="menu-setting-root">';
                for(var i = 0; i < dataCol; i++){
                    html+='<li><div class="cell"></div></li>';
                }
                html+='</ul>';

                grid.html(html);
            }
            function initRootValue(val){
                var rootRow = wrap.find(".menu-setting-root"),
                    rootCells = rootRow.find(".cell"),
                    rootData = {"list":val.list};

                for(var i=0; i < rootCells.length; i++){
                    var dataCol = val.list[i];
                    if(dataCol){
                        if(dataCol.content){
                            if(dataCol.isImage){
                                rootCells.eq(i).html('<img src="'+ dataCol.content +'">');
                            }else{
                                rootCells.eq(i).html(dataCol.content);
                            }
                        }else{
                            rootCells.eq(i).html(dataCol.title);
                        }
                    }else{
                        rootCells.eq(i).html("");
                    }
                }

                rootRow.data("value",rootData);
            }
            function initValue(){
                var cols = wrap.find(".menu-setting-col"),
                    val = dataStore.val();
                val = $.parseJSON(val);

                initRootValue(val);

                for(var i = 0; i < cols.length; i++){
                    var dataCol = val.list[i];
                    if(!dataCol) continue;
                    var col = cols.eq(i),
                        subCells = col.find("li:not(.menu-root) .cell"),
                        dataSub = dataCol.submenu;

                    if(!dataSub || dataSub.length == 0) continue;
                    for(var j=0; j < subCells.length; j++){
                        if(dataSub[j]){
                            subCells.eq(j).html(dataSub[j].title).data("value",dataSub[j]);
                        }
                    }
                }
            }

            function setData(){
                var dat = [],
                    subcols = wrap.find(".menu-setting-col"),
                    menuRoot = wrap.find(".menu-setting-root"),
                    rootData = menuRoot.data("value");

                menuRoot.find(".cell").each(function (i,v) {
                    if(v.innerHTML == "") return;
                    var subCells = subcols.eq(i).find(".cell"),
                        subData = [],
                        coldata = rootData.list[i];

                    subCells.each(function () {
                        var subvalue = $(this).data("value");
                        if(subvalue && subvalue.title) subData.push(subvalue);
                    });

                    coldata.submenu = subData;
                    dat.push(coldata);
                });
                rootData.list = dat;

                dataStore.val(JSON.stringify(rootData));

                if(callback && wrap.data("init") == true)
                    callback.call(dataStore[0],rootData);
            }
        });
    }

    return menuSetting;
});
