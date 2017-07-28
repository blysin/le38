define(['jquery','handlebars','common'],function ($,handlebars,common) {
    var previewBoxes = $(".frm-preview-box-page"),
        frameTemplates,
        frameConfig,
        currentEditFrame,
        closeButton = $("#J_btn_close"),
        globalButton = $("#J_btn_global"),
        editFramePlaceholder = $('<div style="background: #fff; position: absolute; opacity: 0;"></div>').appendTo('body');

    var init = function () {
        previewBoxes.each(function (i,v) {
            var previewMask = $('<div class="box-mask"><div class="box-mask-wrap"><a href="javascript:void(0)">编辑框架</a></div></div>'),
                $this = $(this);
            $this.html(frameTemplates[v.getAttribute("data-frame-id")]).after(previewMask);
            previewMask.find("a").on("click", function () {
                currentEditFrame = $this;
                var frameTarget = $this.attr("data-frame-id");
                editFrame(frameTarget);
            });
        });

        $.each(frameConfig.frame_setting, function (i, v) {
            setFrame(i,v.type,v.data);
        });
        //$("[data-frame='customer_service']").each(function () {
        //    debugger;
        //    var target = $(this),
        //        frame = target.closest("[data-frame-id]").attr("data-frame-id"),
        //        config = frameConfig.common_setting[frame].customer_service,
        //        data = config.data;
        //
        //    require(["mobileFrames/customer_service/"+ config.type +"/main"], function (module) {
        //        var template = handlebars.compile(module.tmpl);
        //        if((typeof(data)).toLowerCase() == "string")
        //            data = $.parseJSON(data);
        //        target.html(template(data));
        //        if(module.init) module.init();
        //    });
        //});

        previewBoxes.parent().on("mouseenter", function () {
            $(this).find(".box-mask").addClass("show");
        }).on("mouseleave", function () {
            $(this).find(".box-mask").removeClass("show");
        });

        closeButton.on("click", function () {
            window.close();
        });

        globalButton.on("click", function () {
            currentEditFrame = $(this);
            editFrame("frame_global");
        });
    }

    function editFrame(frameName){
        if(!window.editUrl) return;
        var rect = currentEditFrame[0].getBoundingClientRect();
        editFramePlaceholder.html("")
            .css({
                display : "block",
                left : rect.left,
                top : rect.top,
                width : rect.width,
                height : rect.height,
                overflow : "hidden",
                zIndex : 99999
            }).animate({
                left : 0,
                top : 0,
                width : $(window).width(),
                height : $(window).height(),
                opacity : 1
            },{
                duration : 400,
                complete : function () {
                    var url = window.editUrl+ '?edit_frame=' + frameName;
                    var ifr = '<iframe width="100%" height="100%" frameborder="0" src="'+ url +'"></iframe>';
                    editFramePlaceholder.css({width:"100%",height:"100%"}).html(ifr);
                }
            });
    }

    window.endEditFrame = function () {
        var rect = currentEditFrame[0].getBoundingClientRect();
        editFramePlaceholder.html("")
            .css({
                left : 0,
                top : 0,
                width : $(window).width(),
                height : $(window).height(),
                opacity : 1,
                zIndex : 99999
            }).animate({
                left : rect.left,
                top : rect.top,
                width : rect.width,
                height : rect.height,
                opacity : 0
            },{
                duration : 400,
                complete : function () {
                    editFramePlaceholder.hide();
                }
            });
    };

    function setFrame(frameName,type,data){
        var targets = previewBoxes.find("[data-frame='"+ frameName +"']");
        require(["pcFrames/"+frameName+"/"+type+"/main"], function (module) {
            var template = handlebars.compile(module.tmpl);
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
            if(module.init){
                module.init();
            }
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