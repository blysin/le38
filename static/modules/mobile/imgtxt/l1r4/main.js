define([
    "text!./main.hbs",
    "text!./setting.hbs"
],function(template,setting){
    return {
        tmpl: template,
        setting:setting,
        data:{
            "type": "1",
            "list" : [
                "","","","",""
            ]
        }
    }
});