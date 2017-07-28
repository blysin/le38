define(['jquery','handlebars','common','unveil'],function ($,handlebars,common) {
    var previewBox = $("body"),
        modContainer = previewBox.find(".containerwrap"),
        modules = {};

    function loadModules(){
        var c = 0,t = 0;
        $.each(window.layoutData, function (i,v) {
            var title = v.type.split("_");
            c++;
            require(['mobileModules/'+title[0]+'/'+title[1]+'/main'], function (module) {
                modules[title[0]+'_'+title[1]] = module;
                t++;
                if(t >= c){
                    init();
                }
            });
        });
    }

    var init = function () {
        if($("#page.page-index")[0]){
            var setRootFontSize = function () {
                var rootFontSize = ((window.innerWidth < 640 ? window.innerWidth : 640 ) / 320 *20)+"px";
                $("html").css("font-size",rootFontSize);
            }
            setRootFontSize();
            $(window).on("resize",setRootFontSize);
        }

        $.each(window.layoutData, function (i, v) {
            var mod = modules[v.type],
                tmpl = handlebars.compile(mod.tmpl),
                html = tmpl(v.data),
                wrapper = $(html);

            modContainer.append(wrapper);
            if(mod.init) mod.init();
        });
        previewBox.on("click","a", function (e) {
            e.preventDefault();
        }).on("submit", function (e) {
            e.preventDefault();
        });

        $(".lazyload").unveil();
    };

    common.loadFrameSetting(window.frameConfigUrl, function (frameConfig) {
        /*初始化预览区首页框架*/
        previewBox.find("[data-frame]").each(function (i,v) {
            var frameName = this.getAttribute("data-frame"),
                data,
                config,
                target = $(this);
                config = frameConfig.frame_setting;
                data = config.data;           
        });
        loadModules();     
    });
});