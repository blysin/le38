define([
    "text!./main.hbs",
    "text!./setting.hbs"
],function(template,setting){
    return {
        tmpl: template,
        setting:setting,
        data:{
            "list" : [
                [
                    {"img":"/static/images/blank.gif","link":"","name":"商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题","saleCount":999,"priceReal":"99","priceOrigin":"299"}
                ]
            ]
        }
    }
});