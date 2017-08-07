$.ajaxSetup({
    dataType: "json",
    type: "POST",
    traditional: true,
    success: function (data) {
        if (app.ajaxHelper.handleAjaxMsg(data)) {
            try {
                $(this).dialog("close");
            } catch (e) {

            }
        }
    },
    error: function (e) {
        try {
            var sessionInvalid = e["status"] && e["status"] == "403" && e["responseText"] && e["responseText"].indexOf("login_admin_post") > 0;
        } catch (ex) {
            var sessionInvalid = false;
        }
        if (sessionInvalid) {
            window.location.reload();
            app.helper.unblockUI();
        } else {
            app.showError("系统出错，请过会儿再试");
            app.helper.unblockUI();
        }
    },
    complete: function () {
    }
});

var app = {};
app.alert = function (msg, icon, options) {
    if (!msg) return false;

    var m;
    if ($.type(msg) == 'string') {
        m = msg;
    } else if ($.isArray(msg)) {
        m = '';
        for (var i = 0; i < msg.length; i++) {
            m += '<p>' + msg[i] + '</p>';
        }
    }

    var setting = $.extend({}, options);
    if (setting.callback) BUI.Message.Alert(m, setting.callback, icon);
    else BUI.Message.Alert(m, icon);

    return false;
}
app.showError = function (msg, options) {
    if (top.showError) {
        top.showError(msg);
    } else {
        app.alert(msg, 'error', options);
    }
};
app.showSuccess = function (msg, options) {
    if (top.showSuccess) {
        top.showSuccess(msg);
    } else {
        app.alert(msg, 'success', options);
    }
};
app.opTips = function (msg, options) {
    if (top.showSuccess) {
        top.showSuccess(msg);
    } else {
        app.alert(msg, 'success', options);
    }
};
app.confirm = function (options) {
    var setting = $.extend({}, options);
    if (!setting.sure || $.type(setting.sure) != 'function') {
        app.showError("请传入确认操作函数");
        return false;
    }
    if (!setting.message) {
        app.showError("请传入确认提示信息");
        return false;
    }
    if (confirm(setting.message)) {
        setting.sure();
        return true;
    }
    return false;
};

app.page = {
    reload: function () {
        if (top.topManager) {
            top.topManager.reloadPage();
        }
    },
    open: function (options) {
        var setting = $.extend(options, {reload: true});
        if (top.topManager) {
            top.topManager.openPage(setting);
        }
    }
}

