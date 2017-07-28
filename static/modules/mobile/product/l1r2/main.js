define([
    "text!./main.hbs",
    "text!./setting.hbs"
],function(template,setting){
    return {
        tmpl: template,
        setting:setting,
        data:{
            "list" : [
                [{"img":"/static/images/blank.gif","link":"","name":"商品标题1","priceReal":"99","priceOrigin":"299"},
                    {"img":"/static/images/blank.gif","link":"","name":"商品标题2","priceReal":"99","priceOrigin":"299"},
                    {"img":"/static/images/blank.gif","link":"","name":"商品标题2","priceReal":"99","priceOrigin":"299"}]
            ]
        }
    }
});