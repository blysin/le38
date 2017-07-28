define(["jquery","common","ajaxFileUploader"],function ($,common) {
    var iconListArr = ["&#xe7d3;","&#xe60d;","&#xe651;","&#xe661;","&#xe643;","&#xe642;","&#xe63d;","&#xe63a;","&#xe752;","&#xe618;","&#xe636;","&#xe7d5;","&#xe628;","&#xe7cf;","&#xe600;","&#xe624;","&#xe622;","&#xe61e;","&#xe61a;","&#xe615;","&#xe603;"],
        iconListHTML = "";

    for(var i=0; i < iconListArr.length; i++){
        iconListHTML += '<li data-value="'+iconListArr[i]+'"><a>'+iconListArr[i]+'</a></li>';
    }

    function imageDialog(options){
        var opt = {
            showTab : [],
            callback : function (){}
        };
        $.extend(opt,options);

        var dialog_html = '<div class="upload-dialog-content"><div class="dialog-tab">' +
                '<ul>' +
                    '<li data-tab="0">网络图片</li>' +
                    '<li data-tab="1">本地上传</li>' +
                    '<li data-tab="2">图标库</li>' +
                '</ul>' +
            '</div>' +
            '<div class="dialog-tabcon"><form onsubmit="return false;">' +
                '<label>地址：</label><input name="content" id="dialog_input_img_url" class="control-text input-large" type="text">' +
                '<div class="dialog-upload-img-preview"></div>' +
                '<input name="isImage" type="hidden" value="1"/>' +
            '</form></div>' +
            '<div class="dialog-tabcon"><form onsubmit="return false;">' +
                '<div class="dialog-upload-add"><a href="javascript:void(0)"><b>+</b>添加图片</a><input name="file" id="dialog_input_img_file" type="file"  name=""/></div>' +
                '<div class="dialog-upload-img-file-preview"></div>' +
                '<input name="content" type="hidden"/>' +
                '<input name="isImage" type="hidden" value="1"/>' +
            '</form></div>' +
            '<div class="dialog-tabcon"><form onsubmit="return false;">' +
                '<div class="dialog-upload-ico-list">' +
                    '<ul>'+ iconListHTML +'</ul>' +
                '</div>' +
                '<input name="content" type="hidden"/>' +
                '<input name="isImage" type="hidden" value="0"/>' +
            '</form></div>' +
        '</div>';

        var content = $(dialog_html);
        var tabItems = content.find(".dialog-tab li"),
            tabCons = content.find(".dialog-tabcon"),
            inputUrl = content.find("#dialog_input_img_url"),
            imgPreview = content.find(".dialog-upload-img-preview"),
            uploadBtn = content.find(".dialog-upload-add"),
            inputFile = content.find(".dialog-upload-add input[type=file]"),
            imgFilePreview = content.find(".dialog-upload-img-file-preview"),
            icoList = content.find(".dialog-upload-ico-list"),
            currentTabcon;


        tabItems.on("click", function () {
            var tab = $(this),
                targetCon = tabCons.eq(tab.index());
            tabItems.removeClass("current");
            tab.addClass("current");
            if(currentTabcon && currentTabcon[0]) currentTabcon.hide();
            targetCon.show();
            currentTabcon = targetCon;
        });

        var initTabIndex = 0;
        if(opt.showTab && opt.showTab.length > 0){
            tabItems.hide();
            $.each(opt.showTab, function (i,v) {
                var tab = tabItems.filter("[data-tab="+ v +"]");
                tab.show();
            });
            initTabIndex = opt.showTab[0];
        }
        tabItems.eq(initTabIndex).trigger("click");

        inputUrl.on("change", function () {
            imgPreview.html('<img src="'+ this.value +'">');
        });

        icoList.on("click","li", function () {
            var li = $(this);
            icoList.find("li").removeClass("selected");
            li.addClass("selected");
            li.closest(".dialog-tabcon").find("input[name=content]").val(li.attr("data-value"));
        });

        inputFile.on("change", function () {
            var fileName = this.value;
            if(fileName == null || $.trim(fileName).length <= 0){
                alert("请选择文件!");
                return false;
            }

            if(!validImgFile(fileName)){
                alert("文件格式错误!");
                return false;
            }

            var loading = $('<span class="art-dialog-loading">上传中..</span>');
            imgFilePreview.before(loading);
            uploadBtn.hide();

            $.ajaxFileUpload({
                url:'/common/staticAsset/upload/decorate',
                secureuri: false,
                fileElementId: "dialog_input_img_file",
                dataType: "json",
                method : 'post',
                success: function (data, status) {
                    loading.remove();
                    imgFilePreview.html('<img src="'+ data.assetUrl +'">').show();
                    imgFilePreview.closest(".dialog-tabcon").find("input[name=content]").val(data.assetUrl);
                },
                error: function (data, status, e) {
                    alert("上传失败" + e);
                }
            });
            return false;
        });

        var imageDialog = common.dialog({
            id : "imageDialog",
            fixed : true,
            width : 640,
            height : 300,
            title : "选择图片",
            content : content,
            okValue: '确定',
            ok: function (){
                var result = {},
                    data = currentTabcon.find("form").serialize();
                data = data.split("&");
                for(var i=0; i < data.length; i++){
                    var d = data[i].split("=");
                    result[d[0]] = decodeURIComponent(d[1]);
                }
                if($.trim(result.content) == "") return;
                if(opt.callback) opt.callback.call(this,result);
            },
            cancelValue: '取消',
            onremove: function () {
                content.remove();
            }
        });
        imageDialog.show();

        function validImgFile(fileName){
            var suffixIndex = fileName.lastIndexOf('.');
            if(suffixIndex <= 0){
                return false;
            }
            var suffix = fileName.substr(suffixIndex + 1).toLowerCase();
            if(suffix.trim().length <= 0){
                return false;
            }
            var fileSuffix = ['jpg','png','jpeg'];
            if(fileSuffix.indexOf(suffix)==-1){
                return false;
            }
            return true;
        }
    }

    return imageDialog;
});