app.helper = {
    _escape: function (val) {
        if (!val) {
            return val;
        }
        return val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },
    _unescape: function (val) {
        if (!val) {
            return val;
        }
        return val.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
    },
    mergeArray: function (array1, array2) {
        var array = new Array();
        if (typeof array1 != "undefined") {
            if ($.type(array1) == "array") {
                for (var i = 0; i < array1.length; i++) {
                    array.push(array1[i]);
                }
            } else array.push(array1);
        }
        if (typeof array2 != "undefined") {
            if ($.type(array2) == "array") {
                for (var i = 0; i < array2.length; i++) {
                    array.push(array2[i]);
                }
            } else array.push(array2);
        }
        return array;
    },
    removeArray: function (array, delObj) {
        var index = -1;
        for (var i = 0; i < array.length; i++) {
            if (array[i] == delObj) {
                index = i;
            }
        }
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    },
    formatDate: function (dateString, pattern) {
        var date;
        if (dateString) date = new Date(dateString);
        else return "";
        return date.pattern(pattern ? pattern : 'yyyy-MM-dd');
    },
    formatCurrentDate: function (pattern) {
        var date = new Date();
        return date.pattern(pattern ? pattern : 'yyyy-MM-dd');
    },
    initDatePicker: function (options) {
        var settings = $.extend({}, {
            dateFormat: "yy-mm-dd",
            defaultDate: "${nowTimestamp?string('yyyy-MM-dd')}"
        }, options);
        $(".datepicker").datepicker(settings);
    },
    safeRender: function (s) {
        return (s && s != "" && s != '_NA_') ? s : "";
    },
    download: function (url) {
        var downloadIframe = $("#downloadIframe");
        var downloadForm = $("#downloadForm");
        if (downloadIframe.size() <= 0) {
            $('<iframe name="downloadIframe" id="downloadIframe" width="0" height="0" frameborder="0" marginheight="0" marginwidth="0" hspace="0" allowtransparency="true" scrolling="no" vspace="0"></iframe>').appendTo("body");
        }
        if (downloadForm.size() <= 0) {
            $('<form id="downloadForm" target="downloadIframe" action="" method="post"></form>').appendTo("body");
        }
        $("#downloadForm").attr("action", url).submit();
    },
    loadStatus: function (id, status, defaultValue) {
        var e = $("#" + id);
        if (e.size() > 0) {
            e.empty();
            $("<option value=''>请选择</option>").appendTo(e);
            for (var s in status) {
                var str = "<option value='" + s + "' ";
                if (defaultValue && defaultValue == s) str += "selected";
                ;
                str += ">" + status[s] + "</option>";
                $(str).appendTo(e);
            }
        }
    },
    addFavorite: function (url, title) {
        if (url == null || url == '') {
            url = window.location.href;
        }
        if (title == null || title == '') {
            title = document.title;
        }
        if (window.sidebar && window.sidebar.addPanel) {
            window.sidebar.addPanel(title, url, '');
        } else if (window.external && window.external.AddFavorite) {
            window.external.AddFavorite(url, title);
        } else if (window.opera && window.print) {
            this.title = title;
            return true;
        } else {
            alert('请按 ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D 来收藏.');
        }
    },
    parseInt: function (value) {
        return parseInt(value.replace(/,/g, ""));
    },
    parseFloat: function (value) {
        return parseFloat(value.replace(/,/g, ""));
    },
    onlyAllowNumberEvent: function (inputElementObj) {
        inputElementObj.keydown(function (e) {
            return document.all ? ((e.keyCode > 47) && (e.keyCode < 58) || e.keyCode == 8) : ((e.which > 47) && (e.which < 58) || e.which == 8);
        }).focus(function () {
                this.style.imeMode = 'disabled';
            });
    },
    blockUI: function () {
        return false;
    },
    unblockUI: function () {
        return false;
    },
    getCheckboxValues: function (checkboxName) {
        var checkedValues = [];
        $('input[name="' + checkboxName + '"]:checked').each(function () {
            checkedValues.push($(this).val());
        });
        return checkedValues;
    },
    queryStringToJSON: function (queryString) {
        var pairs = location.search.slice(1).split('&');
        var result = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return JSON.parse(JSON.stringify(result));
    }

};
app.ajaxHelper = {
    success: function (data, textStatus, jqXHR, options) {
        var settings = $.extend({}, options);
        if (app.ajaxHelper.handleAjaxMsg(data)) {
            if (settings.dialog) $("#" + settings.dialog).dialog("close");
            app.opTips(settings.opTips);
        }
        app.helper.unblockUI();
    },
    handleAjaxMsg: function (d) {
        if (d.result == "error") {
            app.showError(d.message);
            return false;
        }
        return true;
    },
    submitRequest: function (options) {
        var settings = $.extend(true, {data: {}}, options);
        if (!settings.url) {
            app.showError("缺少url参数");
            return false;
        }
        app.helper.blockUI();
        $.ajax(settings.url, {
            data: settings.data,
            success: settings.success
        });
    },
    confirm: function (options) {
        var settings = $.extend(true, {}, options);
        if (!settings.url) {
            app.showError("缺少url参数");
            return false;
        }
        var sure = function () {
            $.ajax(settings.url, {
                data: settings.data,
                success: function (d) {
                    if (app.ajaxHelper.handleAjaxMsg(d)) {
                        if (settings.success) settings.success();
                    }
                }
            });
        };
        app.confirm({
            message: settings.message,
            sure: sure
        });
        return false;
    }
};

var Form = BUI.Form
Form.Rules.add({
    name: 'mobile',
    msg: '不是有效的手机号码！',
    validator: function (value, baseValue, formatMsg) {
        var regexp = new RegExp("^(1[0-9]{10})$")
        if (value && !regexp.test(value)) {
            return formatMsg;
        }
    }
});
Form.Rules.add({
    name: 'telephone',
    msg: '不是有效的电话号码！',
    validator: function (value, baseValue, formatMsg) {
        var regexp = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/
        if (value && !regexp.test(value)) {
            return formatMsg;
        }
    }
});
Form.Rules.add({
    name: 'emailOrMobile',
    msg: '不是有效的邮箱或手机号码！',
    validator: function (value, baseValue, formatMsg) {
        var mobileRegexp = new RegExp("^(1[0-9]{10})$");
        var emailRegexp = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");

        if (value && !mobileRegexp.test(value) && !emailRegexp.test(value)) {
            return formatMsg;
        }
    }
});
Form.Rules.add({
    name : 'integer',
    msg : '请填写正整数。',
    validator : function(value,baseValue,formatMsg){
        var regexp = new RegExp('^\\d+$');
        if (!value || !regexp.test(value)){
            return formatMsg;
        }
    }
});
BUI.setDebug(true)

