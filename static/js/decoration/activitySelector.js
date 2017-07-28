define(["jquery"],function ($) {
    var activity_html = '<div class="activity-set-wrap">' +
            '<select class="activity-set-url">' +
            '</select>' +
            '<input type="hidden"/>' +
            '</div>',
        dfd = $.Deferred();


    $.ajax(window.activityDataUrl, {
        dataType : "json",
        success : function (activityData) {
            dfd.resolve(activityData.data);
        }
    });

    function activitySelector(render,callback){
        dfd.done(function (activityData) {
            init(render,callback,activityData);
        });
    }

    function init(render,callback,activityData){
        // alert(JSON.stringify(activityData));
        $(render).each(function (i,v) {
            var wrap = $(this),
                tag = wrap.attr("data-tag"),
                value = wrap.attr("data-value");

            if(wrap.data("init") == true) return;
            wrap.html(activity_html);

            var activitySelect = wrap.find(".activity-set-url"),
                dataStore = wrap.find("input[type=hidden]");

            var optionsItems = '';
            var d = activityData;
            optionsItems += '<option value="-1">'+'请选择限时抢购活动'+'</option>';
            for(var i = 0; i < d.data.length; i++){
                optionsItems += '<option value="'+d.data[i].promotionId+'" data-end="'+d.data[i].end+'" ' +
                    'data-start="'+d.data[i].start+'">'+d.data[i].name+'</option>';
            }

            activitySelect.html(optionsItems);

            if(tag) dataStore.attr("data-tag",tag);
            if(value && value!="null"){
                value = $.parseJSON(value);
                dataStore.val(JSON.stringify(value));
                if(value.selectProId && value.selectProId!=null){
                    var selectProId = JSON.parse(value.selectProId);
                    $(this).find(".activity-set-url").val(selectProId);
                }
            }

            activitySelect.on("change", categoryChange);
            function categoryChange(){
                var dataStore = wrap.find("input[type=hidden]");
                var dataEnd = $(this).find("option:selected").attr("data-end");
                var dataStart = $(this).find("option:selected").attr("data-start");
                var selectProId = $(this).find("option:selected").val();
                value = {
                    "data-end" : dataEnd,
                    "data-start" : dataStart,
                    "selectProId" : selectProId
                }
                dataStore.val(JSON.stringify(value));
                if(callback && wrap.data("init") == true){
                    callback.call(dataStore[0],value);
                }
            }
            wrap.data("init",true);
        });
    }


    return activitySelector;
});
