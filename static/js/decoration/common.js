define(["jquery","handlebars","artDialog6/dialog","handlebarsHelper"],function ($,handlebars,dialog) {
    var common = {
        loadFrameSetting : function (frameConfigPath, callback, platform) {
            var cssurl = "text!mobileDecoration/templates/globalColorCSS.hbs";
            if(platform == "pc") cssurl = "text!pcDecoration/templates/globalColorCSS.hbs";
            require([cssurl], function (globalColorCSS) {
                var cssTemplate = handlebars.compile(globalColorCSS);
                if(typeof(frameConfigPath).toLowerCase() == "object"){
                    if(callback) callback.call(this,frameConfigPath,cssTemplate);
                    common.setStyleSheet("globalColorCSS",cssTemplate(frameConfigPath.color_setting));
                }else{
                    $.ajax(frameConfigPath,{dataType:"json",success: function (frameConfig) {
                        if(callback) callback.call(this,frameConfig,cssTemplate);
                        common.setStyleSheet("globalColorCSS",cssTemplate(frameConfig.color_setting));
                    }});
                }
            });
        },
        loadFrameTemplates : function (callback, platform) {
            var tmplurl = "text!mobileDecoration/templates/frameTemplates.hbs";
            if(platform == "pc") tmplurl = "text!pcDecoration/templates/frameTemplates.hbs";
            require([tmplurl], function (frameTemplates) {
                var result = $(frameTemplates),
                    ret = {};
                result.filter("script").each(function (i,v) {
                    var key = v.id,
                        value = v.innerHTML;
                    ret[key] = value;
                });
                if(callback) callback.call(this,ret);
            });
        },
        setStyleSheet : function(styleID,style){
            var s = $(styleID);
            if(s[0]){
                s.after(style).remove();
            }else{
                s = $(style);
                s.appendTo("head");
            }
        },
        dialog : dialog
    };
    window.alert = function (msg) {
        var alertDialog = dialog({
            id : "alertDialog",
            fixed : true,
            title : "提示",
            width : 200,
            content : msg,
            okValue: '确定',
            ok: function () {
                
            }
        });
        alertDialog.show();
    }
    return common;
});