app.grid = {}
app.grid.format = {
    transTypeEnumObj: {"FATR_CASH_BACK": "返现", "FATR_DEPOSIT": "充值", "FATR_PURCHASE": "消费"},
    reviewStatusEnumObj: {"APPROVED": "审核通过", "PENDING": "审核中", "REJECTED": "审核拒绝"},
    userLevelEnumObj: {1: "一级门店", 2: "二级门店", 3: "三级门店", 4: "四级门店", 5: "五级门店", 6: "六级门店", 7: "七级门店", 8: "八级门店", 9: "九级门店", 10: "十级门店"},
    storeLevelEnumObj: {1: "一级分销", 2: "二级分销", 3: "三级分销", 4: "四级分销", 5: "五级分销"},
    storeTypeEnumObj: {1: "类型一", 2: "类型二", 3: "类型三", 4: "类型四", 5: "类型五", 6: "类型六", 7: "类型七", 8: "类型八", 9: "类型九", 10: "类型十"},
    mstoreLevelEnumObj:{1: "一级微店", 2: "二级微店", 3: "三级微店"},
    mstoreOrderStatusEnumObj:{1:"待付款",3:"待收货",4:"待评价",5:"已完成",6:"已取消",10:"待分配",11:"待送货",20:"待发货",21:"已传输",22:"传输失败"},
    moneyRenderer: function (v) {
        if (BUI.isString(v)) {
            v = parseFloat(v);
        }
        if ($.isNumberic(v)) {
            return (v).toFixed(2);
        }
        return v;
    },
    renderUserLoginStatus: function (d) {
        if (d && d == "N") {
            return "冻结";
        } else {
            return "正常";
        }
    },
    transTypeRenderer: function (d) {
        return BUI.Grid.Format.enumRenderer(app.grid.format.transTypeEnumObj)(d)
    },
    renderMoney: function (value, rowObj) {
        if (!value) {
            return "--";
        }
        return "￥" + (value.amount || 0);
    },
    renderActive: function (value, rowObj) {
        if (value != null && (value == 1 || value == true || value == "1" || value == "true")) {
            return "启用";
        } else {
            return "禁用";
        }
    },
    renderReviewConsultStatus: function (d) {
        return  BUI.Grid.Format.enumRenderer(app.grid.format.reviewStatusEnumObj)(d)
    },
    renderYesOrNoStatus: function (d) {
        if (d != null && (d == 1 || d == true || d == "1" || d == "true")) {
            return "是";
        } else {
            return "否";
        }
    },
    encodeHTML: function (val, obj) {
        return app.helper._escape(val);
    },
    renderUserLevelRank: function (d) {
        return BUI.Grid.Format.enumRenderer(app.grid.format.userLevelEnumObj)(d);
    },
    renderStoreLevelRank: function (d) {
        return BUI.Grid.Format.enumRenderer(app.grid.format.storeLevelEnumObj)(d);
    },
    renderStoreTypeRank: function (d) {
        return BUI.Grid.Format.enumRenderer(app.grid.format.storeTypeEnumObj)(d);
    },
    renderNumber: function(val) {
        return (!val || isNaN(val)) ? 0 : +val;
    },
    renderTitle: function(val, len) {
        len = len || 20;
        val = val || "";
        val = val.replace(/null|undefined/g, '');
        var content = app.helper._escape(val);
        return "<label title='" + content + "'>" + (content && content.length > len ? (content.substring(0, len) + "...") : content) + "</label>"
    },
    randerMstoreLevelRank:function(d){
    	return BUI.Grid.Format.enumRenderer(app.grid.format.mstoreLevelEnumObj)(d);
    },
    randerMstoreOrderStatus:function(d){
    	return BUI.Grid.Format.enumRenderer(app.grid.format.mstoreOrderStatusEnumObj)(d);
    }

}

app.pageFormSubmitByMethod = function (action, data, method) {
    if(!method){
        method = "post";
    }
    var helpForm = $("#_help-my-form");
    if(helpForm.length==0){
        var div = $("<div style='display: none'><form id='_help-my-form'></form></div>");
        $("body").append(div);
        helpForm = $("#_help-my-form");
    }
    var dataLength=0;
    $.each(data, function(key, value){
        dataLength++;
    });
    if(helpForm.attr("action") && helpForm.attr("action") == action && (dataLength == 0 || (dataLength > 0 && helpForm.children().length == dataLength))){
        BUI.Message.Alert("数据提交中，请稍等！");
        return;
    };
    helpForm.attr("action",action);
    helpForm.attr("method",method);
    helpForm.empty();
    $.each(data, function(key, value){
        var inputObj = $("<input name='"+key+"' value='"+value+"'/>");
        helpForm.append(inputObj);
    });
    helpForm.submit();
}

