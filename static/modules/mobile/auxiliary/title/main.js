define([
    "text!./main.hbs",
    "text!./setting.hbs"
],function(template,setting){
    return {
        tmpl: template,
        setting:setting,
        data:{
            "type" : "1",
            "color" : "#d90000",
            "title" : "标题文字",
            "link" : {"category":"no","isNew":false}
        }
    }
});