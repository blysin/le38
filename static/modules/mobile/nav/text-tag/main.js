define([
    "text!./main.hbs",
    "text!./setting.hbs"
],function(template,setting){
    return {
        tmpl: template,
        setting:setting,
        data:{
            "list" : [
                {"title":"标签","link":{"category":"no","isNew":false}}
            ]
        }
    }
});