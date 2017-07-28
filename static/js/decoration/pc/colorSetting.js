define(['jquery','handlebars','common','decoration/colorSelector'],function ($,handlebars,common,colorSelector) {
    var previewBoxes = $(".frm-preview-box-page"),
        sideMenuItems = $(".dcm-side-menu-item:not(#ColorSetting)"),
        frameTemplates,
        frameConfig,
        globalCSSTemplate,
        prevStepButton = $("#J_btn_prev"),
        saveButton = $("#J_btn_save");

    var init = function () {
        previewBoxes.each(function (i,v) {
            $(this).html(frameTemplates[v.getAttribute("data-frame-id")]);
        });
        $.each(frameConfig.frame_setting, function (i, v) {
            setFrame(i,v.type,v.data);
        });
        sideMenuItems.add(prevStepButton).on("click", function () {
            prevStep();
        });

        colorSelector(".colorSelect", function (color) {
            globalColor = '{"themeColor":"'+color+'"}';
            newColor =color;
            common.setStyleSheet("globalColorCSS",globalCSSTemplate({themeColor:color}));
            $.extend(true,frameConfig.frame_setting,revertColorSetting);
            $.each(frameConfig.frame_setting, function (i, v) {
                setFrame(i,v.type,v.data);
            });
        });

        saveButton.on("click", function () {
            if(newColor=="" || newColor==oldColor){
                window.location.href = "/admin/frameManage/toPreview/"+frameId + "?paltfrom=pc";
                //$.ajax({
                //    url : '/admin/frameManage/save',
                //    dataType : 'json',
                //    data:{
                //        "id":frameId,
                //        "platform":"PC",
                //        "itemList[0].key":"m_KEY_COMMON_SETTING",//全局设置
                //        "itemList[0].data":m_KEY_COMMON_SETTING_DATA
                //    },
                //    type: 'POST',
                //    success : function(data){
                //        if(data.result == "success"){
                //            window.location.href = "/admin/frameManage/toPreview/"+data.data.id + "?paltfrom=m";
                //        }else{
                //            alert("失败!");
                //        }
                //    }
                //});
            }else {
                common.dialog({
                    id : "checkDialog",
                    fixed : true,
                    title : "请确认",
                    content: '你更改了全局颜色，是否覆盖局部颜色设置?',
                    button: [
                        {
                            value: '是',
                            callback: function () {
                                $.ajax({
                                    url : '/admin/frameManage/save',
                                    dataType : 'json',
                                    data:{
                                        "id":frameId,
                                        "platform":"PC",
                                        "itemList[0].key":"PC_KEY_GLOBAL_COLOR",//全局颜色
                                        "itemList[0].data":globalColor
                                        //"itemList[1].key":"m_KEY_COMMON_SETTING",//全局设置
                                        //"itemList[1].data":m_KEY_COMMON_SETTING_DATA
                                    },
                                    type: 'POST',
                                    success : function(data){
                                        if(data.result == "success"){
                                            window.location.href = "/admin/frameManage/toPreview/"+data.data.id + "?paltfrom=pc";
                                        }else{
                                            alert("失败!");
                                        }
                                    }
                                });
                            },
                            autofocus: true
                        },
                        {
                            value: '否',
                            callback: function () {
                                $.ajax({
                                    url : '/admin/frameManage/saveGlobalColor',
                                    dataType : 'json',
                                    data:{
                                        "id":frameId,
                                        //"commonSettingData":m_KEY_COMMON_SETTING_DATA,
                                        "colorData":globalColor//全局颜色
                                    },
                                    type: 'POST',
                                    success : function(data){
                                        if(data.result == "success"){
                                            window.location.href = "/admin/frameManage/toPreview/"+frameId + "?paltfrom=pc";
                                        }else{
                                            alert("失败!");
                                        }
                                    }
                                });
                            }
                        }
                    ]
                }).show();
            }
        });
    }

    function prevStep(){
        window.location.href = "/admin/frameManage/getFrameItem/"+frameId + "?paltfrom=pc&type="+editType;
    }

    function setFrame(frameName,type,data){
        require(["pcFrames/"+frameName+"/"+type+"/main"], function (module) {
            var template = handlebars.compile(module.tmpl);
            var targets = previewBoxes.find("[data-frame='"+ frameName +"']");
            if((typeof(data)).toLowerCase() == "string")
                data = $.parseJSON(data);
            targets.html(template(data));
            if(module.init){
                module.init();
            }
        });
    }


    common.loadFrameSetting(window.frameConfigUrl, function (frmCfg,cssTmpl) {
        common.loadFrameTemplates(function (frmTmpl) {
            frameTemplates = frmTmpl;
            frameConfig = frmCfg;
            globalCSSTemplate = cssTmpl;
            init();
        },"pc");
    },"pc");
});