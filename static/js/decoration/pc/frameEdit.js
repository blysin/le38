define(['jquery','handlebars','common','decoration/colorSelector','decoration/linkSelector','decoration/settingTable','decoration/fontStyler','decoration/menuSetting','decoration/imageSelector','decoration/richText','decoration/imageDialog','decoration/tabber'],function ($,handlebars,common,colorSelector,linkSelector,settingTable,fontStyler,menuSetting,imageSelector,richText,imageDialog,tabber) {
    var previewBox = $(".dcm-preview-box-page"),
        settingTab = $(".setting-tab"),
        settingTabBody = $(".setting-tab-wrap"),
        frameTemplates,
        frameConfig,
        tempFrameConfig,
        settingTmpl,
        commonTmpl,
        globalCSSTemplate,
        framesData = {},
        backButton = $("#J_btn_back"),
        saveButton = $("#J_btn_save"),
        revertButton = $("#J_btn_revert"),
        editFrame = location.search.substring(location.search.indexOf("=")+1);

    function loadModules(){
        var c = 0,t = 0;
        previewBox.find("[data-frame]").each(function (i,v) {
            var frameName = this.getAttribute("data-frame"),
                data,
                config,
                url,
                target = $(this);

            c++;
            /*if(frameName == "customer_service"){
                var common_set = frameConfig.common_setting[editFrame] || frameConfig.common_setting["global"];
                config = common_set[frameName];
                data = config.data;

                url = "pcFrames/customer_service/" + config.type+"/main";
            }else {*/
                config = frameConfig.frame_setting[frameName];
                data = config.data;

                url = "pcFrames/" + frameName + "/" + config.type + "/main";
            /*}*/
            require([url], function (module) {
                t++;
                var template = handlebars.compile(module.tmpl);
                if ((typeof(data)).toLowerCase() == "string")
                    data = $.parseJSON(data);

                target.html(template(data));
                if (module.init) module.init();

                framesData[frameName] = module;
                if (t >= c) init();
            });
        });
    }

    var init = function () {
        previewBox.find("a").on("click", function (e) {
            e.preventDefault();
        });

        backButton.on("click", function () {
            goBack();
        });

        saveButton.on("click", function () {
            console.log(tempFrameConfig);
            if(editFrame == "frame_index"){
                var dataObj = {
                    "id":frameId,
                    "platform":"PC",
                    "itemList[0].key":"PC_KEY_INDEX_HEAD",//PC-首页头部
                    "itemList[0].data":JSON.stringify(tempFrameConfig.frame_setting.index_head),
                    "itemList[1].key":"PC_KEY_COMMON_SETTING",//PC全局客服、SEO
                    "itemList[1].data":JSON.stringify(tempFrameConfig.common_setting)
                };
                frame_save(dataObj);
            }else if(editFrame == "frame_login"){
                var dataObj = {
                    "id":frameId,
                    "platform":"PC",
                    "itemList[0].key":"PC_KEY_LOGIN_PAGE",//PC-登录页
                    "itemList[0].data":JSON.stringify(tempFrameConfig.frame_setting.login_page),
                    "itemList[1].key":"PC_KEY_COMMON_SETTING",//PC全局客服、SEO
                    "itemList[1].data":JSON.stringify(tempFrameConfig.common_setting)
                };
                frame_save(dataObj);
            }else if(editFrame == "frame_list"){
                var dataObj = {
                    "id":frameId,
                    "platform":"PC",
                    "itemList[0].key":"PC_KEY_PRODUCTS_PAGE",//PC-列表页
                    "itemList[0].data":JSON.stringify(tempFrameConfig.frame_setting.item_list),
                    "itemList[1].key":"PC_KEY_COMMON_SETTING",//PC全局客服、SEO
                    "itemList[1].data":JSON.stringify(tempFrameConfig.common_setting)
                };
                frame_save(dataObj);
            }else if(editFrame == "frame_detail"){
                var dataObj = {
                    "id":frameId,
                    "platform":"PC",
                    "itemList[0].key":"PC_KEY_PRODUCT_DETAIL_PAGE",//PC-详情页
                    "itemList[0].data":JSON.stringify(tempFrameConfig.frame_setting.item_detail),
                    "itemList[1].key":"PC_KEY_COMMON_SETTING",//PC全局客服、SEO
                    "itemList[1].data":JSON.stringify(tempFrameConfig.common_setting)
                };
                frame_save(dataObj);
            }else if(editFrame == "frame_myshop"){
                var dataObj = {
                    "id":frameId,
                    "platform":"PC",
                    "itemList[0].key":"PC_KEY_MYSHOP_PAGE",//PC-微店
                    "itemList[0].data":JSON.stringify(tempFrameConfig.frame_setting.myshop_head),
                    "itemList[1].key":"PC_KEY_COMMON_SETTING",//PC全局客服、SEO
                    "itemList[1].data":JSON.stringify(tempFrameConfig.common_setting)
                };
                frame_save(dataObj);
            }else if(editFrame == "frame_global"){
                var dataObj = {
                    "id":frameId,
                    "platform":"PC",
                    "itemList[0].key":"PC_KEY_GLOBAL_FOOT",//PC-全局底部
                    "itemList[0].data":JSON.stringify(tempFrameConfig.frame_setting.global_foot),
                    "itemList[1].key":"PC_KEY_GLOBAL_SERVICE",//PC全局客服
                    "itemList[1].data":JSON.stringify(tempFrameConfig.frame_setting.customer_service),
                    "itemList[2].key":"PC_KEY_GLOBAL_COLOR",//PC全局颜色
                    "itemList[2].data":JSON.stringify(tempFrameConfig.color_setting)
                };
                frame_save(dataObj);
            }
        });

        revertButton.on("click", function () {
            previewBox.find("[data-frame]").each(function (i,v) {
                var frameName = this.getAttribute("data-frame"),
                    data = getFrameData(frameName,frameConfig);
                updateFrame(frameName,data);
            });
            settingTabBody.html("");
            initSettingBody();
        });

        $.when(
            $.ajax({url:window.frameEditBaseUrl+ editFrame +".hbs",dataType:"text"}),
            $.ajax({url:window.frameEditBaseUrl+"common_settings.hbs",dataType:"text"})
        ).done(function (t1,t2) {
                settingTmpl = handlebars.compile(t1[0]),
                commonTmpl = handlebars.compile(t2[0]);

                //initTabBody
                initSettingBody();

                //initTab
                initSettingTab();

                previewBox.on("mouseenter","[data-frame][data-editable=1]", function () {
                    $(this).addClass("dcm-frame-active");
                }).on("mouseleave","[data-frame][data-editable=1]", function () {
                    $(this).removeClass("dcm-frame-active");
                }).on("click","[data-frame][data-editable=1]", function () {
                    /*previewBox.find("[data-frame][data-editable=1]").removeClass("dcm-frame-edit")
                     $(this).addClass("dcm-frame-edit");*/
                    setTabActive($(this).attr("data-edit-tab"));
                });
            });
    };

    var tabWidth = 0,
        activeTabIndex = 0;
    function initSettingTab(){
        var tabItems = settingTabBody.find(".setting-tab-item"),
            tab_html = "";

        tabItems.each(function (i, v) {
            tab_html += '<a href="javascript:void(0)">'+ v.getAttribute("data-setting-title") +'</a>';
        });
        settingTab.prepend(tab_html).on("mouseenter","a", function (e) {
            setTabActive($(this).index());
        });

        tabEvents();
        $(window).on("resize",tabEvents);
        function tabEvents(){
            tabWidth = settingTabBody.parent().width();
            tabItems.css({"float":"left","width":tabWidth});
            settingTabBody.width(tabWidth*tabItems.length);

            setTabActive(activeTabIndex);
        }
    }
    function setTabActive(index){
        var tab = settingTab.find("a").eq(index),
            indicator = settingTab.find("b");
        indicator.css({"left":tab.position().left,"width":tab.outerWidth()});
        settingTabBody.css("-webkit-transform", "translateX(-"+tabWidth*index+"px)");
        activeTabIndex = index;
    }

    function initSettingBody(){
        var html1 = $("<div/>").html(settingTmpl(frameConfig)),
            html2 = $("<div/>").html(commonTmpl(frameConfig.common_setting[editFrame]));

        /*过滤框架种类*/
        html1.find(".setting-tab-item[data-frame]").each(function () {
            var $this = $(this),
                frame = $this.attr("data-frame"),
                type = $this.attr("data-type") || "1",
                frame_type = frameConfig.frame_setting[frame].type || "1";

            if(type != frame_type)
                $this.remove();
        });

        settingTabBody.append(html1.html()).append(html2.html());

        settingTabBody.find("[data-tag]:not(.colorSelect):not(.linkSelect):not(.settingTable):not(.fontStyler):not(.menuSetting):not(.imageSelect):not(.richText)").on("change", function () {
            updateFrameByControl(this);
        });

        var m_colorSelect = settingTabBody.find(".colorSelect"),
            m_linkSelect = settingTabBody.find(".linkSelect"),
            m_settingTable = settingTabBody.find(".settingTable"),
            m_fontStyler = settingTabBody.find(".fontStyler"),
            m_menuSetting = settingTabBody.find(".menuSetting"),
            m_richText = settingTabBody.find(".richText"),
            m_imageSelect = settingTabBody.find(".imageSelect"),
            service_icon = settingTabBody.find(".service-icon-custom"),
            tab_box = settingTabBody.find(".tabBox");
        if(m_colorSelect[0])
            colorSelector(".colorSelect", function () {
                updateFrameByControl(this);
            });
        if(m_linkSelect[0])
            linkSelector(".linkSelect", function () {
                updateFrameByControl(this);
            });
        if(m_settingTable[0])
            settingTable(".settingTable", function () {
                updateFrameByControl(this);
            });
        if(m_fontStyler[0])
            fontStyler(".fontStyler", function () {
                updateFrameByControl(this);
            });
        if(m_menuSetting[0])
            menuSetting(".menuSetting", function () {
                updateFrameByControl(this);
            });
        if(m_richText[0])
            richText(".richText", function () {
                updateFrameByControl(this);
            });
        if(m_imageSelect[0])
            imageSelector(".imageSelect", function () {
                updateFrameByControl(this);
            });
        if(service_icon[0])
            service_icon.on("click", function () {
                imageDialog({
                    showTab : [0,1],
                    callback : function (value) {
                        var img = service_icon.find(".img"),
                            dataStore = service_icon.find("input[type=hidden]");
                        service_icon.removeClass("service-ico-add");
                        img.html('<img src="'+ value.content +'">');
                        dataStore.val(value.content);
                        updateFrameByControl(dataStore);
                    }
                });
            });

        if(tab_box[0])
            tabber(tab_box);

        //修复在ueditor源码编辑状态粘贴过长字符时页面乱跳的问题
        settingTabBody.parent().on("scroll", function (e) {
            this.scrollLeft = 0;
        });
    }

    function getFrameData(name,cfg){
        cfg = cfg || frameConfig;
        var result;
        if( name == "seo"){
            result = cfg.common_setting[editFrame][name].data;
        }else if(name == "color_setting"){
            result = cfg.color_setting;
        }else{
            result = cfg.frame_setting[name].data;
        }
        return result;
    }

    function updateFrameByControl(input){
        var inp = $(input),
            inputname = inp.attr("data-tag").split("."),
            frm = inputname[0],
            item = inputname[1],
            tmpData = getFrameData(frm,tempFrameConfig),
            updateData = {},
            value = inp.is(":checkbox") ? inp.prop("checked") : inp.val();

        try{
            var v = $.parseJSON(value);
            if(v && typeof(v) == "object"){
                value = v;
            }
        }catch (e){}

        updateData[item] = value;

        $.extend(tmpData,updateData);

        if(frm == "color_setting"){
            common.setStyleSheet("globalColorCSS",globalCSSTemplate(updateData));
        }else if(frm == "seo"){

        }else{
            updateFrame(frm,tmpData);
        }
    }

    function updateFrame(frameName,data){
        var frame = previewBox.find("[data-frame="+ frameName +"]");
        var mod = framesData[frameName];
        var template = handlebars.compile(mod.tmpl);
        if((typeof(data)).toLowerCase() == "string")
            data = $.parseJSON(data);
        frame.html(template(data));
        if(mod.init) mod.init();
    }

    function goBack(){
        if(window.top == window){
            history.back();
        }else{
            window.top.endEditFrame();
        }
    }

    common.loadFrameSetting(window.frameConfigUrl, function (frmCfg,cssTmpl) {
        common.loadFrameTemplates(function (frmTmpl) {
            frameTemplates = frmTmpl;
            frameConfig = frmCfg;
            globalCSSTemplate = cssTmpl;
            tempFrameConfig = $.extend(true,{},frmCfg);
            previewBox.html(frameTemplates[editFrame]);
            loadModules();
        },"pc");
    },"pc");

    //保存方法
    function frame_save(dataObj){
        $.ajax({
            url : '/admin/frameManage/save',
            dataType : 'json',
            data:dataObj,
            type: 'POST',
            success : function(data){
                if(data.result == "success"){
                    //alert("保存成功！");
                    if(window.top == window){
                        history.back();
                    }else{
                        window.top.location.reload();
                        window.top.endEditFrame();
                    }
                }else{
                    alert("失败!");
                }
            }
        });
    }
});