define([
    "text!./main.hbs",
    "text!./setting.hbs"
],function(template,setting){
    return {
        tmpl: template,
        setting:setting,
        data:{
            "js":"/*输入你的自定义脚本*/",
            "html":'<p style="padding: 8px; text-align: center;">自定义代码控件</p>',
            "css":"/*输入你的自定义CSS*/"
        }
    }
});