app.pageFormSubmit = function (action, data) {
    app.pageFormSubmitByMethod(action, data, "post");
}

app.ajax = function (url, data, successCallback, options) {
    var settings = $.extend(true, {
        url: url,
        type: "post",
        dataType: "json",
        data: data,
        success: successCallback
    }, options);
    $.ajax(settings);
}

app.createDialog = function (successCallback, options) {
    var settings = $.extend(true, {
        title: '弹出框',
        width: 500,
        height: 250,
        //配置DOM容器的编号
        contentId: 'content',
        success: successCallback
    }, options);
    var Overlay = BUI.Overlay
    return new Overlay.Dialog(settings);
}


app.createMessage = function (tip, successCallback) {
    BUI.Message.Confirm(tip, successCallback, 'question');
}


app.webPosOrderPrint = function(printUrl, isPreview){
    var LODOP = getLodop();
    var printerCount = LODOP.GET_PRINTER_COUNT();

    for(var i=0;i<printerCount;i++){
        if(i >= 2){
            break;
        }

        var printerName = LODOP.GET_PRINTER_NAME(i);
        if (LODOP.SET_PRINTER_INDEX(printerName)){
            LODOP.PRINT_INIT("订单小票"+i);
            LODOP.ADD_PRINT_URL("1%","0%","100%","100%", printUrl);
            LODOP.SET_PRINT_STYLEA(0,"HOrient",3);
            LODOP.SET_PRINT_STYLEA(0,"VOrient",3);
            LODOP.SET_SHOW_MODE("MESSAGE_GETING_URL","");
            LODOP.SET_SHOW_MODE("MESSAGE_PARSING_URL","");
            LODOP.SET_PRINT_PAGESIZE(3,760,5,"");
            LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Full-Width");

            if(isPreview){
                LODOP.PREVIEW();
            }else{
                LODOP.PRINT();
            }
            break;
        }
    }
}

function getContentHeight(titleDiv,topDiv,footDiv){
    titleDiv = titleDiv || $('.title-bar');
    topDiv = topDiv || $('.content-top');
    footDiv = footDiv || $('.content-foot');
    var totalHeight = BUI.viewportHeight();
    var titHeight = titleDiv.outerHeight() || 0;
    var topHeight = topDiv.outerHeight() || 0;
    var footHeight = footDiv.outerHeight() || 0;
    return totalHeight - titHeight - topHeight - footHeight;
}

app.assetChange = function (fileName, lastFlag) {
    if (fileName == null || fileName.trim().length <= 0) {
        BUI.Message.Alert("请选择文件!");
        return false;
    }

    if (!validImgFile(fileName)) {
        BUI.Message.Alert("文件格式错误!");
        return false;
    }

    $.ajaxFileUpload({
        url: '/admin/adminAsset/siteconfig/uploadAssetJson',
        secureuri: false,
        fileElementId: "file_" + lastFlag,
        dataType: "json",
        method: 'post',
        success: function (data, status) {
            loadImage(data.assetUrl, lastFlag);
        },
        error: function (data, status, e) {
            BUI.Message.Alert("上传失败" + e);
        }
    });
    return false;
    function validImgFile(fileName) {
        var suffixIndex = fileName.lastIndexOf('.');
        if (suffixIndex <= 0) {
            return false;
        }
        var suffix = fileName.substr(suffixIndex + 1).toLowerCase();
        if (suffix.trim().length <= 0) {
            return false;
        }
        var fileSuffix = ['jpg', 'png', 'jpeg'];
        if (fileSuffix.indexOf(suffix) == -1) {
            return false;
        }
        return true;
    }
    function loadImage(assertUrl, lastFlag) {
        $("#imgPath_" + lastFlag).val(assertUrl);
        if(!$("#uploadBox_" + lastFlag).hasClass("upload-box-haspic")){
            $("#uploadBox_" + lastFlag).addClass("upload-box-haspic");
        }
        if (!assertUrl) {
            $("#uploadBox_" + lastFlag).removeClass("upload-box-haspic");
        }
        if(!($("#imageView_" + lastFlag).length)){
            $("<div class='upload-img'><img id='imageView_" + lastFlag + "' src='' alt=''></div>").appendTo($("#uploadBox_" + lastFlag));
        }
        $("#imageView_" + lastFlag).attr("src", assertUrl);
    }
};