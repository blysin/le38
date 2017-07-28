define([
    "text!./main.hbs",
    "text!./setting.hbs"
],function(template,setting){
    return {
        tmpl: template,
        setting:setting,
        data:{
            "content" : "文本模块",
            "link" : {"category":"no","isNew":false}
        }
    }
});