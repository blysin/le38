define([
    "text!./main.hbs",
    "text!./setting.hbs"
],function(template,setting){
    return {
        tmpl: template,
        setting:setting,
        data:{
            "color": "#ffffff",
            "bgcolor" : "#999999",
            "size" : "normal",
            "list" : [
                {"isImage":false,"content":"","title":"导航菜单","link":{"category":"no","isNew":false}},
                {"isImage":false,"content":"","title":"导航菜单","link":{"category":"no","isNew":false}},
                {"isImage":false,"content":"","title":"导航菜单","link":{"category":"no","isNew":false}},
                {"isImage":false,"content":"","title":"导航菜单","link":{"category":"no","isNew":false}}
            ]
        }
    }
});