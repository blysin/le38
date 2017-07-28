require.config({
    paths: {
        "jquery":"lib/jquery-1.8.3.min",
        "ajaxFileUploader":"ajaxfileupload",
        "jsgrid":"jsGrid/jsgrid.min",
        "ztree":"ztree/3.5.12/js/jquery.ztree.core-3.5.min",
        "zepto":"../mobile/js/zepto",
        "gmu":"../mobile/js/gmu",
        "mui":"../mobile/js/mui.min",
        "iSlider":"../mobile/js/iSlider.min",
        "iSliderDot":"../mobile/js/iSlider.plugin.dot.min",
        "handlebars":"handlebars-v3.0.1.min",
        "handlebarsHelper":"handlebarsHelper",
        "unveil":"../mobile/js/jquery.unveil",
        "ueditor":"../admin/js/ueditor/ueditor.all.min",
        "ueditorConfig" : "../admin/js/ueditor/ueditor.config",
        "text":"require/text",
        "css":"require/css",
        "json":"require/json",
        "common":"decoration/common",
        "pcDecoration":"../decoration/pc",
        "pcFrames":"../frames/pc",
        "pcModules":"../modules/pc",
        "mobileDecoration":"../decoration/mobile",
        "mobileFrames":"../frames/mobile",
        "mobileModules":"../modules/mobile"
    },
    shim : {
        "ajaxFileUploader" : ["jquery"],
        "jsgrid" : ["jquery"],
        "ztree" : ["jquery"],
        "unveil" : ["jquery"],
        "gmu" : ["zepto"],
        "mui" : ["zepto"],
        "ueditor" : ["ueditorConfig"]
    }
});