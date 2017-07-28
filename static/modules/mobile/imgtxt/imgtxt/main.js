define([
    "text!./main.hbs",
    "text!./setting.hbs"
],function(template,setting){
    return {
        tmpl: template,
        setting:setting,
        data:{
            "type":"1",
            "size": "normal",
            "title": "标题",
            "content": "文本内容"
        }
    }
});