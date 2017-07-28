define(['jquery','handlebars','common','decoration/colorSelector','decoration/linkSelector','decoration/activitySelector','decoration/settingTable','decoration/imageList','decoration/imageSelector','decoration/productSelector','decoration/richText','decoration/fontStyler','decoration/comboList','decoration/mobile/preset_layout_list','json!mobileDecoration/config/modulesList.json'],function ($,handlebars,common,colorSelector,linkSelector,activitySelector,settingTable,imageList,imageSelector,productSelector,richText,fontStyler,comboList,presetLayouts,sideMenuData) {
    var sideMenuTpl = '{{#each .}}<div class="dcm-side-menu-item">' +
        '<div class="dcm-side-menu-item-wrap">' +
        '<div class="dcm-side-menu-title"><span class="title-txt">{{title}}</span></div>' +
        '<div class="dcm-side-menu-body">' +
        '<div class="dcm-side-menu-list">' +
        '<ul>{{#each modules}}' +
        '<li draggable="true" data-name="{{title}}" data-type="{{../category}}{{category}}_{{type}}">' +
        '<b style="background-image: url(/static/decoration/mobile/images/modules/{{../category}}{{category}}_{{type}}.png); height:{{height}}px;"></b>' +
        '<span>{{title}}</span>' +
        '</li>' +
        '{{/each}}</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>{{/each}}';

    var previewBox = $(".dcm-preview-box-page"),
        modContainer = previewBox.find(".containerwrap"),
        sideMenu = $(".dcm-side-menu"),
        editFormTitle = $(".dcm-setting-title .title-txt"),
        editFormBody = $(".setting-body-in"),
        modules = {},
        modWrapClass = ".dcm-module-wrap",
        modInClass = ".dcm-module-in",
        modActiveClass = "dcm-module-active",
        modWrapHTML = '<div class="dcm-module-wrap"><div class="dcm-module-tool"><a class="dcm-ico-move" href="javascript:void(0)">拖动</a><a class="dcm-ico-up" href="javascript:void(0)">向上</a><a class="dcm-ico-down" href="javascript:void(0)">向下</a><a class="dcm-ico-delete" href="javascript:void(0)">删除</a></div><div class="dcm-module-in"></div></div>',
        publishButton = $("#J_btn_publish"),
        saveButton = $("#J_btn_save"),
        previewButton = $("#J_btn_preview"),
        s_publishButton = $("#MS_J_btn_publish"),
        s_saveButton = $("#MS_J_btn_save"),
        s_previewButton = $("#MS_J_btn_preview"),
        layoutData = [],
        tempLayoutData = [],
        presetLayoutData,
        currentEditModule;

    function loadModules(){
        var c = 0,t = 0;
        $.each(sideMenuData, function (i,cat) {
            $.each(cat.modules, function (j, mod) {
                c++;
                require(['mobileModules/'+cat.category+'/'+mod.type+'/main'], function (module) {
                    t++;
                    modules[cat.category+'_'+mod.type] = module;
                    if(t >= c){
                        $.ajax({
                            url : window.layoutDataUrl,
                            dataType : "json",
                            success : function (data) {
                                layoutData = data;
                                init();
                            }
                        });
                    }
                });
            });
        });
    }

    function getModuleTitle(moduleName){
        var type = moduleName.split("_"),
            cat = $.grep(sideMenuData,function (v) {
                return v.category == type[0];
            }),
            mod = $.grep(cat[0].modules,function (v){
                return v.type == type[1];
            });
        return {
            "category" : cat[0].title,
            "type" : mod[0].title
        };
    }

    //生成模板
    function insertModule(moduleName,before){
        var mod = modules[moduleName],
            tmpl = handlebars.compile(mod.tmpl),
            wrapper = $(modWrapHTML),
            id = "mod_"+(new Date()).getTime(),
            data = $.extend(true,{"id":id,"type":moduleName},{"data":mod.data});

        wrapper.attr({
            "data-id":id,
            "data-type":moduleName,
            "data-config":JSON.stringify(mod.data)
        });

        try{
            wrapper.find(modInClass).html(tmpl(mod.data));
        }catch (e){
            console.log(e);
        }

        var lazyloadImages = wrapper.find(".lazyload");
        lazyloadImages.each(function () {
            this.src = this.getAttribute("data-src");
        });
        if(before[0]){
            before.before(wrapper);
            var beforeId = before.attr("data-id"),
                beforeOrder = getModuleOrder(beforeId);
            if(beforeOrder > -1) tempLayoutData.splice(beforeOrder,0,data);
        }else{
            modContainer.append(wrapper);
            tempLayoutData.push(data);
        }
        if(mod.init) mod.init();
    }

    function moveModule(module,before){
        var id = module.attr("data-id");
        if(before && before[0]){
            var beforeId = before.attr("data-id"),
                beforeOrder = getModuleOrder(beforeId);
            if(beforeId == id) return;
        }
        var data = tempLayoutData.splice(getModuleOrder(id),1)[0];

        if(before && before[0]){
            before.before(module);
            if(beforeOrder > -1) tempLayoutData.splice(beforeOrder,0,data);
        }else{
            modContainer.append(module);
            tempLayoutData.push(data);
        }
    }

    function deleteModule(module){
        var id = module.attr("data-id"),
            setForm = editFormBody.find("form[data-module-id="+id+"]"),
            editForm = editFormBody.data("editForm")
        module.remove();
        tempLayoutData.splice(getModuleOrder(id),1);
        if(setForm[0]){
            if(editForm && editForm[0] == setForm[0]){
                editFormBody.data("editForm","");
                editFormTitle.html("");
            }
            setForm.remove();
            currentEditModule = null;
        }
    }

    function getModuleOrder(moduleId){
        var order;
        for(var i=0; i < tempLayoutData.length; i++){
            if(tempLayoutData[i].id == moduleId){
                order = i;
                break;
            }
        }
        return order;
    }

    function editModule(module){
        if(currentEditModule){
            currentEditModule.removeClass("dcm-module-edit");
        }
        var type = module.attr("data-type"),
            id = module.attr("data-id"),
            title = getModuleTitle(type),
            data = $.parseJSON(module.attr("data-config")),
            modSettingTmpl = handlebars.compile(modules[type].setting);
        editFormTitle.html(title.category + " - " + title.type);

        var setForm = editFormBody.find("form[data-module-id="+id+"]"),
            editForm = editFormBody.data("editForm");

        if(editForm && editForm[0]){
            editForm.hide();
        }
        if(setForm[0]){
            setForm.show();
        }else{
            setForm = $('<form data-module-id="'+ id +'">'+modSettingTmpl(data)+'</form>');
            editFormBody.append(setForm);
            var m_colorSelect = setForm.find(".colorSelect"),
                m_linkSelect = setForm.find(".linkSelect"),
                m_activitySelector = setForm.find(".activitySelector"),
                m_settingTable = setForm.find(".settingTable"),
                m_imageList = setForm.find(".imageList"),
                m_imageSelect = setForm.find(".imageSelect"),
                m_richText = setForm.find(".richText"),
                m_fontStyler = setForm.find(".fontStyler"),
                m_productSelect = setForm.find(".productSelect"),
                m_comboList = setForm.find(".comboList");
            if(m_colorSelect[0])
                colorSelector(m_colorSelect, function () {
                    updateModuleByControl(this);
                });
            if(m_linkSelect[0])
                linkSelector(m_linkSelect, function () {
                    updateModuleByControl(this);
                });
            if(m_activitySelector[0])
                activitySelector(m_activitySelector, function () {
                    updateModuleByControl(this);
                });
            if(m_settingTable[0])
                settingTable(m_settingTable, function () {
                    updateModuleByControl(this);
                });
            if(m_imageList[0])
                imageList(m_imageList, function () {
                    updateModuleByControl(this);
                });
            if(m_imageSelect[0])
                imageSelector(m_imageSelect,function () {
                    updateModuleByControl(this);
                });
            if(m_richText[0])
                richText(m_richText,function () {
                    updateModuleByControl(this);
                });
            if(m_fontStyler[0])
                fontStyler(m_fontStyler, function () {
                    updateModuleByControl(this);
                });
            if(m_productSelect[0])
                productSelector(m_productSelect, function () {
                    updateModuleByControl(this);
                });
            if(m_comboList[0])
                comboList(m_comboList, function () {
                    updateModuleByControl(this);
                });
        }
        editFormBody.data("editForm",setForm);
        module.addClass("dcm-module-edit");
        currentEditModule = module;
    }
    function updateModuleByControl(input){
        var inp = $(input),
            item = inp.attr("data-tag"),
            moduleId = inp.closest("form").attr("data-module-id"),
            dataOrder = getModuleOrder(moduleId),
            modData = tempLayoutData[dataOrder].data,
            updateData = {},
            value = inp.is(":checkbox") ? inp.prop("checked") : inp.val();

        try{
            var v = $.parseJSON(value);
            if(v && typeof(v) == "object"){
                value = v;
            }
        }catch (e){}

        updateData[item] = value;

        $.extend(modData,updateData);

        updateModule(moduleId,modData);
    }

    function updateModule(moduleId,data){
        var moduleDom = previewBox.find("[data-id="+ moduleId +"]"),
            type = moduleDom.attr("data-type"),
            mod = modules[type],
            template = handlebars.compile(mod.tmpl);

        if((typeof(data)).toLowerCase() == "string") data = $.parseJSON(data);
        moduleDom.attr("data-config",JSON.stringify(data));
        try{
            moduleDom.find(modInClass).html(template(data));
        }catch (e){
            console.log(e)
        }

        if(mod.init) mod.init();

        var lazyloadImages = moduleDom.find(".lazyload");
        lazyloadImages.each(function () {
            var src = this.getAttribute("data-src");
            if(src)
                this.src = src;
        });
    }

    function insertLayout(data){
        $.each(data, function (i, v) {
            var mod = modules[v.type],
                tmpl = handlebars.compile(mod.tmpl),
                wrapper = $(modWrapHTML);
            wrapper.attr({
                "data-id":v.id,
                "data-type":v.type,
                "data-config":JSON.stringify(v.data)
            });

            try{
                wrapper.find(modInClass).html(tmpl(v.data));
            }catch (e){
                console.log(e);
            }

            modContainer.append(wrapper);
            if(mod.init) mod.init();

            var lazyloadImages = wrapper.find(".lazyload");
            lazyloadImages.each(function () {
                this.src = this.getAttribute("data-src");
            });
        });
        $.merge(tempLayoutData,data);
    }

    function importPreset(id){
        $.ajax("/static/decoration/mobile/layouts/"+id+"/layout.json", {
            dataType : "json",
            success : function (data) {
                insertLayout(data);
            }
        });
    }

    var  init = function () {
        publishButton.on("click", function () {
            $.ajax({
                url : '/admin/sa/mobile/layoutManage/save',
                dataType : 'json',
                data:{
                    "id":id,
                    "saveData":JSON.stringify(tempLayoutData)
                },
                type: 'POST',
                success : function(data){
                    if(data.result == "success"){
                        id = data.data.id;
                        var url = "/admin/sa/mobile/layoutManage/m/pushLayout/"+ id;
                        $.ajax({
                            url : url,
                            dataType : 'json',
                            type: 'POST',
                            success : function(data){
                                if(data.result == "success"){
                                    alert("发布成功!");
                                    setTimeout(function () {
                                        window.location.href =  "/admin/sa/mobile/layoutManage/toEditLayout/" + id;
                                    }, 2000);
                                }else{
                                    alert("发布失败!");
                                }
                            }
                        });

                    }else{
                        alert("失败!");
                    }
                }
            });

        });
        previewButton.on("click", function () {
            $.ajax({
                url : '/admin/sa/mobile/layoutManage/save',
                dataType : 'json',
                async:false,
                data:{
                    "id":id,
                    "previewData":JSON.stringify(tempLayoutData)
                },
                type: 'POST',
                success : function(data){
                    if(data.result == "success"){
                        id = data.data.id;
                        window.open("/admin/sa/mobile/layoutManage/toPreview/" + data.data.id + "?previewType=1");
                    }else{
                        alert("失败!");
                    }
                }
            });
        });
        //保存
        saveButton.on("click", function () {
            console.log(tempLayoutData);
            $.ajax({
                url : '/admin/sa/mobile/layoutManage/save',
                dataType : 'json',
                data:{
                    "id":id,
                    "saveData":JSON.stringify(tempLayoutData)
                },
                type: 'POST',
                success : function(data){
                    if(data.result == "success"){
                        id = data.data.id;
                        alert("保存成功!");
                        setTimeout(function () {
                            window.location.href =  "/admin/sa/mobile/layoutManage/toEditLayout/" + data.data.id;
                        }, 2000);
                    }else{
                        alert("失败!");
                    }
                }
            });
        });

        s_publishButton.on("click", function () {
            $.ajax({
                url : '/admin/sa/store/layoutManage/save',
                dataType : 'json',
                data:{
                    "id":id,
                    "saveData":JSON.stringify(tempLayoutData),
                    "decorationAreaCd":$("#decorationAreaCd").val()
                },
                type: 'POST',
                success : function(data){
                    if(data.result == "success"){
                        id = data.data.id;
                        $.ajax({
                            url : '/admin/sa/store/layoutManage/m/pushLayout/'+id,
                            dataType : 'json',
                            type: 'POST',
                            success : function(data){
                                if(data.result == "success"){
                                    alert("发布成功!");
                                    setTimeout(function () {
                                        window.location.href =  "/admin/sa/store/layoutManage/toEditLayout/" + id;
                                    }, 2000);
                                }else{
                                    alert("发布失败!");
                                }
                            }
                        });

                    }else{
                        alert("失败!");
                    }
                }
            });

        });
        s_previewButton.on("click", function () {
            $.ajax({
                url : '/admin/sa/store/layoutManage/save',
                dataType : 'json',
                async:false,
                data:{
                    "id":id,
                    "previewData":JSON.stringify(tempLayoutData),
                    "decorationAreaCd":$("#decorationAreaCd").val()
                },
                type: 'POST',
                success : function(data){
                    if(data.result == "success"){
                        id = data.data.id;
                        window.open("/admin/sa/store/layoutManage/toPreview/" + data.data.id + "?previewType=1");
                    }else{
                        alert("失败!");
                    }
                }
            });
        });
        s_saveButton.on("click", function () {
            console.log(tempLayoutData);
            $.ajax({
                url : '/admin/sa/store/layoutManage/save',
                dataType : 'json',
                data:{
                    "id":id,
                    "saveData":JSON.stringify(tempLayoutData),
                    "decorationAreaCd":$("#decorationAreaCd").val()
                },
                type: 'POST',
                success : function(data){
                    if(data.result == "success"){
                        id = data.data.id;
                        alert("保存成功!");
                        setTimeout(function () {
                            window.location.href =  "/admin/sa/store/layoutManage/toEditLayout?decorationAreaCd="+$("#decorationAreaCd").val();
                        }, 2000);
                    }else{
                        alert("失败!");
                    }
                }
            });
        });

        previewBox.on("click","a", function (e) {
            e.preventDefault();
        });

        /*初始化左侧菜单*/
        var template = handlebars.compile(sideMenuTpl),
            sideMenuHTML = "";
        if(window.args && window.args["type"] == "preset"){
            var data = $.grep(presetLayoutData, function (v) {
                return v.id == window.args["id"];
            });
            var mods = [];
            $.each(layoutData, function (i,v) {
                var t = v.type.split("_"),
                    category = t[0],
                    type = t[1],
                    c = $.grep(sideMenuData, function (value) {
                        return value.category == category;
                    }),
                    result = $.grep(c[0].modules, function (value) {
                        return value.type == type;
                    })[0];
                result.category = category;

                var f = $.grep(mods, function (value) {
                    return value.category + "_" + value.type == v.type;
                });
                if(!f[0])
                    mods.push(result);
            });
            var presetSideData = [{
                "title":data[0].title,
                "modules":mods
            }];

            sideMenuHTML = template(presetSideData);
        }else{
            sideMenuHTML = template(sideMenuData);
            //sideMenuHTML += '<div class="dcm-side-menu-item"><div class="dcm-side-menu-item-wrap"><div class="dcm-side-menu-title import-preset"><span class="title-txt">导入预设模板</span></div>';
        }
        sideMenu.html(sideMenuHTML);
        var sideItems = sideMenu.find(".dcm-side-menu-item");
        sideMenu.on("click",".dcm-side-menu-title:not(.import-preset)", function () {
            sideItems.removeClass("dcm-side-menu-item-current");
            $(this).parents(".dcm-side-menu-item").addClass("dcm-side-menu-item-current");
        });
        sideItems.eq(0).addClass("dcm-side-menu-item-current");
        sideMenu.on("click",".import-preset", function () {
            var content = $('<div class="import-preset-dialog"></div>'),
                currentLayoutId;
            presetLayouts(content, function (id) {
                currentLayoutId = id;
            });
            var d = common.dialog({
                id : "presetDialog",
                fixed : true,
                width : 950,
                height : 500,
                title : "导入预设模板",
                content : content,
                okValue: '确定',
                ok: function (){
                    if(!currentLayoutId){
                        alert("请选择模板");
                        return false;
                    }
                    importPreset(currentLayoutId);
                },
                cancelValue: '取消',
                onremove: function () {
                    content.remove();
                }
            });
            d.show();
        });

        insertLayout(layoutData);

        editFormBody.on("change","[data-tag]:not(.colorSelect):not(.linkSelect):not(.activitySelector):not(.settingTable):not(.imageList):not(.richMedia):not(.fontStyler):not(.comboList)", function () {
            updateModuleByControl(this);
        });

        /*初始化拖拽事件*/
        var placeHolder = $('<div class="dcm-preview-box-placeholder" draggable="true"><span>放在这里</span></div>'),
            isAdd,
            currentMod;
        sideMenu.on("dragstart",".dcm-side-menu-list li", function (e) {
            currentMod = $(this);
            isAdd = true;
        }).on("dragend",function(e){
            placeHolder.remove();
            isAdd = false;
        });

        modContainer.on("mousedown",".dcm-ico-move", function () {
            currentMod = $(this).closest(modWrapClass);
            currentMod.before(placeHolder).hide();
        }).on("mouseup", function () {
            if(currentMod){
                placeHolder.remove();
                currentMod.show();
                currentMod = null;
            }
        }).on("click",modWrapClass, function (e) {
            editModule($(this));
        }).on("click",".dcm-module-tool a", function (e) {
            e.stopPropagation();
            var link = $(this),
                mod = link.closest(modWrapClass),
                before;
            if(link.hasClass("dcm-ico-up")){
                before = mod.prev();
                if(before[0])
                    moveModule(mod,before);
            }else if(link.hasClass("dcm-ico-down")){
                before = mod.next().next();
                moveModule(mod,before);
            }else if(link.hasClass("dcm-ico-delete")){
                deleteModule(mod);
            }
        }).on("dragstart",".dcm-ico-move", function (e) {
            return false;
        }).on("dragend",function(e){
            placeHolder.remove();
            currentMod.show();
            currentMod = null;
        }).on("dragover", function (e) {
            e.preventDefault();
            if($(e.target).closest("."+placeHolder.attr("class"))[0]){
                return false;
            }
            var target = $(e.target).closest(modWrapClass);
            if(target[0]){
                target.before(placeHolder);
            }else{
                placeHolder.appendTo(modContainer);
            }
        }).on("drop", function (e) {
            var before = placeHolder.next();
            if(isAdd){
                insertModule(currentMod.attr("data-type"),before);
            }else{
                moveModule(currentMod,before);
            }
            currentMod.show();
            return false;
        }).on("mouseenter",modWrapClass, function () {
            $(this).addClass(modActiveClass);
        }).on("mouseleave",modWrapClass, function () {
            $(this).removeClass(modActiveClass);
        });
    };

    common.loadFrameSetting(window.frameConfigUrl, function (frameConfig) {
        /*初始化预览区首页框架*/
        previewBox.find("[data-frame]").each(function (i,v) {
            var frameName = this.getAttribute("data-frame"),
                type = frameConfig.frame_setting.type,
                data = frameConfig.frame_setting.data,
                target = $(this);
        });
        loadModules();
    });
});