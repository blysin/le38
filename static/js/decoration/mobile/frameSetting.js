define(['jquery','handlebars','common'],function ($,handlebars,common) {
    var previewBoxes = $(".frm-preview-box-page"),
        sideMenuItems = $(".dcm-side-menu-item:not(#ColorSetting)"),
        colorSettingItem = $("#ColorSetting"),
        subMenus = $(".dcm-submenu"),
        frameTemplates,
        frameConfig,
        sideMenuItemCurrent = "dcm-side-menu-item-current",
        frameSelectionItems = $(".frame-selection-list input:radio"),
        nextStepButton = $("#J_btn_next");

    var init = function () {
        /*初始设置默认数据*/
        if(window.defaultFrameData){
            $.each(frameSelectionItems, function (i,v) {
                var cfg = window.defaultFrameData[v.name][v.value],
                    framecfg = frameConfig.frame_setting[v.name];
                if(framecfg && framecfg.type == v.value){
                    $.extend(true,cfg,framecfg.data);
                }
                cfg = JSON.stringify(cfg);
                v.setAttribute("data-config",cfg);
            });
        }

        /*初始化框架预览区*/
        previewBoxes.each(function (i,v) {
            $(this).html(frameTemplates[v.getAttribute("data-frame-id")]);
        });
        $.each(frameConfig.frame_setting, function (i, v) {
            var targetItem = frameSelectionItems.filter("[name='" + i +"'][value='" + v.type + "']");
            targetItem.attr("checked",true);
            setFrame(i,v.type,v.data);
        });
        $("[data-frame='customer_service']").each(function () {
            var target = $(this),
                frame = target.closest("[data-frame-id]").attr("data-frame-id"),
                config = frameConfig.common_setting[frame].customer_service,
                data = config.data;

            require(["mobileFrames/customer_service/"+ config.type +"/main"], function (module) {
                var template = handlebars.compile(module.tmpl);
                if((typeof(data)).toLowerCase() == "string")
                    data = $.parseJSON(data);
                target.html(template(data));
                if(module.init) module.init();
            });
        });

        frameSelectionItems.on("click", function () {
            setFrame(this.name,this.value,this.getAttribute("data-config"));
        });

        sideMenuItems.on("click",function(){
            var current = $(this);
            sideMenuItems.removeClass(sideMenuItemCurrent);
            current.addClass(sideMenuItemCurrent);
            subMenus.hide().eq(current.index()).show();
        });

        colorSettingItem.on("click", function () {
            saveFramesSetting(1);
        });

        nextStepButton.on("click", function () {
            saveFramesSetting(0);
        });
    }

    function saveFramesSetting(turnFlag){
        console.log(getFrameResult());
        var dataObj = getFrameResult();
        $.ajax({
            url : '/admin/frameManage/save',
            dataType : 'json',
            data:{
                "id":frameId,
                "platform":"MOBILE",
                "itemList[0].key":"m_KEY_INDEX_HEAD",//手机-首页头部
                "itemList[0].data":JSON.stringify(dataObj.frame_setting.index_head),
                "itemList[1].key":"m_KEY_INDEX_MENU",//手机-菜单
                "itemList[1].data":JSON.stringify(dataObj.frame_setting.menu),
                "itemList[2].key":"m_KEY_COMMON_SETTING",//客服和seo
                "itemList[2].data":JSON.stringify(dataObj.common_setting),
                "itemList[3].key":"m_KEY_CATEGORY_HEAD",//分类页头部
                "itemList[3].data":JSON.stringify(dataObj.frame_setting.category_head),
                "itemList[4].key":"m_KEY_DETAIL_HEAD",//详情页头部
                "itemList[4].data":JSON.stringify(dataObj.frame_setting.detail_head),
                "itemList[5].key":"m_KEY_DETAIL_SUSPENSION",//详情页悬浮条
                "itemList[5].data":JSON.stringify(dataObj.frame_setting.detail_suspension),
                "itemList[6].key":"m_KEY_LIST_HEAD",//列表页头部
                "itemList[6].data":JSON.stringify(dataObj.frame_setting.list_head),
                "itemList[7].key":"m_KEY_LIST_SORT",//列表页排序
                "itemList[7].data":JSON.stringify(dataObj.frame_setting.list_sort),
                "itemList[8].key":"m_KEY_SELLERINDEX_HEAD",//卖家中心头部
                "itemList[8].data":JSON.stringify(dataObj.frame_setting.sellerindex_head),
                "itemList[9].key":"m_KEY_USERINDEX_HEAD",//买家中心头部
                "itemList[9].data":JSON.stringify(dataObj.frame_setting.userindex_head),
                "itemList[10].key":"m_KEY_MYSHOP_HEAD",//个人微店头部
                "itemList[10].data":JSON.stringify(dataObj.frame_setting.myshop_head),
                "itemList[11].key":"m_KEY_MYSHOP_MENU",//个人微店菜单
                "itemList[11].data":JSON.stringify(dataObj.frame_setting.myshop_menu),
                "itemList[12].key":"m_KEY_GLOBAL_FOOT",//全局底部
                "itemList[12].data":JSON.stringify(dataObj.frame_setting.global_foot),
                "itemList[13].key":"m_KEY_GLOBAL_COLOR",//全局颜色
                "itemList[13].data": JSON.stringify(dataObj.color_setting)
            },
            type: 'POST',
            success : function(data){
                if(data.result == "success"){
                    if(turnFlag==1){
                        window.location.href =  "/admin/frameManage/toColorSetting/"+data.data.id + "?paltfrom=m&type="+editType;
                    }else{
                        if(editType=="" || editType==null){
                            window.location.href =  "/admin/frameManage/toColorSetting/"+data.data.id + "?paltfrom=m";
                        }else{
                            window.location.href = "/admin/frameManage/toPreview/"+data.data.id + "?paltfrom=m";
                        }
                    }
                }else{
                    alert("失败!");
                }
            }
        });
    }

    function setFrame(frameName,type,data){
        require(["mobileFrames/"+frameName+"/"+type+"/main"], function (module) {
            var template = handlebars.compile(module.tmpl);
            var targets = previewBoxes.find("[data-frame='"+ frameName +"']");
            if((typeof(data)).toLowerCase() == "string")
                data = $.parseJSON(data);

            targets.each(function () {
                var targ = $(this);
                //判断是否显示菜单
                if(frameName == "menu"){
                    if(targ.closest("[data-frame-id=frame_userindex]")[0]){
                        if(frameConfig.frame_setting.menu.data.showInMycenter == true)
                            targ.html(template(data));
                    }else{
                        if(frameConfig.frame_setting.menu.data.showInShop == true)
                            targ.html(template(data));
                    }
                }else{
                    targ.html(template(data));
                }
            });
            if(module.init) module.init();
        });
    }

    function getFrameResult(){
        var cfg = $.extend({},frameConfig);
        frameSelectionItems.filter(":checked").each(function (i,v) {
            var c = cfg.frame_setting[v.name];
            c.type = v.value;
            c.data = JSON.parse(v.getAttribute("data-config"));
        });
        return cfg;
    }

    common.loadFrameSetting(window.frameConfigUrl, function (frmCfg) {
        common.loadFrameTemplates(function (frmTmpl) {
            frameTemplates = frmTmpl;
            frameConfig = frmCfg;
            init();
        });
    });
});