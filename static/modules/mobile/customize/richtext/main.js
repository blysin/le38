define([
    "text!./main.hbs",
    "text!./setting.hbs"
],function(template,setting){
    return {
        tmpl: template,
        setting:setting,
        data:{
            "content" : "<p style='padding: 8px;'>输入富文本内容</p>"
        }
    }
});