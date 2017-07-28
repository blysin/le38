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

    function getFrameResult(){
        var cfg = $.extend({},frameConfig);
        frameSelectionItems.filter(":checked").each(function (i,v) {
            var c = cfg.frame_setting[v.name];
            c.type = v.value;
            c.data = JSON.parse(v.getAttribute("data-config"));
        });
        return cfg;
    }

    function saveFramesSetting(turnFlag){
        console.log(getFrameResult());
        //return;
        var dataObj = getFrameResult();
        $.ajax({
            url : '/admin/frameManage/save',
            dataType : 'json',
            data:{
                "id":frameId,
                "platform":"PC",
                "itemList[0].key":"PC_KEY_INDEX_HEAD",//PC-首页头部
                "itemList[0].data":JSON.stringify(dataObj.frame_setting.index_head),
                "itemList[1].key":"PC_KEY_GLOBAL_FOOT",//PC-全局底部
                "itemList[1].data":JSON.stringify(dataObj.frame_setting.global_foot),
                "itemList[2].key":"PC_KEY_LOGIN_PAGE",//PC-登录页
                "itemList[2].data":JSON.stringify(dataObj.frame_setting.login_page),
                "itemList[3].key":"PC_KEY_PRODUCTS_PAGE",//PC-列表页
                "itemList[3].data":JSON.stringify(dataObj.frame_setting.item_list),
                "itemList[4].key":"PC_KEY_PRODUCT_DETAIL_PAGE",//PC-详情页
                "itemList[4].data":JSON.stringify(dataObj.frame_setting.item_detail),
                "itemList[5].key":"PC_KEY_MYSHOP_PAGE",//PC-微店
                "itemList[5].data":JSON.stringify(dataObj.frame_setting.myshop_head),
                "itemList[6].key":"PC_KEY_GLOBAL_COLOR",//PC全局颜色
                "itemList[6].data":JSON.stringify(dataObj.color_setting),
                "itemList[7].key":"PC_KEY_COMMON_SETTING",//PC SEO
                "itemList[7].data":JSON.stringify(dataObj.common_setting),
                "itemList[8].key":"PC_KEY_GLOBAL_SERVICE",//PC全局客服
                "itemList[8].data":JSON.stringify(dataObj.frame_setting.customer_service)
            },
            type: 'POST',
            success : function(data){
                if(data.result == "success"){
                    if(turnFlag==1){
                        window.location.href =  "/admin/frameManage/toColorSetting/"+data.data.id + "?paltfrom=pc&type="+editType;
                    }else{
                        if(editType=="" || editType==null){
                            window.location.href =  "/admin/frameManage/toColorSetting/"+data.data.id + "?paltfrom=pc";
                        }else{
                            window.location.href = "/admin/frameManage/toPreview/"+data.data.id + "?paltfrom=pc";
                        }
                    }
                }else{
                    alert("失败!");
                }
            }
        });
    }

    function setFrame(frameName,type,data){
        require(["pcFrames/"+frameName+"/"+type+"/main"], function (module) {
            var template = handlebars.compile(module.tmpl);
            var targets = previewBoxes.find("[data-frame='"+ frameName +"']");

            if((typeof(data)).toLowerCase() == "string")
                data = $.parseJSON(data);

            targets.each(function () {
                var targ = $(this);
                targ.html(template(data));
            });
            if(module.init) module.init();
        });
    }


    common.loadFrameSetting(window.frameConfigUrl, function (frmCfg) {
        common.loadFrameTemplates(function (frmTmpl) {
            frameTemplates = frmTmpl;
            frameConfig = frmCfg;
            init();
        },"pc");
    },"pc");
});